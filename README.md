# 🎬 LightWave Production - Dynamic Portfolio Website

A modern, full-stack portfolio website for **LightWave Production** - an event production and live technical services company based in Chennai, Tamil Nadu, India.

Built with React, TypeScript, Tailwind CSS, and Supabase for dynamic content management.

---

## ✨ Features

### 🎨 Client-Facing Features
- **Dynamic Portfolio Gallery** - Auto-updates when new projects are uploaded
- **Event Type Filters** - Weddings, Corporate, Cultural Events, College Events, DJ Nights, Live Shows
- **Full-Screen Image Gallery** - Image slider with navigation and thumbnails
- **Before/After Comparison** - Interactive slider for transformation showcases
- **Project Badges** - "New" and "Featured" badges on recent/highlighted projects
- **WhatsApp Share** - Share projects directly via WhatsApp
- **Instagram Reel Integration** - Embed Instagram Reels in project details
- **Lazy Loading** - Optimized image loading for fast performance
- **Mobile Responsive** - Perfect experience on all devices

### 🔐 Admin Features
- **Secure Admin Login** - Protected with Supabase Authentication
- **Project Upload Form** - Complete form with validation
- **Multi-Image Upload** - Support for multiple project images
- **Auto Image Compression** - Automatic client-side image optimization
- **Before/After Upload** - Separate upload for comparison images
- **Auto-Categorization** - Projects auto-categorized by event type
- **Auto-Sort by Date** - Newest projects appear first
- **Auto "New" Badge** - Projects within 30 days get "New" badge
- **Instant Publish** - No code changes needed - projects appear immediately
- **Delete Projects** - Easy project management with confirmation

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Supabase account (free tier works perfectly)

### Installation

1. **Clone and Install**
```bash
cd LigthWave
npm install
```

2. **Setup Supabase** (5 minutes)
   - Follow the complete guide in `SETUP_GUIDE.md`
   - Create Supabase project
   - Run SQL schema from `database-schema.sql`
   - Create storage bucket
   - Create admin user

3. **Configure Environment**
```bash
# Copy .env.example to .env
# Add your Supabase credentials
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

4. **Start Development Server**
```bash
npm run dev
```

5. **Access the Site**
   - Website: `http://localhost:5173`
   - Admin Login: `http://localhost:5173/admin/login`

---

## 📁 Project Structure

```
LigthWave/
├── src/
│   ├── components/          # React components
│   │   ├── About.tsx
│   │   ├── AdminDashboard.tsx   # Admin dashboard
│   │   ├── AdminLogin.tsx        # Login page
│   │   ├── BeforeAfterSlider.tsx # Comparison slider
│   │   ├── Contact.tsx
│   │   ├── Expertise.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── ImageGallery.tsx      # Full-screen gallery
│   │   ├── Navigation.tsx
│   │   ├── Portfolio.tsx         # Dynamic portfolio
│   │   ├── Pricing.tsx
│   │   ├── ProjectList.tsx       # Admin project list
│   │   ├── ProjectUploadForm.tsx # Upload form
│   │   ├── Services.tsx
│   │   ├── Skills.tsx
│   │   ├── Testimonials.tsx
│   │   └── Tools.tsx
│   ├── lib/
│   │   ├── supabase.ts          # Supabase client
│   │   ├── database.types.ts    # TypeScript types
│   │   └── types.ts             # App types
│   ├── App.tsx                  # Main app with routing
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
├── .env                         # Environment variables
├── .env.example                 # Environment template
├── database-schema.sql          # Database schema
├── SETUP_GUIDE.md              # Complete setup guide
└── package.json
```

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS 3
- **Routing**: React Router 6
- **Backend**: Supabase (PostgreSQL + Storage + Auth)
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Image Optimization**: browser-image-compression

---

## 📊 Database Schema

### Projects Table

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | ✅ | Auto-generated primary key |
| created_at | Timestamp | ✅ | Auto-generated creation time |
| event_title | Text | ✅ | Event name/title |
| event_type | Text | ✅ | Weddings, Corporate, etc. |
| event_location | Text | ✅ | City, state |
| event_date | Date | ✅ | When event occurred |
| guest_count | Integer | ❌ | Number of guests |
| services_used | Text[] | ✅ | Array of services |
| short_description | Text | ✅ | Brief description |
| highlight_or_challenge | Text | ❌ | What made it special |
| images | Text[] | ✅ | Array of image URLs |
| videos | Text[] | ❌ | Array of video URLs |
| before_image_url | Text | ❌ | Before comparison image |
| after_image_url | Text | ❌ | After comparison image |
| instagram_reel_url | Text | ❌ | Instagram Reel link |
| is_featured | Boolean | ✅ | Show "Featured" badge |
| is_new | Boolean | ✅ | Auto-calculated (30 days) |
| display_order | Integer | ✅ | Manual ordering |

---

## 🎯 Usage Guide

### For Admins

1. **Login**: Go to `/admin/login`
2. **Upload Project**: 
   - Click "Add New Project"
   - Fill all required fields (marked with *)
   - Upload at least one image
   - Optionally add before/after images
   - Check "Featured" if this is a highlight project
   - Click "Upload Project"
3. **Manage Projects**:
   - View all projects in dashboard
   - Click "View" to see on main site
   - Click "Delete" to remove (with confirmation)

### For Visitors

1. Browse portfolio with filter buttons
2. Click any project to open full gallery
3. Navigate images with arrow buttons
4. View all project details in side panel
5. Share via WhatsApp using share button
6. Watch Instagram Reels if available

---

## 🔒 Security

- Row Level Security (RLS) enabled on database
- Public can only read projects
- Admin authentication required for uploads/edits/deletes
- Secure image storage with Supabase Storage
- Environment variables for API keys

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

### Deploy to Netlify

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Add environment variables
4. Deploy!

---

## 📈 Future Enhancements

- [ ] Edit existing projects
- [ ] Bulk image upload
- [ ] Video upload support
- [ ] Project analytics
- [ ] Search functionality
- [ ] Client testimonials linked to projects
- [ ] Email notifications on new uploads
- [ ] SEO optimization
- [ ] PDF export of projects

---

## 🤝 Support

For setup help:
1. Check `SETUP_GUIDE.md` for detailed instructions
2. Review `database-schema.sql` for database setup
3. Check browser console for errors (F12)
4. Review Supabase logs in dashboard

---

## 📄 License

Copyright © 2024 LightWave Production. All rights reserved.

---

## 👨‍💻 Developer

Built for **LightWave Production**  
Chennai, Tamil Nadu, India

**Services**: Sound • Light • LED Wall • Stage Production

---

**✨ Portfolio updates automatically - no code changes needed!**
