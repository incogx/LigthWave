-- ============================================
-- LIGHTWAVE PRODUCTION - SUPABASE SQL SCHEMA
-- Copy this entire file and run in Supabase SQL Editor
-- ============================================

-- Drop existing table if you need to reset (⚠️ WARNING: This deletes all data!)
-- DROP TABLE IF EXISTS projects CASCADE;

-- Create projects table with all required fields
CREATE TABLE IF NOT EXISTS projects (
  -- Primary key and metadata
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- Event details (all required except guest_count)
  event_title TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN (
    'Weddings',
    'Corporate', 
    'Cultural Events',
    'College Events',
    'DJ Nights',
    'Live Shows'
  )),
  event_location TEXT NOT NULL,
  event_date DATE NOT NULL,
  guest_count INTEGER CHECK (guest_count > 0),
  
  -- Services and descriptions
  services_used TEXT[] NOT NULL CHECK (array_length(services_used, 1) > 0),
  short_description TEXT NOT NULL CHECK (char_length(short_description) >= 10),
  highlight_or_challenge TEXT,
  
  -- Media URLs
  images TEXT[] NOT NULL CHECK (array_length(images, 1) > 0),
  videos TEXT[],
  before_image_url TEXT,
  after_image_url TEXT,
  instagram_reel_url TEXT,
  
  -- Display flags
  is_featured BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_event_date ON projects(event_date DESC);
CREATE INDEX IF NOT EXISTS idx_projects_event_type ON projects(event_type);
CREATE INDEX IF NOT EXISTS idx_projects_is_featured ON projects(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_projects_is_new ON projects(is_new) WHERE is_new = true;
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON projects(display_order);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if recreating
DROP POLICY IF EXISTS "Public projects are viewable by everyone" ON projects;
DROP POLICY IF EXISTS "Authenticated users can insert projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can update projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can delete projects" ON projects;

-- Policy 1: Public Read Access
-- Anyone can view all projects (for portfolio display)
CREATE POLICY "Public projects are viewable by everyone"
ON projects FOR SELECT
TO public
USING (true);

-- Policy 2: Authenticated Insert
-- Only logged-in admin users can create new projects
CREATE POLICY "Authenticated users can insert projects"
ON projects FOR INSERT
TO authenticated
WITH CHECK (true);

-- Policy 3: Authenticated Update
-- Only logged-in admin users can edit projects
CREATE POLICY "Authenticated users can update projects"
ON projects FOR UPDATE
TO authenticated
USING (true);

-- Policy 4: Authenticated Delete
-- Only logged-in admin users can delete projects
CREATE POLICY "Authenticated users can delete projects"
ON projects FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================

-- Insert sample project (remove this section for production)
INSERT INTO projects (
  event_title,
  event_type,
  event_location,
  event_date,
  guest_count,
  services_used,
  short_description,
  highlight_or_challenge,
  images,
  is_featured
) VALUES (
  'Grand Wedding Reception',
  'Weddings',
  'Chennai, Tamil Nadu',
  '2024-12-15',
  800,
  ARRAY['Sound System', 'Lighting', 'LED Wall', 'Stage Production'],
  'A magnificent wedding celebration featuring state-of-the-art audio-visual production and stunning stage lighting that created an unforgettable atmosphere for the bride, groom, and their families.',
  'Successfully coordinated live band performances with synchronized lighting effects across a 40ft LED wall display.',
  ARRAY['https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=1200'],
  true
);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check table was created
SELECT COUNT(*) as total_projects FROM projects;

-- View all columns
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'projects'
ORDER BY ordinal_position;

-- Check indexes
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'projects';

-- Check policies
SELECT policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename = 'projects';

-- ============================================
-- USEFUL QUERIES FOR ADMIN
-- ============================================

-- Get all projects sorted by date
-- SELECT * FROM projects ORDER BY event_date DESC;

-- Get featured projects only
-- SELECT * FROM projects WHERE is_featured = true ORDER BY event_date DESC;

-- Get new projects (last 30 days)
-- SELECT * FROM projects WHERE is_new = true ORDER BY event_date DESC;

-- Filter by event type
-- SELECT * FROM projects WHERE event_type = 'Weddings' ORDER BY event_date DESC;

-- Count projects by type
-- SELECT event_type, COUNT(*) as count 
-- FROM projects 
-- GROUP BY event_type 
-- ORDER BY count DESC;

-- Get projects with most services
-- SELECT event_title, array_length(services_used, 1) as service_count
-- FROM projects
-- ORDER BY service_count DESC;
