import { useState, useCallback } from 'react';
import { useEffect } from 'react';
import { Permission, ROLE_PERMISSIONS } from '../../lib/security';
import { 
  signUp as supabaseSignUp, 
  signIn as supabaseSignIn, 
  signOut as supabaseSignOut,
  getCurrentUser,
  getCurrentSession,
  getProfile,
  updateProfile,
  supabase,
  isSupabaseReady
} from '../../lib/supabase';
import { organizationService } from '../../services/organizationService';
import { ENV } from '../../config/environment';

interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

interface UserProfile {
  id: string;
  email: string;
  name: string;
  organization: string;
  role: string;
  industry: string;
  certifications?: string[];
  preferences: Record<string, any>;
  currentOrganizationId?: string;
}

interface AuthState {
  user: AuthUser | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  permissions: string[];
  role: string;
  organizations: any[];
  currentOrganization: any | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
    error: null,
    permissions: [],
    role: 'viewer',
    organizations: [],
    currentOrganization: null
  });

  useEffect(() => {
    initializeAuth();
    
    // Listen for auth state changes
    if (isSupabaseReady && supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === 'SIGNED_IN' && session) {
            await loadUserData(session.user.id);
          } else if (event === 'SIGNED_OUT') {
            setAuthState({
              user: null,
              profile: null,
              loading: false,
              error: null,
              permissions: [],
              role: 'viewer',
              organizations: [],
              currentOrganization: null
            });
          }
        }
      );

      return () => subscription.unsubscribe();
    }
  }, []);

  const initializeAuth = async () => {
    if (!isSupabaseReady) {
      // Use mock data for development
      setAuthState({
        user: {
          id: 'demo-user-001',
          email: 'user@example.com',
          name: 'Demo User'
        },
        profile: {
          id: 'demo-user-001',
          email: 'user@example.com',
          name: 'Demo User',
          organization: 'Demo Organization',
          role: 'admin',
          industry: 'Technology',
          preferences: {}
        },
        loading: false,
        error: null,
        permissions: ROLE_PERMISSIONS.admin as string[],
        role: 'admin',
        organizations: [],
        currentOrganization: null
      });
      return;
    }

    try {
      const { session } = await getCurrentSession();
      if (session?.user) {
        await loadUserData(session.user.id);
      } else {
        setAuthState(prev => ({ ...prev, loading: false }));
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      setAuthState(prev => ({ 
        ...prev, 
        loading: false, 
        error: 'Failed to initialize authentication' 
      }));
    }
  };

  const loadUserData = async (userId: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }));

      // Get user profile
      const { data: profile, error: profileError } = await getProfile(userId);
      if (profileError) throw profileError;

      // Get user organizations
      const organizations = await organizationService.getUserOrganizations(userId);
      const currentOrganization = organizations[0]; // Use first organization as default

      // Determine permissions based on role
      const role = profile?.role || 'viewer';
      const permissions = ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS] || ROLE_PERMISSIONS.viewer;

      setAuthState({
        user: {
          id: userId,
          email: profile?.email || '',
          name: profile?.name
        },
        profile: profile ? {
          id: profile.id,
          email: profile.email,
          name: profile.name,
          organization: profile.organization,
          role: profile.role,
          industry: profile.industry,
          certifications: profile.certifications,
          preferences: profile.preferences || {},
          currentOrganizationId: currentOrganization?.id
        } : null,
        loading: false,
        error: null,
        permissions: permissions as string[],
        role,
        organizations,
        currentOrganization
      });
    } catch (error) {
      console.error('Failed to load user data:', error);
      setAuthState(prev => ({ 
        ...prev, 
        loading: false, 
        error: 'Failed to load user data' 
      }));
    }
  };

  const signIn = useCallback(async (email: string, password: string) => {
    if (!isSupabaseReady) {
      if (ENV.isProduction) {
        return { success: false, error: 'Authentication not available in production' };
      }
      // Mock authentication for development only
      await loadUserData('demo-user-001');
      return { success: true, error: null };
    }

    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      const { data, error } = await supabaseSignIn(email, password);
      
      if (error) {
        setAuthState(prev => ({ ...prev, loading: false, error: error.message }));
        return { success: false, error: error.message };
      }

      if (data.user) {
        await loadUserData(data.user.id);
        return { success: true, error: null };
      }

      return { success: false, error: 'Authentication failed' };
    } catch (error: any) {
      const errorMessage = error.message || 'Authentication failed';
      setAuthState(prev => ({ ...prev, loading: false, error: errorMessage }));
      return { success: false, error: errorMessage };
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string, userData: any) => {
    if (!isSupabaseReady) {
      if (ENV.isProduction) {
        return { success: false, error: 'Authentication not available in production' };
      }
      // Mock sign up for development only
      await loadUserData('demo-user-001');
      return { success: true, error: null };
    }

    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      const { data, error } = await supabaseSignUp(email, password, userData);
      
      if (error) {
        setAuthState(prev => ({ ...prev, loading: false, error: error.message }));
        return { success: false, error: error.message };
      }

      if (data.user) {
        // Profile will be created automatically via database trigger
        await loadUserData(data.user.id);
        return { success: true, error: null };
      }

      return { success: false, error: 'User creation failed' };
    } catch (error: any) {
      const errorMessage = error.message || 'Sign up failed';
      setAuthState(prev => ({ ...prev, loading: false, error: errorMessage }));
      return { success: false, error: errorMessage };
    }
  }, []);

  const signOut = useCallback(async () => {
    if (!isSupabaseReady) {
      if (ENV.isProduction) {
        return { error: 'Authentication not available in production' };
      }
      setAuthState({
        user: null,
        profile: null,
        loading: false,
        error: null,
        permissions: [],
        role: 'viewer',
        organizations: [],
        currentOrganization: null
      });
      return { error: null };
    }

    try {
      const { error } = await supabaseSignOut();
      
      setAuthState({
        user: null,
        profile: null,
        loading: false,
        error: null,
        permissions: [],
        role: 'viewer',
        organizations: [],
        currentOrganization: null
      });

      return { error };
    } catch (error: any) {
      console.error('Sign out failed:', error);
      return { error: error.message };
    }
  }, []);

  const updateUserProfile = useCallback(async (updates: Partial<UserProfile>) => {
    if (!authState.user) return { success: false, error: 'No user logged in' };

    try {
      if (isSupabaseReady) {
        const { data, error } = await updateProfile(authState.user.id, updates);
        if (error) throw error;

        setAuthState(prev => ({
          ...prev,
          profile: prev.profile ? { ...prev.profile, ...updates } : null
        }));
      }

      return { success: true, error: null };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, [authState.user]);

  const switchOrganization = useCallback(async (organizationId: string) => {
    const organization = authState.organizations.find(org => org.id === organizationId);
    if (!organization) return { success: false, error: 'Organization not found' };

    try {
      // Update user's current organization
      if (authState.user && isSupabaseReady) {
        await updateProfile(authState.user.id, { currentOrganizationId: organizationId });
      }

      setAuthState(prev => ({
        ...prev,
        currentOrganization: organization,
        profile: prev.profile ? { ...prev.profile, currentOrganizationId: organizationId } : null
      }));

      return { success: true, error: null };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, [authState.user, authState.organizations]);

  const checkPermission = useCallback((permission: Permission): boolean => {
    return authState.permissions.includes(permission);
  }, [authState.permissions]);

  const refreshSession = useCallback(async () => {
    if (!isSupabaseReady || !authState.user) return;
    
    try {
      await loadUserData(authState.user.id);
    } catch (error) {
      console.error('Failed to refresh session:', error);
    }
  }, [authState.user]);

  const hasRole = useCallback((role: string): boolean => {
    return authState.role === role;
  }, [authState.role]);

  const hasOrganizationRole = useCallback((organizationId: string, role: string): boolean => {
    if (!authState.currentOrganization) return false;
    return authState.currentOrganization.id === organizationId && hasRole(role);
  }, []);

  return {
    ...authState,
    signIn,
    signUp,
    signOut,
    updateUserProfile,
    switchOrganization,
    checkPermission,
    refreshSession,
    hasRole,
    hasOrganizationRole,
    isAuthenticated: !!authState.user,
    isLoading: authState.loading
  };
};