# Seva Mela 2025 - Event Management System

Gamified event management with QR scanning, real-time scoring, and admin controls.
Website link: https://vcd-sevamela.netlify.app

## 📁 Project Files

```
seva-mela-2025/
├── index.html              # Main application (user + admin interface)
├── qr-generator.html       # QR code generator & PDF printer
├── database_schema.sql     # Supabase database setup
├── SUPABASE_SETUP.md      # Database configuration guide
├── NETLIFY_DEPLOY.md      # Netlify hosting guide
├── README.md              # This file
└── images/                # Game images folder
    ├── splash_screen.png
    ├── wheel_game.png
    ├── memory_card.png
    ├── volunteer_journey.png
    ├── volunteer_tree.png
    └── README.md
```

## 🚀 Quick Start

### 1. Setup Database
```bash
# Follow SUPABASE_SETUP.md
# - Create Supabase project
# - Run database_schema.sql
# - Get API credentials
# - Update index.html with SUPABASE_URL and SUPABASE_ANON_KEY
```

### 2. Generate QR Codes
```bash
# Open qr-generator.html in browser
# Click "Generate All QR Codes"
# Click "Download PDF"
# Print for event
```

### 3. Deploy
```bash
# See NETLIFY_DEPLOY.md for full guide
# Quick: Drag & drop folder to netlify.com
# OR: Connect GitHub repo for auto-deploy
```

## 🎮 Features

### User View
- **QR Scanning** - Unlock stages, earn stage points
- **Progress Tracking** - Real-time % completion
- **Status Badges**:
  - 🔒 Not Scanned (stage locked)
  - ⏳ Game Pending (scanned, awaiting admin points)
  - ✓ Done (fully complete)
- **Leaderboard** - Live rankings with search
- **Auto-refresh** - Updates every 5 seconds
- **Persistent Login** - 7-day session

### Admin View
- **Pending Players** - See who needs game points
- **Award Points** - Give 0-max coins per game
- **Quick Discard** - Award 0% instantly
- **Player Management** - View all participants, delete if needed
- **Auto-refresh** - Pending list updates every 5 seconds
- **Two Views**: Home (game tiles) & Scores (all players)

## ⚙️ Configuration

### Change Admin PIN
```javascript
// Line ~962 in index.html
const ADMIN_PIN = '9876'; // Change this
```

### Edit Games
```javascript
// Line ~907 in index.html
const GAMES = [
  {
    id: 'game1',
    name: 'Your Game Name',
    qrCode: 'YOUR_QR_TEXT',      // Text encoded in QR
    image: 'images/your_img.png',
    stageName: 'Stage Name',
    stageSlogan: 'Your slogan',
    stagePoints: 10,              // Auto-awarded on scan
    gamePoints: 15,               // Max % from game
    maxCoins: 50                  // Max coins admin can award
  },
  // Add more games...
];
```

### Points System
- **Stage Points**: Auto-awarded when QR scanned
- **Game Points**: Manual admin award based on performance
  - Formula: `(coins_awarded / maxCoins) × gamePoints`
  - Example: 25/50 coins × 15% = 7.5% game points
- **Total Score**: Sum of all stage + game points (max 100%)

### Edit Categories
```javascript
// Line ~1950 in index.html
<option value="Isha Volunteer">Isha Volunteer</option>
<option value="Isha Brahmachari">Isha Brahmachari</option>
// Add more categories...
```

## 🆕 Adding New Games

### Step 1: Update Code
```javascript
// In index.html, add to GAMES array (line ~907)
{
  id: 'game5',                        // Unique ID
  name: 'New Game Name',
  qrCode: 'GAME5_YOUR_IDENTIFIER',    // For QR
  image: 'images/new_game.png',       // Add image to images/
  stageName: 'New Stage Name',
  stageSlogan: 'Inspiring quote',
  stagePoints: 10,
  gamePoints: 20,
  maxCoins: 100
}
```

### Step 2: Update QR Generator
```javascript
// In qr-generator.html, add to GAMES array (line ~56)
{ 
  id: 'game5', 
  name: 'New Game Name', 
  qrCode: 'GAME5_YOUR_IDENTIFIER', 
  icon: '🎯' 
}
```

### Step 3: Generate New QR
1. Open `qr-generator.html`
2. Click "Generate All QR Codes"
3. Click "Download PDF"
4. Print new page

