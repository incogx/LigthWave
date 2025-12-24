# ✅ LightWave Production - Quick Start Checklist

Complete these steps in order to get your dynamic portfolio running:

## 1️⃣ Supabase Setup (10 minutes)

### Create Project
- [ ] Go to https://supabase.com/dashboard
- [ ] Click "New Project"
- [ ] Name: "LightWave Production"
- [ ] Choose region: Singapore (closest to Chennai)
- [ ] Set database password (save it!)
- [ ] Wait for project to be ready (~2 minutes)

### Get API Credentials
- [ ] Go to Settings → API
- [ ] Copy **Project URL** 
- [ ] Copy **anon/public key**
- [ ] Paste both into `.env` file

### Create Database Table
- [ ] Go to SQL Editor
- [ ] Click "New query"
- [ ] Copy contents of `database-schema.sql`
- [ ] Paste and click "Run"
- [ ] Verify: "Success. No rows returned"

### Create Storage Bucket
- [ ] Go to Storage
- [ ] Click "Create a new bucket"
- [ ] Name: `project-images`
- [ ] Public bucket: ✅ Enabled
- [ ] Create bucket
- [ ] Click bucket → Policies tab
- [ ] Create 3 policies (see SETUP_GUIDE.md Step 4)

### Create Admin User
- [ ] Go to Authentication → Users
- [ ] Click "Add user"
- [ ] Email: your email
- [ ] Password: create strong password
- [ ] Auto Confirm User: ✅ Enabled
- [ ] Create user

---

## 2️⃣ Local Setup (2 minutes)

### Install Dependencies
```bash
npm install
```

### Configure Environment
- [ ] Open `.env` file
- [ ] Replace `your_supabase_project_url` with your URL
- [ ] Replace `your_supabase_anon_key` with your key
- [ ] Save file

### Start Development Server
```bash
npm run dev
```

---

## 3️⃣ First Test (3 minutes)

### Login to Admin
- [ ] Open browser: http://localhost:5173/admin/login
- [ ] Enter admin email and password
- [ ] Click "Login to Dashboard"
- [ ] Should see admin dashboard

### Upload First Project
- [ ] Click "Add New Project"
- [ ] Fill in:
  - [ ] Event Title (e.g., "Grand Wedding Reception")
  - [ ] Event Type (select from dropdown)
  - [ ] Location (e.g., "Chennai, Tamil Nadu")
  - [ ] Event Date (pick any date)
  - [ ] Guest Count (optional)
  - [ ] Services Used (click at least one)
  - [ ] Short Description (min 10 characters)
- [ ] Upload at least one image
- [ ] Click "Upload Project"
- [ ] Wait for success message

### View on Portfolio
- [ ] Go to: http://localhost:5173
- [ ] Scroll to "Portfolio Highlights" section
- [ ] Your project should appear!
- [ ] Click project to open full gallery

---

## 4️⃣ Verification

Run through this checklist to ensure everything works:

### Database
- [ ] Can view projects in Supabase Table Editor
- [ ] RLS policies are enabled
- [ ] Public can read, authenticated can write

### Storage
- [ ] Images appear in `project-images` bucket
- [ ] Images are publicly accessible
- [ ] Organized in `projects/` folder

### Frontend
- [ ] Portfolio loads without errors
- [ ] Filter buttons work
- [ ] Can open project gallery
- [ ] Images load properly
- [ ] Share button works

### Admin
- [ ] Can login/logout
- [ ] Can upload new projects
- [ ] Can delete projects
- [ ] Projects appear instantly on site

---

## 🎉 Success!

If all checkboxes are ticked, your dynamic portfolio is fully operational!

### Next Steps:
1. Upload more projects to build your portfolio
2. Customize colors/branding in Tailwind config
3. Update company info in About/Hero sections
4. Deploy to production (Vercel/Netlify)

---

## 🆘 Troubleshooting

### "Missing Supabase environment variables"
→ Check `.env` file has correct values and restart dev server

### "Failed to fetch projects"
→ Verify SQL schema was run and RLS policies exist

### Images not uploading
→ Check storage bucket is public and policies are created

### Can't login
→ Verify admin user was created with "Auto Confirm" enabled

---

## 📚 Documentation

- **Full Setup Guide**: `SETUP_GUIDE.md`
- **Database Schema**: `database-schema.sql`
- **Project README**: `README.md`

---

**Need help?** Check browser console (F12) and Supabase logs for error details.
