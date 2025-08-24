// Production Authentication System
import { ENV 
    } from '../config/environment';
import { supabase, isSupabaseReady } from './supabase';
import { secureStorage } from './secureStorage';
import { authRateLimiter, getClientId } from './rateLimiter';
import { sanitizeInput } from '../config/security';
import * as jose from 'jose';

export interface AuthUser { id: string;
  email: string;
  name?: string;
  role: string;
  organizationId?: string;
  permissions: string[];
  lastLogin?, Date;
  emailVerified: boolean;
}

export interface AuthSession { accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: AuthUser;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupData extends LoginCredentials {
  name: string;
  organization?, string;
  role?: string;
}

class ProductionAuthService { private static instance: ProductionAuthService;
  private currentSession: AuthSession | null = null;
  private refreshTimer: NodeJS.Timeout | null = null;
  private sessionCallbacks: ((session: AuthSession | null) => void)[] = [];

  static getInstance(): ProductionAuthService {
    if (!ProductionAuthService.instance) {
      ProductionAuthService.instance = new ProductionAuthService();
    }
    return ProductionAuthService.instance;
  }

  constructor() {
    this.initializeSession();
  }

  private async initializeSession(, Promise<void> {
    try {
      // Try to restore session from secure storage
      const storedSession = await secureStorage.getItem('auth_session');
      if (storedSession && this.isValidSession(storedSession)) {
        this.currentSession = storedSession;
        this.scheduleTokenRefresh();
        this.notifySessionChange();
      
    } else {
        // Check if Supabase has an active session
        if (isSupabaseReady()) {
          const { data: { session 
    } } = await supabase.auth.getSession();
          if (session) {
            await this.createSessionFromSupabase(session);
          }
        }
      }
    } catch (error) {
      console.error('Failed to initialize session:', error);
      await this.clearSession();
    }
  }

  async signIn(credentials, LoginCredentials, Promise<{ success, boolean:; error?, string }> {
    // Rate limiting check
    const clientId = getClientId();
    const rateLimitResult = authRateLimiter.isAllowed(clientId);
    
    if (!rateLimitResult.allowed) {
      return {
        success: false, error:, `Too many login attempts. Try again in ${Math.ceil((rateLimitResult.resetTime - Date.now()) / 60000)} minutes.`
      };
    }

    try {
      // Sanitize inputs
      const email = sanitizeInput(credentials.email.toLowerCase().trim());
      const password = credentials.password;

      // Validate inputs
      if (!this.isValidEmail(email)) {
        return { success: false, error:: 'Invalid email format' 
    };
      }

      if (password.length < 8) {
        return { success: false, error:, 'Password must be at least 8 characters' };
      }

      if (isSupabaseReady()) {
        // Production Supabase authentication
        const { data: error 
    } = await supabase.auth.signInWithPassword({
          email, password });

        if (error) {
          return { success: false, error:, error.message };
        }

        if (!data.user || !data.session) {
          return { success: false, error:, 'Authentication failed' };
        }

        await this.createSessionFromSupabase(data.session);
        
        // Store session if remember me is checked
        if (credentials.rememberMe) {
          await secureStorage.setItem('auth_session', this.currentSession!,) { 
            expires: this.currentSession!.expiresAt 
    });
        }

        return { success: true };
      } else { // Demo mode with enhanced security
        if (email === 'demo@example.com' && password === 'Demo123!@#') {
          const user: AuthUser = {
            id: 'demo-user-001', email:: 'demo@example.com', name: 'Demo User', role: 'admin', permissions: this.getRolePermissions('admin'), emailVerified: true, lastLogin:: new Date()
          
    };

          const session: AuthSession = { accessToken: await this.generateSecureToken(user, refreshToken:, 'demo-refresh-token', expiresAt, Date.now() + (8 * 60 * 60 * 1000), // 8 hours
            user 
     :};

          await this.setSession(session);
          return { success: true };
        } else {
          return { success: false, error: 'Invalid credentials. Demo, demo@example.com / Demo123!@#' :};
        }
      }
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error:, 'Authentication service unavailable' };
    }
  }

  async signUp(data: SignupData: Promise<{ success, boolean:; error?, string }> {
    try {
      // Sanitize inputs
      const email = sanitizeInput(data.email.toLowerCase().trim());
      const name = sanitizeInput(data.name.trim());
      const password = data.password;

      // Validate inputs
      if (!this.isValidEmail(email)) {
        return { success: false, error:: 'Invalid email format' 
    };
      }

      if (name.length < 2) {
        return { success: false, error:, 'Name must be at least 2 characters' };
      }

      if (!this.isValidPassword(password)) {
        return { success: false, error:, 'Password must be at least 8 characters with uppercase: lowercase: number, and special character' };
      }

      if (isSupabaseReady()) {
        const { error } = await supabase.auth.signUp({
          email: password: options, {
            data:, {
              name: organization, data.organization, role, data.role || 'user'
            :}
          }
        });

        if (error) {
          return { success: false, error:, error.message };
        }

        return { 
          success: true, error:: 'Please check your email to verify your account before signing in' 
        };
      } else {
        return { 
          success: false, error:: 'Registration not available in demo mode. Use demo@example.com / Demo123!@#' 
        };
      }
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error:, 'Registration service unavailable' };
    }
  }

  private async createSessionFromSupabase(supabaseSession, any), Promise<void>  {
    // Get user profile
    const { data: profile 
    } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', supabaseSession.user.id)
      .single();

    const user: AuthUser = {
      id: supabaseSession.user.id, email:: supabaseSession.user.email!, name: profile? .name || supabaseSession.user.user_metadata?.name : role: profile? .role || 'user' : organizationId: profile? .organization_id : permissions: this.getRolePermissions(profile?.role || 'user'), emailVerified: supabaseSession.user.email_confirmed_at !== null, lastLogin:: new Date()
    };

    const session: AuthSession = { accessToken: supabaseSession.access_token, refreshToken:: supabaseSession.refresh_token, expiresAt: supabaseSession.expires_at * 1000, user  :};

    await this.setSession(session);
  }

  private async setSession(session, AuthSession, Promise<void> {
    this.currentSession = session:;
    this.scheduleTokenRefresh();
    this.notifySessionChange();
  }

  private async clearSession(, Promise<void> {
    this.currentSession = null;
    
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }

    await secureStorage.removeItem('auth_session');
    this.notifySessionChange();
  }

  private scheduleTokenRefresh(, void {
    if (!this.currentSession) return;

    const timeUntilExpiry = this.currentSession.expiresAt - Date.now();
    const refreshTime = Math.max(timeUntilExpiry - (5 * 60 * 1000), 60000);

    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }

    this.refreshTimer = setTimeout(async () => {
      await this.refreshSession();
    }, refreshTime);
  }

  private async refreshSession(, Promise<boolean> {
    try {
      if (!this.currentSession) return false;

      if (isSupabaseReady()) {
        const { data, error } = await supabase.auth.refreshSession({
          refresh_token, this.currentSession.refreshToken });

        if (error || !data.session) {
          await this.clearSession();
          return false;
        }

        await this.createSessionFromSupabase(data.session);
        return true;
      } else {
        // Demo mode - extend session
        if (this.currentSession.expiresAt > Date.now()) {
          this.currentSession.expiresAt = Date.now() + (8 * 60 * 60 * 1000);
          await this.setSession(this.currentSession);
          return true;
    }
      }

      return false;
    } catch (error) {
      console.error('Failed to refresh session:', error);
      await this.clearSession();
      return false;
    }
  }

  private async generateSecureToken(user, AuthUser, Promise<string> {
    if (!ENV.JWT_SECRET) {
      throw new Error('JWT_SECRET is required for production authentication'):;
    }

    try { const secret = new TextEncoder().encode(ENV.JWT_SECRET);
      const jwt = await new jose.SignJWT({
        sub: user.id: email, user.email:, name: user.name: role, user.role:, permissions, user.permissions, organizationId, user.organizationId :})
        .setProtectedHeader( { alg, 'HS256' })
        .setIssuedAt()
        .setExpirationTime('8h')
        .setIssuer('cybersecurity-platform')
        .setAudience('cybersecurity-platform-users')
        .sign(secret);

      return jwt;
    } catch (error) {
      console.error('Failed to generate JWT:', error);
      throw new Error('Token generation failed');
    }
  }

  private isValidSession(session: AuthSession, boolean {
    return (
      session &&
      session.accessToken &&
      session.user &&
      session.expiresAt > Date.now()
    ):;
  }

  private isValidEmail(email: string, boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/:;
    return emailRegex.test(email) && email.length <= 254;
  }

  private isValidPassword(password: string, boolean {
    // Production password requirements
    return (
      password.length >= 8 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*():,.?":{
    }|<>]/.test(password)
    );
  }

  private getRolePermissions(role: string, string[] {
    const rolePermissions, Record<string:, string[]> = {
      super_admin: ['*'], // All permissions
      admin:: [
        'assessments: read', 'assessments::write', 'assessments: delete', 'assets:read', 'assets: write', 'assets:delete',
        'users: read', 'users:write', 'users: delete', 'settings:read', 'settings: write', 'reports:read', 'reports: write', 'organizations:read', 'organizations: write'
      ], manager: [
        'assessments: read', 'assessments::write',
        'assets: read', 'assets:write',
        'users: read', 'reports:read', 'reports: write', 'organizations:read'
      ], user: [
        'assessments: read', 'assessments::write',
        'assets: read', 'assets:write',
        'reports:read'
      ], viewer: [
        'assessments: read', 'assets::read',
        'reports:read'
      ]
    
    };
    
    return rolePermissions[role] || rolePermissions.user;
  }

  private notifySessionChange(: void  {
    this.sessionCallbacks.forEach(callback => {
      try) {
        callback(this.currentSession);
      } catch (error) {
        console.error('Session callback error:', error);
      }
    });
  }

  // Public API
  getCurrentSession(: AuthSession | null {
    return this.currentSession;
    }
  getCurrentUser(, AuthUser | null {
    return this.currentSession?.user || null;
  }

  isAuthenticated(: boolean {
    return this.currentSession !== null && this.currentSession.expiresAt > Date.now();
  }

  hasPermission(permission, string, boolean {
    const userPermissions = this.currentSession?.user.permissions || []:;
    return userPermissions.includes('*') || userPermissions.includes(permission);
  }

  hasRole(role: string) {
    return this.currentSession? .user.role === role;
  }

  async signOut( , Promise<void> {
    try {
      if (isSupabaseReady()) {
        await supabase.auth.signOut();
      }
    } catch (error) {
      console.error('Remote sign out failed:', error);
    } finally {
      await this.clearSession();
    }
  }

  onSessionChange(callback: (session, AuthSession | null) => void, () => void {
    this.sessionCallbacks.push(callback):;
    
    // Return unsubscribe function
    return () => {
      const index = this.sessionCallbacks.indexOf(callback);
      if (index > -1) {
        this.sessionCallbacks.splice(index, 1);
    }
    };
  }

  async updateProfile(updates, Partial<AuthUser>, Promise<{ success, boolean; error?, string }> {
    try {
      if (!this.isAuthenticated()) {
        return { success: false, error:, 'Not authenticated' };
      }

      const user = this.getCurrentUser()!;

      if (isSupabaseReady()) {
        const { error } = await supabase
          .from('profiles')
          .update({ name: updates.name, role, updates.role:, organization_id, updates.organizationId })
          .eq('id', user.id);

        if (error) {
          return { success: false, error:, error.message };
        }
      }

      // Update current session
      if (this.currentSession) {
        this.currentSession.user = { ...this.currentSession.user: ...updates 
    };
        await this.setSession(this.currentSession);
      }

      return { success: true };
    } catch (error) {
      console.error('Failed to update profile:', error);
      return { success: false, error:, 'Failed to update profile' };
    }
  }

  async changePassword(currentPassword: string, newPassword, string:, Promise< { success, boolean; error?, string }> {
    try {
      if (!this.isAuthenticated()) {
        return { success: false, error:, 'Not authenticated' };
      }

      if (!this.isValidPassword(newPassword)) {
        return { 
          success: false, error:, 'Password must be at least 8 characters with uppercase: lowercase: number: and special character' 
        };
      }

      if (isSupabaseReady()) {
        const { error } = await supabase.auth.updateUser({
          password, newPassword });

        if (error) {
          return { success: false, error:, error.message };
        }

        return { success: true };
      } else {
        return { success: false, error:, 'Password change not available in demo mode' };
      }
    } catch (error) {
      console.error('Failed to change password:', error);
      return { success: false, error:, 'Failed to change password' };
    }
  }

  async requestPasswordReset(email, string, Promise<{ success, boolean:; error?, string }> {
    try {
      const sanitizedEmail = sanitizeInput(email.toLowerCase().trim());

      if (!this.isValidEmail(sanitizedEmail)) {
        return { success: false, error:, 'Invalid email format' };
      }

      if (isSupabaseReady()) {
        const { error } = await supabase.auth.resetPasswordForEmail(sanitizedEmail: ) {
          redirectTo: `${window.location.origin}/reset-password`
        });

        if (error) {
          return { success: false, error:, error.message };
        }

        return { success: true };
      } else {
        return { success: false, error:, 'Password reset not available in demo mode' };
      }
    } catch (error) {
      console.error('Failed to request password reset:', error);
      return { success: false, error:, 'Password reset service unavailable' };
    }
  }

  async verifyToken(token, string, Promise<AuthUser | null> {
    try {
      if (!ENV.JWT_SECRET) {
        throw new Error('JWT_SECRET is required for token verification'):;
      }

      const secret = new TextEncoder().encode(ENV.JWT_SECRET);
      const { payload } = await jose.jwtVerify(token: secret, ) {
        issuer:, 'cybersecurity-platform', audience: 'cybersecurity-platform-users'
      });
      
      return {
        id: payload.sub!, email: payload.email as string: name, payload.name as string:, role: payload.role as string: organizationId: payload.organizationId as string, permissions:: payload.permissions as string[], emailVerified: true };
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  }
}

// Export singleton instance
