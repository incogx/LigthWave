# LightWave Production - Supabase Setup Guide

## 🚀 Complete Setup Instructions

### Step 1: Create Supabase Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Fill in:
   - **Project Name**: LightWave Production
   - **Database Password**: (create a strong password and save it)
   - **Region**: Choose closest to Chennai (Singapore recommended)
4. Click "Create new project" and wait ~2 minutes

---

### Step 2: Get Your API Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (the long JWT token under "Project API keys")

3. Open the `.env` file in your project root and replace the values:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

---

### Step 3: Create Database Tables

1. In Supabase dashboard, go to **SQL Editor**
2. Click **"+ New query"**
3. Copy and paste this SQL code:

```sql
-- Create projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  event_title TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_location TEXT NOT NULL,
  event_date DATE NOT NULL,
  guest_count INTEGER,
  services_used TEXT[] NOT NULL,
  short_description TEXT NOT NULL,
  highlight_or_challenge TEXT,
  images TEXT[] NOT NULL,
  videos TEXT[],
  before_image_url TEXT,
  after_image_url TEXT,
  instagram_reel_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0
);

-- Create index for faster queries
CREATE INDEX idx_projects_event_date ON projects(event_date DESC);
CREATE INDEX idx_projects_event_type ON projects(event_type);
CREATE INDEX idx_projects_is_featured ON projects(is_featured);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policy: Anyone can view projects
CREATE POLICY "Public projects are viewable by everyone"
ON projects FOR SELECT
TO public
USING (true);

-- Create policy: Only authenticated users can insert
CREATE POLICY "Authenticated users can insert projects"
ON projects FOR INSERT
TO authenticated
WITH CHECK (true);

-- Create policy: Only authenticated users can update
CREATE POLICY "Authenticated users can update projects"
ON projects FOR UPDATE
TO authenticated
USING (true);

-- Create policy: Only authenticated users can delete
CREATE POLICY "Authenticated users can delete projects"
ON projects FOR DELETE
TO authenticated
USING (true);
```

4. Click **"Run"** to execute the SQL
5. You should see "Success. No rows returned"

---

### Step 4: Create Storage Bucket

1. In Supabase dashboard, go to **Storage**
2. Click **"Create a new bucket"**
3. Configure:
   - **Name**: `project-images`
   - **Public bucket**: ✅ Enable (so images are publicly accessible)
4. Click **"Create bucket"**

5. Click on the `project-images` bucket
6. Click **"Policies"** tab
7. Click **"New Policy"** → **"For full customization"**
8. Create this policy:

**Policy Name**: Public Access
**Allowed operation**: SELECT
**Policy definition**: Click "Review" then paste:

```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING ( bucket_id = 'project-images' );
```

9. Create another policy for uploads:

**Policy Name**: Authenticated Upload
**Allowed operation**: INSERT
**Policy definition**:

```sql
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'project-images' );
```

10. Create delete policy:

```sql
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'project-images' );
```

---

### Step 5: Create Admin User

1. In Supabase dashboard, go to **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Fill in:
   - **Email**: your admin email (e.g., admin@lightwave.com)
   - **Password**: create a strong password (minimum 6 characters)
   - **Auto Confirm User**: ✅ Enable
4. Click **"Create user"**

---

### Step 6: Test the Application

1. **Start the development server**:
```bash
npm run dev
```

2. **Access the admin panel**:
   - Go to: `http://localhost:5173/admin/login`
   - Login with the admin email and password you created

3. **Upload your first project**:
   - Click "Add New Project"
   - Fill in all required fields
   - Upload at least one image
   - Click "Upload Project"

4. **View the portfolio**:
   - Go to: `http://localhost:5173`
   - Scroll to the Portfolio section
   - Your project should appear!

---

## 📁 Folder Structure Created

```
project-images/
├── projects/           (Main project images)
└── before-after/       (Before & after comparison images)
```

Images are automatically organized when uploaded through the admin form.

---

## 🔑 Admin Features

### Upload New Project
- `/admin/dashboard` → Click "Add New Project"
- All fields with * are required
- Images are auto-compressed before upload
- Projects marked as "New" if event date is within last 30 days

### View Projects
- Admin dashboard shows all projects
- Click "View" to see on main site
- Click "Delete" to remove (with confirmation)

### Auto-Features
- ✅ Auto-sort by event date (newest first)
- ✅ Auto-categorize by event type
- ✅ Auto-display on homepage immediately after upload
- ✅ Auto-compress images to save storage
- ✅ "New" badge for recent events (last 30 days)

---

## 🎨 Portfolio Features (Client View)

### Filter System
Click any event type to filter:
- All Events
- Weddings
- Corporate
- Cultural Events
- College Events
- DJ Nights
- Live Shows

### Project Gallery
Click any project card to open full-screen gallery with:
- Image slider with navigation
- Before/After comparison slider (if uploaded)
- Full project details panel
- WhatsApp share button
- Instagram Reel link (if provided)
- Thumbnail gallery

### Badges
- **NEW** (green) - Events within last 30 days
- **FEATURED** (amber) - Manually marked as featured

---

## 🔒 Security Features

- ✅ Admin authentication required for uploads
- ✅ Row Level Security (RLS) enabled
- ✅ Public can only view, not modify
- ✅ Authenticated users can manage content
- ✅ Session persistence (stays logged in)

---

## 🚨 Troubleshooting

### "Missing Supabase environment variables"
- Check `.env` file exists in project root
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- Restart dev server after changing `.env`

### "Failed to fetch projects" / No projects showing
- Check SQL table was created (Step 3)
- Verify RLS policies are created
- Check browser console for errors

### Images not uploading
- Verify storage bucket `project-images` exists
- Check storage policies are created (Step 4)
- Ensure bucket is set to "Public"

### Can't login to admin
- Verify admin user was created in Supabase Auth
- Check email/password are correct
- Ensure "Auto Confirm User" was enabled

---

## 📱 Mobile Optimization

All features are mobile-responsive:
- Touch-friendly filters
- Swipe gallery navigation
- Responsive grid layout
- Mobile share sheet support

---

## 🎯 Next Steps (Optional Enhancements)

1. **Edit Projects**: Add edit functionality (currently view/delete only)
2. **Bulk Upload**: Upload multiple projects at once
3. **Analytics**: Track project views and popular event types
4. **Search**: Add search functionality by title/location
5. **Client Testimonials**: Link testimonials to specific projects

---

## 📞 Support

For issues or questions:
- Check Supabase logs: Dashboard → Logs
- Browser console: F12 → Console tab
- Network tab: Check API requests

---

**✨ Your dynamic portfolio is ready! No code edits needed for new projects.**
