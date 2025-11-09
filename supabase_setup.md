# Supabase Database Setup Guide

## Quick Setup Steps

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click **"New Project"**
3. Enter project details:
   - **Name**: Seva Mela 2025
   - **Database Password**: (create a strong password - save it!)
   - **Region**: Choose closest to your location
4. Click **"Create new project"** (takes ~2 minutes)

### 2. Run Database Schema
1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Copy the entire contents of `database_schema.sql`
4. Paste into the SQL editor
5. Click **"Run"** (bottom right)
6. You should see: "Success. No rows returned"

### 3. Get Your API Credentials
1. Go to **Project Settings** (gear icon in left sidebar)
2. Click **API** tab
3. Copy these two values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

### 4. Update index.html
1. Open `index.html` in a text editor
2. Find these lines (around line 764-765):
   ```javascript
   const SUPABASE_URL = 'YOUR_SUPABASE_URL';
   const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
   ```
3. Replace with your actual values:
   ```javascript
   const SUPABASE_URL = 'https://xxxxx.supabase.co';
   const SUPABASE_ANON_KEY = 'eyJhbGc...your-actual-key';
   ```
4. Save the file

### 5. Deploy
Upload `index.html` and the `images` folder to your web server or hosting platform.

## Important Notes

### Admin PIN
- Default admin PIN is `9876` (change it in `index.html` around line 962)
- Search for: `const ADMIN_PIN = '9876';`

### Game Configuration
- Edit game details in the `GAMES` array (around line 907)
- Modify: names, QR codes, points, coins, images, slogans

### Data Migration (If you have existing data)
If you already have players in the database with old data structure, run this SQL query:

```sql
UPDATE game_scores 
SET game_percent = NULL 
WHERE scanned = true 
  AND game_percent = 0 
  AND stage_percent > 0;
```

This fixes the "pending players" logic by marking unawarded players correctly.

## Troubleshooting

**Issue**: "Failed to fetch" or CORS errors
- **Fix**: Check if Supabase URL and API key are correct
- Make sure you're using the `anon` key, not `service_role` key

**Issue**: No pending players showing up
- **Fix**: Run the data migration SQL query above

**Issue**: Players not saving
- **Fix**: Check browser console for errors
- Verify RLS policies are set correctly (database_schema.sql includes these)