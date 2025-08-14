/*
  # Assessment and Assessment Versions Tables

  1. New Tables
    - `assessments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
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
      - `approval_status` (text with check constraint)
      - `bookmarks` (text array)
      - `time_spent` (integer)
      - `question_notes` (jsonb)
      - `question_evidence` (jsonb)
      - `evidence_library` (jsonb)
      - `risk_rating` (text with check constraint)
      - `business_impact` (text with check constraint)
      - `compliance_requirements` (text array)
      - `assessment_version` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `assessment_versions`
      - `id` (uuid, primary key)
      - `assessment_id` (uuid, foreign key to assessments)
      - `version_number` (text)
      - `version_type` (text with check constraint)
      - `description` (text)
      - `changes` (jsonb)
      - `responses_snapshot` (jsonb)
      - `metadata` (jsonb)
      - `tags` (text array)
      - `is_baseline` (boolean)
      - `approval_status` (text with check constraint)
      - `approved_by` (uuid, foreign key to profiles)
      - `approved_at` (timestamptz)
      - `created_by` (uuid, foreign key to profiles)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own assessments
    - Add policies for assessment versions with proper access control

  3. Performance
    - Add indexes for user_id, framework_id, and timestamps
    - Add trigger for updated_at timestamp
*/

-- Drop existing policies if they exist to avoid conflicts
DO $$ 
BEGIN
  -- Drop assessment policies if they exist
  DROP POLICY IF EXISTS "Users can view own assessments" ON assessments;
  DROP POLICY IF EXISTS "Users can create own assessments" ON assessments;
  DROP POLICY IF EXISTS "Users can update own assessments" ON assessments;
  DROP POLICY IF EXISTS "Users can delete own assessments" ON assessments;
  
  -- Drop assessment_versions policies if they exist
  DROP POLICY IF EXISTS "Users can view own assessment versions" ON assessment_versions;
  DROP POLICY IF EXISTS "Users can create assessment versions" ON assessment_versions;
EXCEPTION
  WHEN undefined_object THEN
    NULL; -- Ignore if policies don't exist
END $$;

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

-- Create new assessment policies
CREATE POLICY "Users can read own assessments"
  ON assessments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own assessments"
  ON assessments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can modify own assessments"
  ON assessments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can remove own assessments"
  ON assessments
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create new assessment versions policies
CREATE POLICY "Users can read own assessment versions"
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

CREATE POLICY "Users can insert assessment versions"
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

-- Create triggers for updated_at (only if function exists)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'handle_updated_at') THEN
    DROP TRIGGER IF EXISTS handle_assessments_updated_at ON assessments;
    CREATE TRIGGER handle_assessments_updated_at
      BEFORE UPDATE ON assessments
      FOR EACH ROW
      EXECUTE PROCEDURE handle_updated_at();
  END IF;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_assessments_user_id ON assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_assessments_framework_id ON assessments(framework_id);
CREATE INDEX IF NOT EXISTS idx_assessments_created_at ON assessments(created_at);
CREATE INDEX IF NOT EXISTS idx_assessment_versions_assessment_id ON assessment_versions(assessment_id);
CREATE INDEX IF NOT EXISTS idx_assessment_versions_created_at ON assessment_versions(created_at);