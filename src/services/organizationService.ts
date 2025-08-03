import { supabase, isSupabaseReady } from '../lib/supabase';
import { auditLogger } from '../lib/auditLog';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  settings: Record<string, any>;
  plan: 'free' | 'pro' | 'enterprise';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrganizationMember {
  id: string;
  organizationId: string;
  userId: string;
  role: 'owner' | 'admin' | 'editor' | 'viewer' | 'member';
  invitedBy?: string;
  joinedAt: Date;
  createdAt: Date;
}

export interface Invitation {
  id: string;
  organizationId: string;
  email: string;
  role: 'owner' | 'admin' | 'editor' | 'viewer' | 'member';
  token: string;
  invitedBy: string;
  expiresAt: Date;
  acceptedAt?: Date;
  createdAt: Date;
}

export class OrganizationService {
  private static instance: OrganizationService;

  static getInstance(): OrganizationService {
    if (!OrganizationService.instance) {
      OrganizationService.instance = new OrganizationService();
    }
    return OrganizationService.instance;
  }

  async getUserOrganizations(userId: string): Promise<Organization[]> {
    if (!isSupabaseReady) {
      return this.getLocalOrganizations(userId);
    }

    try {
      const { data, error } = await supabase
        .from('organizations')
        .select(`
          *,
          organization_members!inner(user_id)
        `)
        .eq('organization_members.user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data || []).map(this.transformOrganizationFromDatabase);
    } catch (error) {
      console.warn('Failed to fetch organizations from Supabase:', error);
      return this.getLocalOrganizations(userId);
    }
  }

  async createOrganization(
    orgData: Omit<Organization, 'id' | 'createdAt' | 'updatedAt'>,
    userId: string
  ): Promise<Organization> {
    const newOrg: Organization = {
      ...orgData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (!isSupabaseReady) {
      return this.saveLocalOrganization(newOrg, userId);
    }

    try {
      const { data: orgData, error: orgError } = await supabase
        .from('organizations')
        .insert({
          id: newOrg.id,
          name: newOrg.name,
          slug: newOrg.slug,
          description: newOrg.description,
          logo_url: newOrg.logoUrl,
          settings: newOrg.settings,
          plan: newOrg.plan,
          created_by: userId
        })
        .select()
        .single();

      if (orgError) throw orgError;

      // Add the creator as owner
      const { error: memberError } = await supabase
        .from('organization_members')
        .insert({
          organization_id: newOrg.id,
          user_id: userId,
          role: 'owner',
          joined_at: new Date().toISOString()
        });

      if (memberError) throw memberError;

      const organization = this.transformOrganizationFromDatabase(orgData);
      this.saveLocalOrganization(organization, userId);
      
      await auditLogger.log({
        userId,
        action: 'create',
        resource: 'organization',
        resourceId: newOrg.id,
        changes: organization
      });

      return organization;
    } catch (error) {
      console.warn('Failed to create organization in Supabase:', error);
      return this.saveLocalOrganization(newOrg, userId);
    }
  }

  async inviteMember(
    organizationId: string,
    email: string,
    role: OrganizationMember['role'],
    invitedBy: string
  ): Promise<Invitation> {
    const invitation: Invitation = {
      id: Date.now().toString(),
      organizationId,
      email,
      role,
      token: this.generateInviteToken(),
      invitedBy,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      createdAt: new Date()
    };

    if (!isSupabaseReady) {
      this.saveLocalInvitation(invitation);
      return invitation;
    }

    try {
      const { data, error } = await supabase
        .from('invitations')
        .insert({
          id: invitation.id,
          organization_id: organizationId,
          email,
          role,
          token: invitation.token,
          invited_by: invitedBy,
          expires_at: invitation.expiresAt.toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      this.saveLocalInvitation(invitation);
      
      await auditLogger.log({
        userId: invitedBy,
        action: 'create',
        resource: 'invitation',
        resourceId: invitation.id,
        changes: { email, role, organizationId }
      });

      return invitation;
    } catch (error) {
      console.warn('Failed to create invitation in Supabase:', error);
      this.saveLocalInvitation(invitation);
      return invitation;
    }
  }

  async getOrganizationMembers(organizationId: string): Promise<OrganizationMember[]> {
    if (!isSupabaseReady) {
      return this.getLocalMembers(organizationId);
    }

    try {
      const { data, error } = await supabase
        .from('organization_members')
        .select(`
          *,
          profiles(id, name, email, role as profile_role)
        `)
        .eq('organization_id', organizationId)
        .order('joined_at', { ascending: false });

      if (error) throw error;

      return (data || []).map(this.transformMemberFromDatabase);
    } catch (error) {
      console.warn('Failed to fetch organization members:', error);
      return this.getLocalMembers(organizationId);
    }
  }

  async updateMemberRole(
    organizationId: string,
    userId: string,
    newRole: OrganizationMember['role'],
    updatedBy: string
  ): Promise<void> {
    if (!isSupabaseReady) {
      this.updateLocalMemberRole(organizationId, userId, newRole);
      return;
    }

    try {
      const { error } = await supabase
        .from('organization_members')
        .update({ role: newRole })
        .eq('organization_id', organizationId)
        .eq('user_id', userId);

      if (error) throw error;

      this.updateLocalMemberRole(organizationId, userId, newRole);
      
      await auditLogger.log({
        userId: updatedBy,
        action: 'update',
        resource: 'organization_member',
        resourceId: `${organizationId}-${userId}`,
        changes: { role: newRole }
      });
    } catch (error) {
      console.warn('Failed to update member role in Supabase:', error);
      this.updateLocalMemberRole(organizationId, userId, newRole);
    }
  }

  private generateInviteToken(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private getLocalOrganizations(userId: string): Organization[] {
    try {
      const localData = localStorage.getItem(`organizations-${userId}`);
      if (localData) {
        const parsed = JSON.parse(localData);
        return parsed.map((org: any) => ({
          ...org,
          createdAt: new Date(org.createdAt),
          updatedAt: new Date(org.updatedAt)
        }));
      }
    } catch (error) {
      console.error('Failed to parse local organizations:', error);
    }
    return [];
  }

  private saveLocalOrganization(organization: Organization, userId: string): Organization {
    try {
      const existingOrgs = this.getLocalOrganizations(userId);
      const orgIndex = existingOrgs.findIndex(o => o.id === organization.id);
      
      if (orgIndex >= 0) {
        existingOrgs[orgIndex] = organization;
      } else {
        existingOrgs.push(organization);
      }
      
      localStorage.setItem(`organizations-${userId}`, JSON.stringify(existingOrgs));
      return organization;
    } catch (error) {
      console.error('Failed to save organization locally:', error);
      throw error;
    }
  }

  private saveLocalInvitation(invitation: Invitation): void {
    try {
      const key = `invitations-${invitation.organizationId}`;
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.push(invitation);
      localStorage.setItem(key, JSON.stringify(existing));
    } catch (error) {
      console.error('Failed to save invitation locally:', error);
    }
  }

  private getLocalMembers(organizationId: string): OrganizationMember[] {
    try {
      const localData = localStorage.getItem(`members-${organizationId}`);
      if (localData) {
        const parsed = JSON.parse(localData);
        return parsed.map((member: any) => ({
          ...member,
          joinedAt: new Date(member.joinedAt),
          createdAt: new Date(member.createdAt)
        }));
      }
    } catch (error) {
      console.error('Failed to parse local members:', error);
    }
    return [];
  }

  private updateLocalMemberRole(organizationId: string, userId: string, newRole: string): void {
    try {
      const members = this.getLocalMembers(organizationId);
      const updatedMembers = members.map(member => 
        member.userId === userId ? { ...member, role: newRole as any } : member
      );
      localStorage.setItem(`members-${organizationId}`, JSON.stringify(updatedMembers));
    } catch (error) {
      console.error('Failed to update member role locally:', error);
    }
  }

  private transformOrganizationFromDatabase(dbOrg: any): Organization {
    return {
      id: dbOrg.id,
      name: dbOrg.name,
      slug: dbOrg.slug,
      description: dbOrg.description,
      logoUrl: dbOrg.logo_url,
      settings: dbOrg.settings || {},
      plan: dbOrg.plan || 'free',
      createdBy: dbOrg.created_by,
      createdAt: new Date(dbOrg.created_at),
      updatedAt: new Date(dbOrg.updated_at)
    };
  }

  private transformMemberFromDatabase(dbMember: any): OrganizationMember {
    return {
      id: dbMember.id,
      organizationId: dbMember.organization_id,
      userId: dbMember.user_id,
      role: dbMember.role,
      invitedBy: dbMember.invited_by,
      joinedAt: new Date(dbMember.joined_at),
      createdAt: new Date(dbMember.created_at)
    };
  }
}

export const organizationService = OrganizationService.getInstance();