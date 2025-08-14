/*
  # Add Audit Logging Tables

  1. New Tables
    - `audit_logs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `action` (text, the action performed)
      - `resource` (text, the resource type)
      - `resource_id` (text, the specific resource identifier)
      - `changes` (jsonb, the changes made)
      - `previous_values` (jsonb, the previous values)
      - `metadata` (jsonb, additional context)
      - `ip_address` (text, client IP address)
      - `user_agent` (text, browser user agent)
      - `session_id` (text, session identifier)
      - `created_at` (timestamp)

    - `assets`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `name` (text, asset name)
      - `description` (text, asset description)
      - `category` (text, asset category)
      - `subcategory` (text, asset subcategory)
      - `type` (text, asset type)
      - `owner` (text, asset owner)
      - `custodian` (text, asset custodian)
      - `location` (jsonb, location information)
      - `status` (text, asset status)
      - `criticality` (text, criticality level)
      - `information_classification` (text, classification level)
      - `business_value` (text, business value)
      - `technical_specs` (jsonb, technical specifications)
      - `dependencies` (jsonb, asset dependencies)
      - `controls` (jsonb, security controls)
      - `vulnerabilities` (jsonb, vulnerabilities)
      - `risk_assessment` (jsonb, risk assessment data)
      - `compliance` (jsonb, compliance requirements)
      - `lifecycle` (jsonb, lifecycle information)
      - `last_reviewed` (timestamptz, last review date)
      - `next_review` (timestamptz, next review date)
      - `tags` (text[], tags)
      - `metadata` (jsonb, additional metadata)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `asset_relationships`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `source_asset_id` (text, source asset ID)
      - `target_asset_id` (text, target asset ID)
      - `relationship_type` (text, type of relationship)
      - `description` (text, relationship description)
      - `strength` (text, relationship strength)
      - `bidirectional` (boolean, bidirectional relationship)
      - `created_by` (text, creator)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for user data isolation
    - Add audit trigger functions
*/

-- Create audit_logs table
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  action text NOT NULL,
  resource text NOT NULL,
  resource_id text NOT NULL,
  changes jsonb DEFAULT '{}',
  previous_values jsonb DEFAULT '{}',
  metadata jsonb DEFAULT '{}',
  ip_address text,
  user_agent text,
  session_id text,
  created_at timestamptz DEFAULT now()
);

-- Create assets table
CREATE TABLE IF NOT EXISTS assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  subcategory text DEFAULT '',
  type text NOT NULL,
  owner text NOT NULL,
  custodian text DEFAULT '',
  location jsonb DEFAULT '{}',
  status text NOT NULL DEFAULT 'active',
  criticality text NOT NULL DEFAULT 'medium',
  information_classification text NOT NULL DEFAULT 'internal',
  business_value text NOT NULL DEFAULT 'operational',
  technical_specs jsonb DEFAULT '{}',
  dependencies jsonb DEFAULT '[]',
  controls jsonb DEFAULT '[]',
  vulnerabilities jsonb DEFAULT '[]',
  risk_assessment jsonb DEFAULT '{}',
  compliance jsonb DEFAULT '[]',
  lifecycle jsonb DEFAULT '{}',
  last_reviewed timestamptz DEFAULT now(),
  next_review timestamptz DEFAULT (now() + interval '1 year'),
  tags text[] DEFAULT '{}',
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create asset_relationships table
CREATE TABLE IF NOT EXISTS asset_relationships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  source_asset_id text NOT NULL,
  target_asset_id text NOT NULL,
  relationship_type text NOT NULL,
  description text DEFAULT '',
  strength text DEFAULT 'moderate',
  bidirectional boolean DEFAULT false,
  created_by text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE asset_relationships ENABLE ROW LEVEL SECURITY;

-- RLS Policies for audit_logs
CREATE POLICY "Users can view own audit logs"
  ON audit_logs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert audit logs"
  ON audit_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for assets
CREATE POLICY "Users can view own assets"
  ON assets
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own assets"
  ON assets
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own assets"
  ON assets
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own assets"
  ON assets
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for asset_relationships
CREATE POLICY "Users can view own asset relationships"
  ON asset_relationships
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own asset relationships"
  ON asset_relationships
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own asset relationships"
  ON asset_relationships
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own asset relationships"
  ON asset_relationships
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_resource ON audit_logs(resource);

CREATE INDEX IF NOT EXISTS idx_assets_user_id ON assets(user_id);
CREATE INDEX IF NOT EXISTS idx_assets_category ON assets(category);
CREATE INDEX IF NOT EXISTS idx_assets_criticality ON assets(criticality);
CREATE INDEX IF NOT EXISTS idx_assets_status ON assets(status);
CREATE INDEX IF NOT EXISTS idx_assets_created_at ON assets(created_at);

CREATE INDEX IF NOT EXISTS idx_asset_relationships_user_id ON asset_relationships(user_id);
CREATE INDEX IF NOT EXISTS idx_asset_relationships_source ON asset_relationships(source_asset_id);
CREATE INDEX IF NOT EXISTS idx_asset_relationships_target ON asset_relationships(target_asset_id);

-- Trigger for updated_at on assets
CREATE OR REPLACE FUNCTION handle_assets_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'handle_assets_updated_at'
  ) THEN
    CREATE TRIGGER handle_assets_updated_at
      BEFORE UPDATE ON assets
      FOR EACH ROW
      EXECUTE FUNCTION handle_assets_updated_at();
  END IF;
END $$;