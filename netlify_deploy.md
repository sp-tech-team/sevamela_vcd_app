# Netlify Deployment Guide

## Quick Deploy to Netlify

### Option 1: Drag & Drop (Easiest)

1. Go to [app.netlify.com](https://app.netlify.com)
2. Sign up/login (use GitHub, Google, or email)
3. Click **"Add new site"** → **"Deploy manually"**
4. Drag & drop your project folder (containing `index.html`, `qr-generator.html` and `images/`)
5. Done! Your site is live at `https://random-name.netlify.app`

### Option 2: GitHub Deploy (Recommended for Team)

#### Step 1: Create GitHub Repository
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/seva-mela-2025.git
git push -u origin main
```

#### Step 2: Deploy on Netlify
1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and authorize
4. Select your `seva-mela-2025` repository
5. Build settings:
   - **Build command**: (leave empty)
   - **Publish directory**: `.` (current directory)
6. Click **"Deploy site"**

#### Step 3: Enable Public Collaboration

**Make Repository Public:**
1. Go to your GitHub repo → **Settings**
2. Scroll to **Danger Zone** → **Change visibility**
3. Click **"Change to public"**

**Add Collaborators:**
1. Go to **Settings** → **Collaborators**
2. Click **"Add people"**
3. Enter GitHub usernames or emails
4. Set permission level:
   - **Write** - Can push code directly
   - **Admin** - Full access

**OR Use Branch Protection (Better for Teams):**
1. **Settings** → **Branches** → **Add rule**
2. Branch name pattern: `main`
3. Enable:
   - ✓ Require pull request reviews before merging
   - ✓ Require status checks to pass
4. Now anyone can fork, make changes, and submit PRs

### Option 3: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

## Custom Domain (Optional)

1. In Netlify dashboard → **Domain settings**
2. Click **"Add custom domain"**
3. Follow DNS setup instructions

## Environment Variables

1. Netlify dashboard → **Site settings** → **Environment variables**
2. Add (for security):
   - `SUPABASE_URL` = your Supabase project URL
   - `SUPABASE_ANON_KEY` = your Supabase anon key
3. Update `index.html` to use: `const SUPABASE_URL = process.env.SUPABASE_URL || 'fallback_url';`

## Auto-Deploy Setup

Once connected to GitHub:
- Every push to `main` branch → Auto-deploys
- Preview deployments for pull requests
- Rollback to any previous deploy instantly

## Team Workflow

1. **Clone the repo**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/seva-mela-2025.git
   cd seva-mela-2025
   ```

2. **Make changes** to `index.html` or files

3. **Push changes**:
   ```bash
   git add .
   git commit -m "Updated game points"
   git push
   ```

4. **Auto-deploy**: Netlify rebuilds in ~30 seconds

## Netlify Features

- ✅ Free SSL certificate (HTTPS)
- ✅ CDN with global distribution
- ✅ Automatic deployments from Git
- ✅ Deploy previews for branches
- ✅ Rollback to any version
- ✅ Custom domains
- ✅ Form handling
- ✅ Serverless functions (if needed)

## Troubleshooting

**404 on refresh**: Add `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Images not loading**: Ensure `images/` folder is in root directory

**Supabase CORS errors**: Add your Netlify URL to Supabase allowed origins