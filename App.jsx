const { useState, useEffect, useRef } = React;
const { Camera, Trophy, Star, Sparkles, Users, Award, CheckCircle, Circle, X, AlertCircle } = lucide;

// Animal names for random username generation
const ANIMAL_NAMES = [
  'Peacock', 'Elephant', 'Tiger', 'Lotus', 'Swan', 'Eagle', 'Dolphin', 'Deer',
  'Lion', 'Phoenix', 'Crane', 'Turtle', 'Butterfly', 'Hummingbird', 'Owl',
  'Falcon', 'Panda', 'Koala', 'Rabbit', 'Fox', 'Wolf', 'Bear', 'Raven', 'Dove',
  'Hawk', 'Sparrow', 'Parrot', 'Monkey', 'Zebra', 'Giraffe', 'Cheetah', 'Gazelle'
];

// Stall configuration - QR codes should contain these IDs
const STALLS = [
  { id: 'stall1', name: 'Harmony Haven', color: 'from-amber-400 to-orange-500', qrCode: 'STALL1_HARMONY_HAVEN' },
  { id: 'stall2', name: 'Wisdom Well', color: 'from-blue-400 to-indigo-500', qrCode: 'STALL2_WISDOM_WELL' },
  { id: 'stall3', name: 'Peace Pavilion', color: 'from-green-400 to-emerald-500', qrCode: 'STALL3_PEACE_PAVILION' },
  { id: 'stall4', name: 'Serenity Square', color: 'from-purple-400 to-pink-500', qrCode: 'STALL4_SERENITY_SQUARE' },
  { id: 'stall5', name: 'Bliss Bay', color: 'from-teal-400 to-cyan-500', qrCode: 'STALL5_BLISS_BAY' }
];

// Reward tiers
const REWARDS = [
  { threshold: 20, name: 'Seeker', icon: '🌱', message: 'Your journey begins' },
  { threshold: 40, name: 'Explorer', icon: '🌿', message: 'Keep discovering' },
  { threshold: 60, name: 'Wanderer', icon: '🌸', message: 'Halfway to enlightenment' },
  { threshold: 80, name: 'Sage', icon: '✨', message: 'Wisdom grows within you' },
  { threshold: 100, name: 'Master', icon: '🏆', message: 'Complete! Claim your gift!' }
];