### Step 4: Deploy
```bash
git add .
git commit -m "Added Game 5"
git push  # Auto-deploys on Netlify
```

## 🗄️ Database Structure

### Tables
- **players**: User info (name, category, is_admin)
- **game_scores**: Progress tracking (scanned, stage_percent, game_percent, hasBeenAwarded)

### Key Fields
- `scanned`: Boolean - QR code scanned
- `stage_percent`: Int - Stage points earned
- `game_percent`: Int/NULL - Game points (NULL = not awarded yet)
- `hasBeenAwarded`: Derived - true if game_percent is not NULL

## 🔧 Maintenance

### View Database
1. Supabase dashboard → **Table Editor**
2. Browse `players` and `game_scores` tables

### Fix "Pending Players" Issue
```sql
-- If old data shows no pending players:
UPDATE game_scores 
SET game_percent = NULL 
WHERE scanned = true 
  AND game_percent = 0 
  AND stage_percent > 0;
```

### Backup Database
```sql
-- Supabase dashboard → Database → Backups
-- OR export as SQL:
pg_dump -h YOUR_HOST -U postgres YOUR_DB > backup.sql
```

### Clear All Data (Reset Event)
```sql
DELETE FROM game_scores;
DELETE FROM players;
```

## 🌐 Hosting Options

### Netlify (Recommended)
- Free tier sufficient
- Auto-deploy from GitHub
- Custom domain support
- See `NETLIFY_DEPLOY.md`

### Alternatives
- **Vercel**: Similar to Netlify
- **GitHub Pages**: Free, but no custom headers
- **Firebase Hosting**: Google Cloud integration
- **Any static host**: Just upload files

## 👥 Team Collaboration

### GitHub Workflow
```bash
# Clone repo
git clone https://github.com/YOUR_ORG/seva-mela-2025.git

# Create feature branch
git checkout -b add-game-5

# Make changes
# Edit index.html, add images, etc.

# Commit and push
git add .
git commit -m "Added Game 5 with scoring rules"
git push origin add-game-5

# Create Pull Request on GitHub
# Team reviews → Merge → Auto-deploy
```

### Access Control
- **Public Repo**: Anyone can view/fork
- **Collaborators**: Add team members in GitHub Settings
- **Branch Protection**: Require PR reviews before merge

## 📱 Mobile Optimization

Already mobile-responsive:
- Touch-friendly buttons
- QR scanner works on mobile cameras
- Bottom navigation bar
- Swipe-friendly modals

## 🔐 Security

- ✅ Admin PIN protection
- ✅ Row Level Security (RLS) in Supabase
- ✅ Client uses `anon` key only
- ✅ Session expires after 7 days
- ⚠️ Change default PIN in production
- ⚠️ Keep `service_role` key private

## 🎨 Customization

### Colors
```javascript
// Tailwind classes in index.html
bg-orange-500  // Primary color
bg-blue-600    // Secondary
// Change to your brand colors
```

### Confetti
```javascript
// Line ~1610, 1690, etc.
confetti({
  particleCount: 150,
  spread: 70,
  colors: ['#f97316', '#fb923c', '#1e3a8a']  // Customize
});
```

## 📊 Analytics (Optional)

Add Google Analytics:
```html
<!-- Add before </head> in index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🆘 Troubleshooting

**No pending players showing**
- Run SQL fix in SUPABASE_SETUP.md

**QR scanner not working**
- Enable camera permissions
- Use HTTPS (required for camera access)

**Images not loading**
- Check images/ folder exists
- Verify filenames match in GAMES array

**Supabase errors**
- Verify SUPABASE_URL and SUPABASE_ANON_KEY
- Check RLS policies in database

**Not auto-deploying**
- Check Netlify build logs
- Verify GitHub webhook is active

## 📞 Support

For issues:
1. Check browser console (F12)
2. Review Supabase logs
3. Check Netlify deploy logs
4. Verify QR codes are correct

## 📄 License

Created for Seva Mela 2025 - VCD Department, Isha Foundation

---

**Quick Links:**
- [Supabase Setup](./SUPABASE_SETUP.md)
- [Netlify Deployment](./NETLIFY_DEPLOY.md)
- [Database Schema](./database_schema.sql)
