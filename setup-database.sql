-- ============================================
-- LIGHTWAVE PRODUCTIONS - COMPLETE DATABASE SETUP
-- Run this in Supabase SQL Editor
-- ============================================

-- Step 1: Create the projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- Event details
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

-- Step 2: Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_event_date ON projects(event_date DESC);
CREATE INDEX IF NOT EXISTS idx_projects_event_type ON projects(event_type);
CREATE INDEX IF NOT EXISTS idx_projects_is_featured ON projects(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_projects_is_new ON projects(is_new) WHERE is_new = true;

-- Step 3: Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Step 4: Drop existing policies if any
DROP POLICY IF EXISTS "Public projects are viewable by everyone" ON projects;
DROP POLICY IF EXISTS "Authenticated users can insert projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can update projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can delete projects" ON projects;

-- Step 5: Create RLS Policies
CREATE POLICY "Public projects are viewable by everyone"
ON projects FOR SELECT
TO public
USING (true);

CREATE POLICY "Authenticated users can insert projects"
ON projects FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
ON projects FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete projects"
ON projects FOR DELETE
TO authenticated
USING (true);

-- Step 6: Insert sample projects for LightWave Productions
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
  is_featured,
  is_new
) VALUES 
(
  'Grand Corporate Annual Gala 2024',
  'Corporate',
  'Chennai, Tamil Nadu',
  '2024-12-10',
  1200,
  ARRAY['Sound System', 'Lighting', 'LED Wall', 'Stage Production', 'Live Streaming'],
  'A spectacular corporate annual event featuring cutting-edge audiovisual production, synchronized LED wall displays, and immersive lighting design that transformed the venue into a professional showcase.',
  'Successfully integrated live streaming with multi-camera setup while maintaining perfect audio sync across a 50,000 sq ft venue. The LED wall displayed real-time social media feeds and company achievements.',
  ARRAY['https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1600'],
  true,
  true
),
(
  'Royal Wedding Reception at Leela Palace',
  'Weddings',
  'Chennai, Tamil Nadu',
  '2024-11-25',
  800,
  ARRAY['Sound System', 'Lighting', 'LED Wall', 'Stage Production'],
  'An elegant wedding celebration featuring romantic lighting design, crystal-clear audio for live performances, and a stunning LED backdrop that created the perfect ambiance for the couple''s special day.',
  'Created a custom lighting scheme that transitioned from warm golden tones during dinner to vibrant colors for the dance floor, all synchronized with the music tempo.',
  ARRAY['https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=1600'],
  true,
  true
),
(
  'Inter-College Cultural Festival',
  'College Events',
  'Anna University, Chennai',
  '2024-10-15',
  3000,
  ARRAY['Sound System', 'Lighting', 'DJ Services', 'Live Streaming'],
  'A high-energy 3-day cultural festival featuring multiple concurrent performances, DJ nights, and competitions. Provided seamless technical support across 5 different stages with quick changeovers.',
  'Managed 150+ performances over 3 days with zero technical failures. Implemented wireless microphone system that covered the entire 10-acre campus.',
  ARRAY['https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1600'],
  false,
  false
),
(
  'Live Concert - Tamil Artist Tour',
  'Live Shows',
  'YMCA Grounds, Chennai',
  '2024-09-20',
  5000,
  ARRAY['Sound System', 'Lighting', 'LED Wall', 'Stage Production', 'Video Production'],
  'Major live concert production for a renowned Tamil artist featuring stadium-grade sound system, dynamic stage lighting, and 4K video capture for live broadcast and social media.',
  'Deployed a 100KW sound system with delay towers to ensure even coverage for 5000+ audience. The LED wall displayed live camera feeds and custom visuals synchronized with the performance.',
  ARRAY['https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1600'],
  true,
  false
);

-- Verification queries
SELECT 'Database setup complete! Total projects:' as status, COUNT(*) as count FROM projects;
SELECT event_type, COUNT(*) as count FROM projects GROUP BY event_type ORDER BY count DESC;
