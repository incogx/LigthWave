# 🚀 Database Setup - Step by Step

## ✅ Your Supabase Credentials Are Configured!

Your `.env` file already has:
- **Project URL**: https://cyhipbcyenrmwzhqqrt.supabase.co
- **Anon Key**: Configured ✅

---

## 📋 Follow These Steps Now:

### Step 1: Create Database Tables ⏱️ 2 minutes

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard/project/cyhipbcyenrmwzhqqrt
   - Click on **SQL Editor** in left sidebar

2. **Run the SQL Script**
   - Click **"+ New query"**
   - Copy ALL contents from `setup-database.sql` file
   - Paste into the editor
   - Click **"Run"** button (or press Ctrl/Cmd + Enter)

3. **Verify Success**
   - You should see: "Database setup complete! Total projects: 4"
   - This means 4 sample projects were created

### Step 2: Create Storage Bucket ⏱️ 3 minutes

1. **Go to Storage Section**
   - Click **Storage** in left sidebar
   - Click **"Create a new bucket"**

2. **Configure Bucket**
   - **Name**: `project-images` (exactly this name!)
   - **Public bucket**: ✅ **ENABLE THIS** (very important!)
   - Click **"Create bucket"**

3. **Add Storage Policies**
   
   Click on your `project-images` bucket → **Policies** tab
   
   **Policy 1: Public Read Access**
   - Click **"New Policy"** → **"For full customization"**
   - Name: `Public Read Access`
   - Allowed operation: **SELECT**
   - Target roles: **public**
   - Click **"Review"** → **"Save policy"**
   - Use this SQL:
   ```sql
   CREATE POLICY "Public Read Access"
   ON storage.objects FOR SELECT
   TO public
   USING (bucket_id = 'project-images');
   ```

   **Policy 2: Authenticated Upload**
   - Click **"New Policy"** → **"For full customization"**
   - Name: `Authenticated Upload`
   - Allowed operation: **INSERT**
   - Target roles: **authenticated**
   - Use this SQL:
   ```sql
   CREATE POLICY "Authenticated Upload"
   ON storage.objects FOR INSERT
   TO authenticated
   WITH CHECK (bucket_id = 'project-images');
   ```

   **Policy 3: Authenticated Delete**
   - Click **"New Policy"** → **"For full customization"**
   - Name: `Authenticated Delete`
   - Allowed operation: **DELETE**
   - Target roles: **authenticated**
   - Use this SQL:
   ```sql
   CREATE POLICY "Authenticated Delete"
   ON storage.objects FOR DELETE
   TO authenticated
   USING (bucket_id = 'project-images');
   ```

### Step 3: Create Admin User ⏱️ 1 minute

1. **Go to Authentication**
   - Click **Authentication** in left sidebar
   - Click **"Users"** tab
   - Click **"Add user"** → **"Create new user"**

2. **Create Admin**
   - **Email**: Your email (e.g., admin@lightwave.com)
   - **Password**: Create a strong password (save this!)
   - **Auto Confirm User**: ✅ **ENABLE THIS**
   - Click **"Create user"**

---

## 🎉 Test Your Setup!

### Your Dev Server is Already Running!
Visit: http://localhost:5173

### Try These:

**1. View Sample Projects**
- Go to: http://localhost:5173
- Scroll to Portfolio section
- You should see 4 sample projects with LightWave branding!

**2. Login to Admin**
- Go to: http://localhost:5173/admin/login
- Use the email/password you just created
- You should see the admin dashboard

**3. Upload Your First Real Project**
- Click "Add New Project"
- Fill in your actual event details
- Upload real photos
- Click "Upload Project"
- See it appear instantly on the main site!

---

## ✅ Quick Verification Checklist

- [ ] SQL script ran successfully (shows "4 projects")
- [ ] Storage bucket `project-images` created
- [ ] Bucket is set to **Public**
- [ ] All 3 storage policies created
- [ ] Admin user created
- [ ] Can see 4 sample projects on website
- [ ] Can login to admin panel
- [ ] Can upload a new project

---

## 🎨 Customize Your Brand

The sample projects are using placeholder images. Here's how to make it yours:

1. **Delete Sample Projects**
   - Login to admin
   - Click delete on each sample project
   - Or run in SQL Editor: `DELETE FROM projects;`

2. **Upload Real Projects**
   - Use your actual event photos
   - Write your real event descriptions
   - Add your Instagram Reels
   - Mark best ones as "Featured"

3. **Update Logo**
   - Your logo is already beautiful!
   - To use it in the site, upload to Supabase Storage
   - Update Navigation.tsx with the URL

---

## 🆘 Need Help?

**SQL Error?**
→ Make sure you copied the entire `setup-database.sql` file

**Can't Create Bucket?**
→ Ensure you're on the correct Supabase project

**Login Not Working?**
→ Check you enabled "Auto Confirm User" when creating admin

**Images Not Uploading?**
→ Verify bucket is Public and policies are created

---

## 📞 What's Next?

1. **Complete the 3 steps above** ⏱️ ~6 minutes total
2. **Test with sample data** - See if it works!
3. **Delete samples and add real projects** - Make it yours!
4. **Customize branding** - Add your colors, update text
5. **Deploy to production** - Make it live!

---

**Your beautiful LightWave Productions logo with that colorful wave will look amazing on the live site!** 🌊✨
