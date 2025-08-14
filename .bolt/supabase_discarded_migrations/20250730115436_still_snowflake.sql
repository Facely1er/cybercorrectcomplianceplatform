/*
  # Create assessments and related tables

  1. New Tables
    - `assessments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `framework_id` (text)
      - `framework_name` (text)
      - `responses` (jsonb)
      - `organization_info` (jsonb)
      - `is_complete` (boolean)
      - `version` (text)
      - `template_id` (text)
      - `tags` (text array)
      - `notes` (text)
      - `reviewers` (text array)
      - `approval_status` (text)
      - `bookmarks` (text array)
      - `time_spent` (integer)
      - `question_notes` (jsonb)
      - `question_evidence` (jsonb)
      - `evidence_library` (jsonb)
      - `risk_rating` (text)
      - `business_impact` (text)
      - `compliance_requirements` (text array)
      - `assessment_version` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `assessment_versions`
      - `id` (uuid, primary key)
      - `assessment_id` (uuid, references assessments)
      - `version_number` (text)
      - `version_type` (text)
      - `description` (text)
      - `changes` (jsonb)
      - `responses_snapshot` (jsonb)
      - `metadata` (jsonb)
      - `tags` (text array)
      - `is_baseline` (boolean)
      - `approval_status` (text)
      - `approved_by` (uuid, references profiles)
      - `approved_at` (timestamp)
      - `created_by` (uuid, references profiles)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for user data access
*/

-- Create assessments table
CREATE TABLE IF NOT EXISTS assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  framework_id text NOT NULL,
  framework_name text NOT NULL,
  responses jsonb DEFAULT '{}'::jsonb,
  organization_info jsonb DEFAULT '{}'::jsonb,
  is_complete boolean DEFAULT false,
  version text NOT NULL DEFAULT '1.0',
  template_id text,
  tags text[] DEFAULT '{}',
  notes text DEFAULT '',
  reviewers text[] DEFAULT '{}',
  approval_status text DEFAULT 'draft' CHECK (approval_status IN ('draft', 'review', 'approved')),
  bookmarks text[] DEFAULT '{}',
  time_spent integer DEFAULT 0,
  question_notes jsonb DEFAULT '{}'::jsonb,
  question_evidence jsonb DEFAULT '{}'::jsonb,
  evidence_library jsonb DEFAULT '[]'::jsonb,
  risk_rating text CHECK (risk_rating IN ('low', 'medium', 'high', 'critical')),
  business_impact text CHECK (business_impact IN ('low', 'medium', 'high')),
  compliance_requirements text[] DEFAULT '{}',
  assessment_version text DEFAULT '1.0.0',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create assessment_versions table
CREATE TABLE IF NOT EXISTS assessment_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid REFERENCES assessments(id) ON DELETE CASCADE NOT NULL,
  version_number text NOT NULL,
  version_type text DEFAULT 'minor' CHECK (version_type IN ('major', 'minor', 'patch', 'snapshot')),
  description text NOT NULL,
  changes jsonb DEFAULT '[]'::jsonb,
  responses_snapshot jsonb DEFAULT '{}'::jsonb,
  metadata jsonb DEFAULT '{}'::jsonb,
  tags text[] DEFAULT '{}',
  is_baseline boolean DEFAULT false,
  approval_status text DEFAULT 'draft' CHECK (approval_status IN ('draft', 'pending', 'approved', 'rejected')),
  approved_by uuid REFERENCES profiles(id),
  approved_at timestamptz,
  created_by uuid REFERENCES profiles(id) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_versions ENABLE ROW LEVEL SECURITY;

-- Assessment policies
CREATE POLICY "Users can view own assessments"
  ON assessments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own assessments"
  ON assessments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own assessments"
  ON assessments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own assessments"
  ON assessments
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Assessment versions policies
CREATE POLICY "Users can view own assessment versions"
  ON assessment_versions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM assessments 
      WHERE assessments.id = assessment_versions.assessment_id 
      AND assessments.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create assessment versions"
  ON assessment_versions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = created_by AND
    EXISTS (
      SELECT 1 FROM assessments 
      WHERE assessments.id = assessment_versions.assessment_id 
      AND assessments.user_id = auth.uid()
    )
  );

-- Create triggers for updated_at
CREATE TRIGGER handle_assessments_updated_at
  BEFORE UPDATE ON assessments
  FOR EACH ROW
  EXECUTE PROCEDURE handle_updated_at();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_assessments_user_id ON assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_assessments_framework_id ON assessments(framework_id);
CREATE INDEX IF NOT EXISTS idx_assessments_created_at ON assessments(created_at);
CREATE INDEX IF NOT EXISTS idx_assessment_versions_assessment_id ON assessment_versions(assessment_id);
CREATE INDEX IF NOT EXISTS idx_assessment_versions_created_at ON assessment_versions(created_at);