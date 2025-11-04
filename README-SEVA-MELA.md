# 🕉️ Seva Mela - VCD Department

## Complete Guide for Your Event

---

## 📦 What You Have

This package contains everything for your Seva Mela event:

1. **index-standalone.html** - Main app (complete, single-file)
2. **qr-generator.html** - Tool to generate QR codes for 4 games
3. **README.md** - This comprehensive guide

---

## 🎯 App Features

### **For Participants:**
- ✅ Name registration with category selection
- ✅ Automatic duplicate name handling (e.g., Abhishek 1, Abhishek 2)
- ✅ 4 game/activity stations to visit
- ✅ Stage progression (Seeker → Explorer → Wanderer → Yogi)
- ✅ Stage points (awarded when QR code is scanned)
- ✅ Game points (awarded by admins based on performance)
- ✅ Real-time progress tracking
- ✅ Live leaderboard with rankings
- ✅ Confetti celebration when game is completed
- ✅ Beautiful splash screen

### **For Admins:**
- ✅ PIN-protected admin access (PIN: 1234)
- ✅ View pending players for each game
- ✅ Award game points (0-100) to participants
- ✅ Real-time score updates
- ✅ Completion tracking
- ✅ Refresh data functionality
- ✅ Mark event completion

---

## 🎮 The 4 Games/Activities

1. **🎡 Wheel of Fortune**
2. **🎴 Memory Card Quiz**
3. **✈️ Paper Plane**
4. **🌳 Volunteer Tree Experience**

Each game has 4 stages:
- **Seeker** (Stage 1)
- **Explorer** (Stage 2)
- **Wanderer** (Stage 3)
- **Yogi** (Stage 4)

---

## 👥 Participant Categories

1. Long Term Volunteer (LTV)
2. Short Term Volunteer (STV)
3. Brahmachari
4. Sanyasi
5. Sadhanapada
6. Ashram Resident
7. Visitor Guest
8. Sevadhar
9. Staff
10. **Admin** (requires PIN)

---

## 📊 Scoring System

### **Stage Points (Automatic)**
- Earned when participant scans QR code at a game station
- **25 points per stage** (4 stages × 25 = 100 points max per game)
- Automatically awarded upon QR scan
- Cannot be modified

### **Game Points (Manual)**
- Awarded by admin based on participant's performance
- **0-100 points** range
- Admin decides score after watching performance
- Can be updated if needed

### **Total Score Calculation**
```
Total % = (Stage Points / Max Stage Points) × 50% + (Game Points / Max Game Points) × 50%

Example:
- Participant scans 2 games: 50 stage points (2 × 25)
- Admin awards 80 + 60 game points: 140 game points
- Stage percentage: (50 / 100) × 50% = 25%
- Game percentage: (140 / 400) × 50% = 17.5%
- Total: 25% + 17.5% = 42.5%
```

---

## 🚀 Deployment Instructions

### **Step 1: Deploy Your App (Choose ONE)**

