export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string
          organization: string
          role: string
          industry: string
          certifications: string[]
          preferences: Json
          avatar: string | null
          timezone: string | null
          phone_number: string | null
          department: string | null
          manager: string | null
          created_at: string
          updated_at: string }
        Insert: {
          id: string
          email: string
          name?: string
          organization?: string
          role?: string
          industry?: string
          certifications?: string[]
          preferences?: Json
          avatar?: string | null
          timezone?: string | null
          phone_number?: string | null
          department?: string | null
          manager?: string | null
          created_at?: string
          updated_at?: string }
        Update: {
          id?: string
          email?: string
          name?: string
          organization?: string
          role?: string
          industry?: string
          certifications?: string[]
          preferences?: Json
          avatar?: string | null
          timezone?: string | null
          phone_number?: string | null
          department?: string | null
          manager?: string | null
          created_at?: string
          updated_at?: string }
      }
      assessments: {
        Row: {
          id: string
          user_id: string
          framework_id: string
          framework_name: string
          responses: Json
          organization_info: Json
          is_complete: boolean
          version: string
          template_id: string | null
          tags: string[]
          notes: string
          reviewers: string[]
          approval_status: string
          bookmarks: string[]
          time_spent: number
          question_notes: Json
          question_evidence: Json
          evidence_library: Json
          risk_rating: string | null
          business_impact: string | null
          compliance_requirements: string[]
          assessment_version: string
          created_at: string
          updated_at: string }
        Insert: {
          id?: string
          user_id: string
          framework_id: string
          framework_name: string
          responses?: Json
          organization_info?: Json
          is_complete?: boolean
          version?: string
          template_id?: string | null
          tags?: string[]
          notes?: string
          reviewers?: string[]
          approval_status?: string
          bookmarks?: string[]
          time_spent?: number
          question_notes?: Json
          question_evidence?: Json
          evidence_library?: Json
          risk_rating?: string | null
          business_impact?: string | null
          compliance_requirements?: string[]
          assessment_version?: string
          created_at?: string
          updated_at?: string }
        Update: {
          id?: string
          user_id?: string
          framework_id?: string
          framework_name?: string
          responses?: Json
          organization_info?: Json
          is_complete?: boolean
          version?: string
          template_id?: string | null
          tags?: string[]
          notes?: string
          reviewers?: string[]
          approval_status?: string
          bookmarks?: string[]
          time_spent?: number
          question_notes?: Json
          question_evidence?: Json
          evidence_library?: Json
          risk_rating?: string | null
          business_impact?: string | null
          compliance_requirements?: string[]
          assessment_version?: string
          created_at?: string
          updated_at?: string }
      }
      assessment_versions: {
        Row: {
          id: string
          assessment_id: string
          version_number: string
          version_type: string
          description: string
          changes: Json
          responses_snapshot: Json
          metadata: Json
          tags: string[]
          is_baseline: boolean
          approval_status: string
          approved_by: string | null
          approved_at: string | null
          created_by: string
          created_at: string }
        Insert: {
          id?: string
          assessment_id: string
          version_number: string
          version_type?: string
          description: string
          changes?: Json
          responses_snapshot?: Json
          metadata?: Json
          tags?: string[]
          is_baseline?: boolean
          approval_status?: string
          approved_by?: string | null
          approved_at?: string | null
          created_by: string
          created_at?: string }
        Update: {
          id?: string
          assessment_id?: string
          version_number?: string
          version_type?: string
          description?: string
          changes?: Json
          responses_snapshot?: Json
          metadata?: Json
          tags?: string[]
          is_baseline?: boolean
          approval_status?: string
          approved_by?: string | null
          approved_at?: string | null
          created_by?: string
          created_at?: string }
      }
    }
    Views: {
      [_ in never]: never }
    Functions: {
      [_ in never]: never }
    Enums: {
      [_ in never]: never }
    CompositeTypes: {
      [_ in never]: never }
  }
}