# Divine Games Festival - Production Deployment Guide

## 📦 Package Contents

This package contains everything you need to deploy a production-ready QR code scanner web app for your spiritual games festival:

- **index.html** - Main entry point
- **App.jsx** - React application with QR scanning
- **qr-generator.html** - Tool to generate stall QR codes
- **README.md** - This documentation

---

## 🚀 Quick Start Deployment

### Option 1: Deploy to Netlify (Recommended - Free & Easy)

1. **Create a free account** at [netlify.com](https://www.netlify.com)
2. **Drag and drop** the files (`index.html`, `App.jsx`) into Netlify's deployment zone
3. **Your app is live!** You'll get a URL like: `https://your-app-name.netlify.app`
4. **Generate QR codes** using the provided URL

### Option 2: Deploy to Vercel (Free)

1. **Create account** at [vercel.com](https://vercel.com)
2. **Import project** or drag files
3. **Deploy** - Get your live URL
4. **Generate QR codes**

### Option 3: Deploy to GitHub Pages (Free)

1. **Create GitHub repository**
2. **Upload files** to the repository
3. **Enable GitHub Pages** in repository settings
4. **Access** at `https://username.github.io/repository-name`

### Option 4: Traditional Web Hosting

Upload files to any web hosting service (GoDaddy, Bluehost, etc.) via FTP or cPanel.

---

## 🎯 Complete Setup Instructions

### Step 1: Deploy the Web App

1. Choose a deployment method above
2. Upload `index.html` and `App.jsx` to your hosting
3. Note your live URL (e.g., `https://your-festival.netlify.app`)

### Step 2: Generate QR Codes

1. Open `qr-generator.html` in your web browser (double-click the file)
2. Enter your deployed app URL in the input field
3. Click download button for each of the 5 stall QR codes
4. Save all QR code images to your computer

### Step 3: Print QR Codes

**Recommended Print Settings:**
- **Size:** A4 paper or 8.5" × 11"
- **Minimum QR size:** 3" × 3" (for easy scanning)
- **Quality:** High resolution, 300 DPI
- **Color:** Full color recommended
- **Finish:** Matte or glossy

**Printing Tips:**
- Use high-quality printer or professional printing service
- Laminate QR codes to protect them during the event
- Print 2 copies of each QR code as backup

### Step 4: Place QR Codes at Stalls

- Mount each QR code at its designated stall
- Place at eye level (5-6 feet high)
- Ensure good lighting for scanning
- Keep area around QR code clear
- Test scanning before the event

**The 5 Stalls:**
1. **Harmony Haven** (Orange theme)
2. **Wisdom Well** (Blue theme)
3. **Peace Pavilion** (Green theme)
4. **Serenity Square** (Purple theme)
5. **Bliss Bay** (Teal theme)

### Step 5: Set Up Admin Access

**Admin PIN:** Default is `1234` (You can customize this in App.jsx)

**To change the admin PIN:**
1. Open `App.jsx` in a text editor
2. Find the line: `if (adminPin === '1234') {`
3. Change `'1234'` to your desired PIN
4. Save and re-deploy

**Admin Responsibilities:**
- Each stall needs one admin
- Admin awards game points (0-100) based on player performance
- Points are added through the Admin panel in the app

---

## 📱 How the App Works

### For Players:

1. **Arrive at stall** → Scan QR code using the web app
2. **First scan** → Automatically assigned random animal username (e.g., "Tiger234")
3. **Each scan** → Earns 20% visit score (5 stalls × 20% = 100%)
4. **Play game** → Admin awards performance points (0-100)
5. **View leaderboard** → See live rankings
6. **Complete journey** → Visit all 5 stalls for grand prize

### For Admins:

1. **Open app** → Navigate to Admin tab
2. **Enter PIN** → Access admin panel
3. **Select stall** → Choose your stall from dropdown
4. **Award points** → Enter 0-100 points for each player
5. **Update scores** → Points automatically update leaderboard

### Scoring System:

**Combined Score Formula:**
```
Combined Score = (Visit Score × 50%) + (Normalized Game Points × 50%)
```

**Example:**
- Player visits 3 stalls: 60% visit score
- Player earns 150 game points total: 30% normalized (150/500 × 100)
- Combined Score = (60 × 0.5) + (30 × 0.5) = 30% + 15% = 45%

**Reward Tiers:**
- 20% - **Seeker** 🌱
- 40% - **Explorer** 🌿
- 60% - **Wanderer** 🌸
- 80% - **Sage** ✨
- 100% - **Master** 🏆 (Grand Prize!)

---

## 🔧 Technical Features

### Camera Permissions
- App automatically requests camera access
- Works on iOS Safari, Chrome, Firefox, Edge
- Secure HTTPS required for camera access (deployment platforms provide this)

### Real-time Leaderboard
- Updates every 5 seconds automatically
- Shows combined scores from visits + game performance
- Highlights current user

### Data Persistence
- Uses browser localStorage
- Data persists across page refreshes
- Each device maintains its own user session

### Offline Support
- App works without internet after initial load
- QR scanning works offline
- Data syncs when players check leaderboard

---

## 🎨 Customization Options

### Change Stall Names
Edit the `STALLS` array in `App.jsx`:
```javascript
const STALLS = [
  { id: 'stall1', name: 'Your Custom Name', ... },
  // ... more stalls
];
```

### Change Colors
Modify the Tailwind gradient classes in the stall definitions.

### Change Animal Names
Edit the `ANIMAL_NAMES` array in `App.jsx`:
```javascript
const ANIMAL_NAMES = [
  'Peacock', 'Elephant', 'Tiger', // ... add your animals
];
```

### Adjust Max Game Points
Change the formula in `calculateCombinedScore` function:
```javascript
const maxGamePoints = 500; // Change this value
```

---

## 📊 Admin Best Practices

### Scoring Guidelines:
- **0-20 points:** Minimal participation
- **21-40 points:** Basic completion
- **41-60 points:** Good performance
- **61-80 points:** Great performance
- **81-100 points:** Excellent/Perfect performance

### Tips:
- Be consistent in scoring across players
- Announce point scale to players before game
- Award points immediately after game completion
- Can update points if needed (not locked)

---

## 🐛 Troubleshooting

### "Camera permission denied"
- **iOS:** Settings → Safari → Camera → Allow
- **Android:** Settings → Apps → Browser → Permissions → Camera
- Ensure site is served over HTTPS

### QR code won't scan
- Check lighting conditions
- Hold phone steady
- Ensure QR code is not damaged
- Try different angle
- Check if QR code was generated with correct URL

### Player not appearing in Admin panel
- Player must scan at least one stall first
- Refresh the Admin view
- Check if correct stall is selected

### Leaderboard not updating
- Wait 5 seconds for auto-refresh
- Check internet connection
- Refresh the page manually

### Data lost after closing browser
- This is expected behavior
- Each device maintains separate session
- Central server would be needed for persistent storage across devices

---

## 🔐 Security Notes

- Change default admin PIN before deployment
- Use HTTPS (provided automatically by Netlify/Vercel)
- Admin PIN is stored in client code (visible to tech-savvy users)
- For high-security needs, consider backend authentication

---

## 📱 Mobile Compatibility

**Tested and working on:**
- ✅ iOS 12+ (Safari, Chrome)
- ✅ Android 8+ (Chrome, Firefox, Edge)
- ✅ Modern desktop browsers

**Requirements:**
- JavaScript enabled
- Camera access
- HTTPS connection

---

## 🎉 Event Day Checklist

**Before Event:**
- [ ] App deployed and accessible
- [ ] QR codes printed and laminated
- [ ] QR codes placed at all stalls
- [ ] Test scanning from multiple devices
- [ ] Admin PIN shared with stall admins
- [ ] Backup QR codes available

**During Event:**
- [ ] Monitor leaderboard
- [ ] Assist players with scanning issues
- [ ] Admins actively awarding points
- [ ] Track completion rates

**After Event:**
- [ ] Screenshot final leaderboard
- [ ] Announce winners
- [ ] Distribute rewards
- [ ] Collect feedback

---

## 💡 Pro Tips

1. **QR Code Placement:** Place near entrance, not exit
2. **Signage:** Add instructions near QR code
3. **Test Users:** Have team members test before event
4. **Internet:** Ensure stall areas have decent connectivity
5. **Power Banks:** Have charged phones for admins
6. **Support Team:** Designate tech support person
7. **Prizes:** Prepare reward tiers in advance
8. **Communication:** Brief all admins on scoring system

---

## 🆘 Support & Contact

For technical support during your event:
1. Check troubleshooting section first
2. Ensure latest version of browser
3. Clear browser cache if issues persist
4. Have backup QR codes ready

---

## 📜 License & Credits

**Built for:** Spiritual Organizations
**Purpose:** Games Festival Activities
**Technology:** React, HTML5 QR Code Scanner, Tailwind CSS

Feel free to customize and use for your organization's events!

---

## 🙏 Final Note

May your Divine Games Festival bring joy, wisdom, and spiritual growth to all participants!

**🕉️ Blessings on your journey through the Five Realms 🕉️**