#### **Option A: Netlify (EASIEST - Recommended)**
1. Go to [netlify.com](https://www.netlify.com)
2. Sign up (free)
3. Click "Add new site" → "Deploy manually"
4. Drag and drop `index-standalone.html`
5. Wait 30 seconds
6. Copy your URL: `https://your-name.netlify.app`

#### **Option B: Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Sign up (free)
3. Click "Add New Project"
4. Upload `index-standalone.html`
5. Deploy
6. Copy your URL

#### **Option C: GitHub Pages**
1. Create account at [github.com](https://github.com)
2. Create new repository: `seva-mela`
3. Upload `index-standalone.html`
4. Settings → Pages → Enable
5. URL: `https://username.github.io/seva-mela`

---

### **Step 2: Generate QR Codes**

1. **Double-click** `qr-generator.html`
2. **Enter your deployed URL** in the text box
3. **Download all 4 QR codes**:
   - Wheel of Fortune QR
   - Memory Card Quiz QR
   - Paper Plane QR
   - Volunteer Tree Experience QR
4. **Save** all images

---

### **Step 3: Print QR Codes**

**Print Settings:**
- Size: A4 or Letter (8.5" × 11")
- Quality: Best/High resolution
- Color: Full color
- QR code size: Minimum 3" × 3"

**Tips:**
- Print 2 copies of each (8 total - backup set)
- Laminate for durability
- Use matte or glossy finish

---

### **Step 4: Set Up Event Stations**

**For Each Game Station:**
1. Place QR code poster at entrance/near activity
2. Mount at eye level (5-6 feet high)
3. Ensure good lighting
4. Keep area clear around QR code
5. Test scanning before event starts

**Station Setup:**
```
🎡 Station 1: Wheel of Fortune
   ├─ QR Code posted
   ├─ Admin present
   └─ Activity materials ready

🎴 Station 2: Memory Card Quiz
   ├─ QR Code posted
   ├─ Admin present
   └─ Activity materials ready

✈️ Station 3: Paper Plane
   ├─ QR Code posted
   ├─ Admin present
   └─ Activity materials ready

🌳 Station 4: Volunteer Tree Experience
   ├─ QR Code posted
   ├─ Admin present
   └─ Activity materials ready
```

---

## 📱 How It Works

### **For Participants:**

1. **Open the app** on your phone/device
2. **See splash screen** (3 seconds)
3. **Onboarding:**
   - Enter your name
   - Select your category
   - Click "Start Your Journey"
4. **Main screen shows:**
   - Top: Progress bar with percentage
   - Middle: 4 game tiles with scores
   - Bottom right: QR scanner button (floating)
   - Top right: Leaderboard button
5. **At each game station:**
   - Click QR scanner button (camera icon)
   - Scan the QR code
   - Get +25 stage points automatically
   - Stage level increases (Seeker → Explorer → Wanderer → Yogi)
   - Complete the game/activity
   - Admin awards game points (0-100)
   - See confetti celebration! 🎉
6. **Check progress:**
   - Progress bar updates automatically
   - Click leaderboard to see rankings
7. **Complete all 4 games** to reach 100%!

---

### **For Admins:**

1. **Open the app** on your device
2. **Onboarding:**
   - Enter your name
   - Select "Admin" category
   - Enter PIN: `1234`
   - Click "Start Your Journey"
3. **Admin main screen shows:**
   - Top: "Admin Mode" indicator
   - Middle: 4 game tiles with pending player counts
   - Bottom: Refresh and Complete buttons
4. **Award points:**
   - Click on a game tile
   - See list of pending players (scanned but not scored)
   - Enter points (0-100) for each player
   - Click "Submit"
   - Confirm the score
   - Player removed from pending list
   - Participant sees confetti! 🎉
5. **Refresh data** anytime with Refresh button
6. **Mark completion** at event end

---

## 🎨 User Interface

### **Header (Top)**
```
┌─────────────────────────────────────┐
│ 🕉️ Seva Mela - VCD Dept        🏆 │ ← Leaderboard
├─────────────────────────────────────┤
│ [████████░░░░░░] 40%                │ ← Progress bar
└─────────────────────────────────────┘
```

### **Game Tiles (Middle)**
```
┌─────────────────────────────────────┐
│ [🎡]  Wheel of Fortune              │
│       Stage: Explorer                │
│       Game: 80 pts  Stage: 50 pts   │
└─────────────────────────────────────┘
```

### **QR Scanner (Bottom Right)**
```
                              [📷] ← Floating button
```

---

## 🏆 Leaderboard

Shows:
- **Top 3** with medals: 🥇 🥈 🥉
- **Rest** with achievement badge: 🎖️
- **Name and Category**: e.g., "Abhishek 1 (LTV)"
- **Total Score**: Percentage
- **Current user** highlighted in green

---

## 🔧 Admin Features

### **Pending Players List**
Shows participants who have:
- ✅ Scanned the QR code (earned stage points)
- ❌ Not yet received game points

### **Awarding Points**
1. Click game tile
2. View pending players
3. Enter score (0-100)
4. Click Submit
5. Confirm
6. Done! ✅

### **Scoring Guidelines**
- **0-20**: Minimal participation
- **21-40**: Basic completion
- **41-60**: Good performance
- **61-80**: Great performance
- **81-100**: Excellent/Perfect

---

## 💡 Tips for Success

### **Before Event:**
- [ ] Deploy app and test on mobile
- [ ] Generate and print all 4 QR codes
- [ ] Laminate QR codes
- [ ] Set up all 4 game stations
- [ ] Test QR scanning at each station
- [ ] Brief all admins on scoring
- [ ] Charge all admin devices
- [ ] Have backup QR codes

### **During Event:**
- [ ] Ensure good lighting at stations
- [ ] Monitor leaderboard regularly
- [ ] Assist participants with scanning
- [ ] Admins award points promptly
- [ ] Refresh data periodically
- [ ] Keep backup devices charged

### **After Event:**
- [ ] Screenshot final leaderboard
- [ ] Announce top 3 winners
- [ ] Distribute rewards
- [ ] Collect feedback
- [ ] Save data for records

---

## 🆘 Troubleshooting

### **Problem: Camera won't open**
**Solution:**
- Check camera permissions in browser settings
- Works only on HTTPS (after deployment)
- Won't work on local file:// protocol

### **Problem: QR code won't scan**
**Solution:**
- Ensure good lighting
- Hold phone steady
- Check QR code is not damaged
- Try different angle
- Make sure camera is focused

### **Problem: Duplicate names**
**Solution:**
- App automatically appends numbers (Abhishek 1, Abhishek 2)
- No action needed

### **Problem: Admin can't award points**
**Solution:**
- Verify correct PIN entered
- Check participant scanned QR first
- Refresh the page
- Check internet connection

### **Problem: Progress bar not updating**
**Solution:**
- Click Refresh button
- Check if scores were saved
- Reload the page

### **Problem: Leaderboard not showing**
**Solution:**
- Wait 2-3 seconds for loading
- Click Refresh button
- Check if participants have scores

---

## 🔐 Security

- Admin PIN: `1234` (default)
- To change PIN, edit line in HTML: `const ADMIN_PIN = '1234';`
- All data stored locally (browser localStorage)
- No server required
- Works offline after initial load

---

## 📊 Data Management

### **Storage:**
- Browser localStorage
- Per-device storage
- Survives page refreshes
- Lost if browser cache cleared

### **Refresh:**
- Click "Refresh" button to reload data
- Syncs from localStorage
- Updates all scores

### **Complete:**
- Admin-only button
- Marks event as finished
- Saves all final data

---

## 🎉 Event Day Checklist

### **Morning Setup:**
- [ ] All QR codes posted
- [ ] Stations prepared
- [ ] Admins briefed
- [ ] Devices charged
- [ ] Internet working
- [ ] App URL bookmarked

### **During Event:**
- [ ] Welcome participants
- [ ] Guide to first station
- [ ] Monitor progress
- [ ] Award points promptly
- [ ] Update leaderboard
- [ ] Assist with issues

### **Event End:**
- [ ] Final leaderboard screenshot
- [ ] Announce winners
- [ ] Distribute rewards
- [ ] Thank participants
- [ ] Collect feedback

---

## 🏅 Reward Ideas

Based on completion percentage:

- **20-40%** - Participation certificate
- **41-60%** - Bronze medal
- **61-80%** - Silver medal
- **81-100%** - Gold medal + special prize
- **Top 3** - Extra rewards/recognition

---

## 📞 Support

### **Technical Issues:**
1. Check this README first
2. Try refreshing the page
3. Check internet connection
4. Clear browser cache
5. Try different browser

### **During Event:**
- Have backup devices ready
- Keep printed QR codes safe
- Monitor admin panels
- Stay connected

---

## ✨ Features Summary

**Participant Features:**
- ✅ Easy onboarding
- ✅ QR code scanning
- ✅ Real-time progress
- ✅ Live leaderboard
- ✅ Stage progression
- ✅ Confetti celebrations
- ✅ Mobile-friendly

**Admin Features:**
- ✅ PIN-protected access
- ✅ Pending player lists
- ✅ Point awarding (0-100)
- ✅ Real-time updates
- ✅ Refresh data
- ✅ Completion marking

**Technical Features:**
- ✅ Single-file deployment
- ✅ No backend required
- ✅ Works offline
- ✅ Local storage
- ✅ Responsive design
- ✅ Cross-browser compatible

---

## 🙏 Final Notes

Your Seva Mela app is ready! It's been designed with:
- **Simplicity** - Easy for everyone to use
- **Reliability** - Works without internet after loading
- **Flexibility** - Handles duplicate names automatically
- **Security** - Admin PIN protection
- **Fun** - Confetti and celebrations!

**May your Seva Mela event be a grand success! 🕉️**

---

## 📄 Files Included

1. **index-standalone.html** - Main app (deploy this)
2. **qr-generator.html** - Generate QR codes
3. **README.md** - This guide

**Total setup time: 10 minutes**  
**Total cost: FREE**

---

**Ready to deploy? Start with Step 1 above! 🚀**