const SpiritualGamesApp = () => {
  const [view, setView] = useState('home');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [visitedStalls, setVisitedStalls] = useState(
    JSON.parse(localStorage.getItem('visitedStalls') || '[]')
  );
  const [gamePoints, setGamePoints] = useState(
    JSON.parse(localStorage.getItem('gamePoints') || '{}')
  );
  const [players, setPlayers] = useState([]);
  const [selectedStall, setSelectedStall] = useState(null);
  const [adminPin, setAdminPin] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [scanAnimation, setScanAnimation] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [lastScannedCode, setLastScannedCode] = useState('');
  const [scanCooldown, setScanCooldown] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [scannedStallInfo, setScannedStallInfo] = useState(null);
  const qrScannerRef = useRef(null);
  const scannerInstanceRef = useRef(null);

  // Generate random username
  const generateUsername = () => {
    const randomAnimal = ANIMAL_NAMES[Math.floor(Math.random() * ANIMAL_NAMES.length)];
    const randomNum = Math.floor(100, 1000);
    return `${randomAnimal}${randomNum}`;
  };

  // Calculate visit score (20% per stall)
  const calculateVisitScore = (stalls) => {
    return stalls.length * 20;
  };

  // Calculate total game points
  const calculateGamePoints = (points) => {
    return Object.values(points).reduce((sum, point) => sum + point, 0);
  };

  // Combined score formula: 50% visit score + 50% game performance
  const calculateCombinedScore = (visitScore, gamePointsTotal) => {
    const maxGamePoints = 500; // Max 100 points per stall × 5 stalls
    const normalizedGameScore = Math.min((gamePointsTotal / maxGamePoints) * 100, 100);
    return Math.round((visitScore * 0.5) + (normalizedGameScore * 0.5));
  };

  // Get current player's combined score
  const getCurrentScore = () => {
    const visitScore = calculateVisitScore(visitedStalls);
    const gamePointsTotal = calculateGamePoints(gamePoints);
    return calculateCombinedScore(visitScore, gamePointsTotal);
  };

  // Get reward tier
  const getCurrentReward = () => {
    const visitScore = calculateVisitScore(visitedStalls);
    for (let i = REWARDS.length - 1; i >= 0; i--) {
      if (visitScore >= REWARDS[i].threshold) {
        return REWARDS[i];
      }
    }
    return null;
  };

  // Handle QR code scan result
  const handleQRScan = (decodedText, decodedResult) => {
    if (!decodedText || scanCooldown) return;

    const scannedData = decodedText;
    
    // Prevent duplicate scans
    if (scannedData === lastScannedCode) return;
    
    setLastScannedCode(scannedData);
    setScanCooldown(true);
    setTimeout(() => setScanCooldown(false), 3000);

    // Find matching stall
    const stall = STALLS.find(s => scannedData.includes(s.qrCode) || scannedData.includes(s.id));
    
    if (stall) {
      // Generate username if first scan
      if (!username) {
        const newUsername = generateUsername();
        setUsername(newUsername);
        localStorage.setItem('username', newUsername);
      }

      // Check if already visited
      if (!visitedStalls.includes(stall.id)) {
        const newVisited = [...visitedStalls, stall.id];
        setVisitedStalls(newVisited);
        localStorage.setItem('visitedStalls', JSON.stringify(newVisited));
        
        // Update players list
        updatePlayersList(newVisited);
        
        // Show success animation
        setScannedStallInfo(stall);
        setShowSuccessModal(true);
        setScanAnimation(true);
        setTimeout(() => setScanAnimation(false), 2000);
        
        // Close scanner after successful scan
        setTimeout(() => {
          stopScanner();
          setShowSuccessModal(false);
          setView('home');
        }, 3000);
      } else {
        alert(`You've already visited ${stall.name}!`);
      }
    } else {
      alert('Invalid QR code. Please scan a valid stall QR code.');
    }
  };

  // Handle QR scan error
  const handleQRError = (error) => {
    console.error('QR Scan Error:', error);
  };

  // Start QR Scanner
  const startScanner = async () => {
    if (scannerInstanceRef.current) return;

    try {
      const html5QrCode = new Html5Qrcode("qr-reader");
      scannerInstanceRef.current = html5QrCode;

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      };

      await html5QrCode.start(
        { facingMode: "environment" },
        config,
        handleQRScan,
        handleQRError
      );
      
      setShowScanner(true);
      setCameraError(null);
    } catch (err) {
      console.error('Camera start error:', err);
      if (err.name === 'NotAllowedError' || err.message?.includes('Permission')) {
        setCameraError('Camera permission denied. Please allow camera access in your browser settings and try again.');
      } else if (err.name === 'NotFoundError') {
        setCameraError('No camera found on this device. Please use a device with a camera.');
      } else {
        setCameraError('Error accessing camera. Please check your browser settings and try again.');
      }
    }
  };

  // Stop QR Scanner
  const stopScanner = async () => {
    if (scannerInstanceRef.current) {
      try {
        await scannerInstanceRef.current.stop();
        scannerInstanceRef.current.clear();
        scannerInstanceRef.current = null;
      } catch (err) {
        console.error('Error stopping scanner:', err);
      }
    }
    setShowScanner(false);
  };

  // Update players list in localStorage and sync
  const updatePlayersList = (visited = visitedStalls) => {
    const visitScore = calculateVisitScore(visited);
    const gamePointsTotal = calculateGamePoints(gamePoints);
    const currentScore = calculateCombinedScore(visitScore, gamePointsTotal);
    
    // Get all players from localStorage
    const allPlayers = JSON.parse(localStorage.getItem('allPlayers') || '[]');
    const playerIndex = allPlayers.findIndex(p => p.username === username);
    
    const playerData = {
      username,
      visitScore,
      gamePoints: gamePointsTotal,
      gamePointsDetail: gamePoints,
      visitedStalls: visited,
      combinedScore: currentScore,
      timestamp: Date.now()
    };

    if (playerIndex >= 0) {
      allPlayers[playerIndex] = playerData;
    } else {
      allPlayers.push(playerData);
    }

    localStorage.setItem('allPlayers', JSON.stringify(allPlayers));
    setPlayers(allPlayers);
  };

  // Admin: Add game points
  const addGamePoints = (playerUsername, stallId, points) => {
    const allPlayers = JSON.parse(localStorage.getItem('allPlayers') || '[]');
    const playerIndex = allPlayers.findIndex(p => p.username === playerUsername);
    
    if (playerIndex >= 0) {
      if (!allPlayers[playerIndex].gamePointsDetail) {
        allPlayers[playerIndex].gamePointsDetail = {};
      }
      allPlayers[playerIndex].gamePointsDetail[stallId] = points;
      
      // Recalculate scores
      const totalGamePoints = Object.values(allPlayers[playerIndex].gamePointsDetail).reduce((sum, p) => sum + p, 0);
      const visitScore = allPlayers[playerIndex].visitScore || 0;
      allPlayers[playerIndex].gamePoints = totalGamePoints;
      allPlayers[playerIndex].combinedScore = calculateCombinedScore(visitScore, totalGamePoints);
      
      localStorage.setItem('allPlayers', JSON.stringify(allPlayers));
      setPlayers(allPlayers);
      
      // Update current user's game points if it's their score
      if (playerUsername === username) {
        const updatedGamePoints = allPlayers[playerIndex].gamePointsDetail;
        setGamePoints(updatedGamePoints);
        localStorage.setItem('gamePoints', JSON.stringify(updatedGamePoints));
      }
      
      return true;
    }
    return false;
  };

  // Load players periodically
  useEffect(() => {
    const loadPlayers = () => {
      const allPlayers = JSON.parse(localStorage.getItem('allPlayers') || '[]');
      setPlayers(allPlayers);
    };
    
    loadPlayers();
    const interval = setInterval(loadPlayers, 5000); // Refresh every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Update players list when user's scores change
  useEffect(() => {
    if (username) {
      updatePlayersList();
    }
  }, [visitedStalls, gamePoints]);

  // Get sorted leaderboard
  const getLeaderboard = () => {
    return [...players].sort((a, b) => b.combinedScore - a.combinedScore);
  };

  // Open scanner
  const openScanner = () => {
    setCameraError(null);
    setView('scanner');
    // Start scanner in next tick to ensure DOM is ready
    setTimeout(() => {
      startScanner();
    }, 100);
  };

  // Check for URL parameters (for direct QR code links)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stallParam = params.get('stall');
    
    if (stallParam) {
      // Auto-open scanner when coming from QR code link
      setTimeout(() => {
        openScanner();
      }, 500);
    }

    // Cleanup scanner on unmount
    return () => {
      stopScanner();
    };
  }, []);

  // Stop scanner when leaving scanner view
  useEffect(() => {
    if (view !== 'scanner') {
      stopScanner();
    }
  }, [view]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Divine Games Festival</h1>
              <p className="text-amber-100 text-sm">Journey through the Five Realms</p>
            </div>
          </div>
          {username && (
            <div className="text-right">
              <div className="text-amber-100 text-sm">Playing as</div>
              <div className="font-bold text-lg">{username}</div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-amber-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto flex">
          <button
            onClick={() => setView('home')}
            className={`flex-1 py-4 flex items-center justify-center gap-2 transition-all ${
              view === 'home' ? 'bg-amber-100 text-amber-700 border-b-2 border-amber-600' : 'text-gray-600 hover:bg-amber-50'
            }`}
          >
            <Star className="w-5 h-5" />
            <span className="font-medium">Journey</span>
          </button>
          <button
            onClick={openScanner}
            className={`flex-1 py-4 flex items-center justify-center gap-2 transition-all ${
              view === 'scanner' ? 'bg-amber-100 text-amber-700 border-b-2 border-amber-600' : 'text-gray-600 hover:bg-amber-50'
            }`}
          >
            <Camera className="w-5 h-5" />
            <span className="font-medium">Scan</span>
          </button>
          <button
            onClick={() => setView('leaderboard')}
            className={`flex-1 py-4 flex items-center justify-center gap-2 transition-all ${
              view === 'leaderboard' ? 'bg-amber-100 text-amber-700 border-b-2 border-amber-600' : 'text-gray-600 hover:bg-amber-50'
            }`}
          >
            <Trophy className="w-5 h-5" />
            <span className="font-medium">Leaderboard</span>
          </button>
          <button
            onClick={() => setView('admin')}
            className={`flex-1 py-4 flex items-center justify-center gap-2 transition-all ${
              view === 'admin' ? 'bg-amber-100 text-amber-700 border-b-2 border-amber-600' : 'text-gray-600 hover:bg-amber-50'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="font-medium">Admin</span>
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && scannedStallInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-bounce">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Realm Discovered!</h2>
            <div className={`text-xl font-bold bg-gradient-to-r ${scannedStallInfo.color} bg-clip-text text-transparent mb-4`}>
              {scannedStallInfo.name}
            </div>
            <div className="text-3xl font-bold text-amber-600 mb-2">+20%</div>
            <p className="text-gray-600">Added to your spiritual journey</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6 pb-20">
        {/* Home View */}
        {view === 'home' && (
          <div className="space-y-6">
            {/* Welcome message for new users */}
            {!username && (
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-2">🙏 Welcome, Seeker!</h2>
                <p className="mb-4">Begin your spiritual journey by scanning your first stall QR code.</p>
                <button
                  onClick={openScanner}
                  className="bg-white text-amber-600 px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all"
                >
                  Start Your Journey
                </button>
              </div>
            )}

            {/* Score Card */}
            {username && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-amber-200">
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    {getCurrentScore()}%
                  </div>
                  <div className="text-gray-600 mt-2">Your Spiritual Score</div>
                </div>

                {getCurrentReward() && (
                  <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-4 text-center">
                    <div className="text-4xl mb-2">{getCurrentReward().icon}</div>
                    <div className="text-xl font-bold text-amber-800">{getCurrentReward().name}</div>
                    <div className="text-amber-700 text-sm mt-1">{getCurrentReward().message}</div>
                  </div>
                )}

                <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                  <div className="bg-amber-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-amber-700">{calculateVisitScore(visitedStalls)}%</div>
                    <div className="text-xs text-gray-600 mt-1">Visit Score</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-orange-700">{calculateGamePoints(gamePoints)}</div>
                    <div className="text-xs text-gray-600 mt-1">Game Points</div>
                  </div>
                </div>
              </div>
            )}

            {/* Stalls Progress */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-amber-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-600" />
                The Five Realms
              </h2>
              <div className="space-y-3">
                {STALLS.map((stall, index) => {
                  const isVisited = visitedStalls.includes(stall.id);
                  const stallGamePoints = gamePoints[stall.id] || 0;
                  return (
                    <div
                      key={stall.id}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        isVisited
                          ? 'bg-gradient-to-r ' + stall.color + ' text-white border-transparent'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {isVisited ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : (
                            <Circle className="w-6 h-6 text-gray-400" />
                          )}
                          <div>
                            <div className="font-bold">{stall.name}</div>
                            <div className={`text-sm ${isVisited ? 'text-white/80' : 'text-gray-500'}`}>
                              Realm {index + 1}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          {isVisited ? (
                            <>
                              <div className="text-2xl font-bold">+20%</div>
                              {stallGamePoints > 0 && (
                                <div className="text-sm opacity-90">+{stallGamePoints} pts</div>
                              )}
                            </>
                          ) : (
                            <div className="text-gray-400 text-sm">Not visited</div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {visitedStalls.length < 5 && (
                <button
                  onClick={openScanner}
                  className="w-full mt-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-xl font-bold hover:scale-105 transition-all"
                >
                  Scan Next Stall
                </button>
              )}
            </div>

            {/* Rewards Track */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-amber-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-600" />
                Rewards Path
              </h2>
              <div className="space-y-2">
                {REWARDS.map((reward) => {
                  const visitScore = calculateVisitScore(visitedStalls);
                  const isUnlocked = visitScore >= reward.threshold;
                  return (
                    <div
                      key={reward.threshold}
                      className={`p-3 rounded-lg flex items-center justify-between ${
                        isUnlocked ? 'bg-gradient-to-r from-amber-100 to-orange-100' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{reward.icon}</div>
                        <div>
                          <div className={`font-bold ${isUnlocked ? 'text-amber-800' : 'text-gray-600'}`}>
                            {reward.name}
                          </div>
                          <div className={`text-sm ${isUnlocked ? 'text-amber-700' : 'text-gray-500'}`}>
                            {reward.message}
                          </div>
                        </div>
                      </div>
                      <div className={`font-bold ${isUnlocked ? 'text-amber-700' : 'text-gray-400'}`}>
                        {reward.threshold}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Scanner View */}
        {view === 'scanner' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-amber-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Scan Stall QR Code</h2>
                {showScanner && (
                  <button
                    onClick={() => {
                      stopScanner();
                      setView('home');
                    }}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <X className="w-6 h-6" />
                  </button>
                )}
              </div>

              {cameraError ? (
                <div className="text-center p-8">
                  <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <p className="text-red-600 mb-4">{cameraError}</p>
                  <button
                    onClick={() => {
                      setCameraError(null);
                      startScanner();
                    }}
                    className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all"
                  >
                    Try Again
                  </button>
                </div>
              ) : !showScanner ? (
                <div className="text-center">
                  <div className="w-64 h-64 mx-auto bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center border-4 border-dashed border-amber-400 mb-6">
                    <Camera className="w-24 h-24 text-amber-600" />
                  </div>
                  <p className="text-gray-600 mb-6">
                    Position the QR code within the frame to scan
                  </p>
                  <button
                    onClick={startScanner}
                    className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all text-lg"
                  >
                    <Camera className="w-6 h-6 inline mr-2" />
                    Open Camera
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <div id="qr-reader" className="overflow-hidden rounded-xl"></div>
                  {scanCooldown && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg text-sm z-10">
                      ✨ Processing scan...
                    </div>
                  )}
                </div>
              )}

              <div className="mt-6 p-4 bg-amber-50 rounded-xl">
                <h3 className="font-bold text-amber-800 mb-2">📱 How to Scan:</h3>
                <ol className="text-sm text-amber-700 space-y-1">
                  <li>1. Allow camera permissions when prompted</li>
                  <li>2. Point your camera at the stall's QR code</li>
                  <li>3. Hold steady until the scan completes</li>
                  <li>4. Get your +20% reward instantly!</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard View */}
        {view === 'leaderboard' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-amber-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
                <Trophy className="w-8 h-8 text-amber-600" />
                Live Leaderboard
              </h2>

              {getLeaderboard().length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                  <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>No players yet. Start your journey!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {getLeaderboard().map((player, index) => (
                    <div
                      key={player.username}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        player.username === username
                          ? 'bg-gradient-to-r from-amber-100 to-orange-100 border-amber-400'
                          : index === 0
                          ? 'bg-gradient-to-r from-yellow-100 to-amber-100 border-yellow-400'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`text-2xl font-bold ${
                            index === 0 ? 'text-yellow-600' :
                            index === 1 ? 'text-gray-400' :
                            index === 2 ? 'text-amber-700' :
                            'text-gray-500'
                          }`}>
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                          </div>
                          <div>
                            <div className="font-bold text-gray-800 flex items-center gap-2">
                              {player.username}
                              {player.username === username && (
                                <span className="text-xs bg-amber-600 text-white px-2 py-1 rounded-full">You</span>
                              )}
                            </div>
                            <div className="text-sm text-gray-600">
                              Visit: {player.visitScore}% • Games: {player.gamePoints}pts
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                            {player.combinedScore}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 text-center text-sm text-gray-500">
                <p>🔄 Leaderboard updates every 5 seconds</p>
              </div>
            </div>
          </div>
        )}

        {/* Admin View */}
        {view === 'admin' && (
          <div className="space-y-6">
            {!isAdmin ? (
              <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-amber-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Admin Access</h2>
                <div className="max-w-sm mx-auto">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Admin PIN
                  </label>
                  <input
                    type="password"
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value)}
                    placeholder="Enter PIN"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-amber-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        if (adminPin === '1234') {
                          setIsAdmin(true);
                        } else {
                          alert('Incorrect PIN');
                        }
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      if (adminPin === '1234') {
                        setIsAdmin(true);
                      } else {
                        alert('Incorrect PIN');
                      }
                    }}
                    className="w-full mt-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-xl font-bold hover:scale-105 transition-all"
                  >
                    Access Admin Panel
                  </button>
                  <p className="text-xs text-gray-500 text-center mt-4">
                    Contact your event organizer for the PIN
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-amber-200">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
                  <button
                    onClick={() => {
                      setIsAdmin(false);
                      setAdminPin('');
                    }}
                    className="text-sm text-gray-600 hover:text-gray-800 px-4 py-2 bg-gray-100 rounded-lg"
                  >
                    Logout
                  </button>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Your Stall
                  </label>
                  <select
                    value={selectedStall || ''}
                    onChange={(e) => setSelectedStall(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-amber-500"
                  >
                    <option value="">Choose a stall...</option>
                    {STALLS.map((stall) => (
                      <option key={stall.id} value={stall.id}>
                        {stall.name}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedStall && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                      <Users className="w-5 h-5 text-amber-600" />
                      Players at {STALLS.find(s => s.id === selectedStall)?.name}
                    </h3>
                    
                    {players.filter(p => p.visitedStalls?.includes(selectedStall)).length === 0 ? (
                      <div className="text-center text-gray-500 py-8">
                        <p>No players have visited this stall yet.</p>
                      </div>
                    ) : (
                      players
                        .filter(p => p.visitedStalls?.includes(selectedStall))
                        .map((player) => (
                          <div
                            key={player.username}
                            className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200"
                          >
                            <div className="flex justify-between items-center mb-3">
                              <div>
                                <div className="font-bold text-gray-800">{player.username}</div>
                                <div className="text-sm text-gray-600">
                                  Current points: {player.gamePointsDetail?.[selectedStall] || 0} / 100
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="number"
                                id={`points-${player.username}`}
                                placeholder="Enter points (0-100)"
                                min="0"
                                max="100"
                                defaultValue={player.gamePointsDetail?.[selectedStall] || ''}
                                className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                              />
                              <button
                                onClick={() => {
                                  const input = document.getElementById(`points-${player.username}`);
                                  const points = parseInt(input.value) || 0;
                                  if (points >= 0 && points <= 100) {
                                    addGamePoints(player.username, selectedStall, points);
                                    alert(`✅ ${points} points awarded to ${player.username}`);
                                  } else {
                                    alert('Please enter points between 0 and 100');
                                  }
                                }}
                                className="px-6 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-bold hover:scale-105 transition-all"
                              >
                                Award
                              </button>
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                )}

                <div className="mt-6 p-4 bg-amber-50 rounded-xl">
                  <h4 className="font-bold text-amber-800 mb-2">📊 Admin Guidelines:</h4>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Award 0-100 points based on game performance</li>
                    <li>• Points can be updated multiple times</li>
                    <li>• Higher scores improve leaderboard ranking</li>
                    <li>• Be fair and consistent in scoring</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 pb-6 text-center text-gray-500 text-sm">
        <p>May your journey be blessed with wisdom and joy</p>
        <p className="text-xs mt-2">🕉️ Divine Games Festival 2025 🕉️</p>
      </div>
    </div>
  );
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SpiritualGamesApp />);