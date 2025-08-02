import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";
 // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";


        

        // Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyBCZUDkl_7eUs7BZ-OylpvGnKWJI4tf3Vc",
authDomain: "vg-leaderboard-live.firebaseapp.com",
projectId: "vg-leaderboard-live",
databaseURL: 'https://vg-leaderboard-live-default-rtdb.firebaseio.com/',
storageBucket: "vg-leaderboard-live.firebasestorage.app",
messagingSenderId: "348422945848",
appId: "1:348422945848:web:2848fb04b3811e4f723acd",
measurementId: "G-SB25Z7DSPJ"
  };

  // Initialize Firebase database, and get some data from it
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
var db = getDatabase(app);
console.log("hi");
var votes = [
  { name: "Minecraft", votes: 2 },
  { name: "Terraria", votes: 3 },
  { name: "COD", votes: 7 }
];

players.sort((a, b) => b.votes - a.votes);


createLeaderboard();
console.clear();
console.log(votes);
set(ref(db, 'totalVotes'), votes);
   