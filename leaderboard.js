import { getDatabase, ref, set, onValue, get } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";
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
window.selectChoice = selectChoice;
  // Initialize Firebase database, and get some data from it
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
var db = getDatabase(app);
var rankings = []
/*rankings = [
  {name: 'Minecraft', votes: 1},
  {name: 'Terraria', votes: 1},
  {name: 'Call of Duty', votes: 1},
  {name: 'Super Mario 64', votes: 1},
  {name: 'Geometry Dash', votes: 1},
  {name: 'War thunder', votes: 1},
  {name: 'Valorant', votes: 1},
  {name: 'Grand Theft Auto V', votes: 1},
  {name: 'Roblox', votes: 1},
  {name: 'FC25', votes: 1},
]
  */
var randomGames = [];
function selectChoice(button) {
  

    button.parentElement.querySelectorAll('.vote-choice').forEach(b => b.classList.remove('selected'));
  
    button.classList.add('selected');
}



  get(ref(db, `totalVotes`)).then((snapshot) => {
  if (snapshot.exists()) {
    //console.log(snapshot.val());
    rankings = snapshot.val()
    createLeaderboard();
    updateScreen();
    console.log(randomGames)
    
      
  } 
}).catch((error) => {
  console.error(error);
});

function updateScreen(){
  // Update the voting choice buttons every time after data is retrieved - Generate random list 
  for(let j = 0; j < 2;j++){
      var val = Math.floor(Math.random()*(Object.values(rankings).length))
      val = rankings[val].name
      randomGames.push(val)
  
    }

  



  // Physically update the vote options
  document.getElementById("choice-1").innerHTML = randomGames[0]
  document.getElementById("choice-2").innerHTML = randomGames[1]
}











function addVote(name){
  for (let i = 0; i < rankings.length; i++) {
  if (rankings[i].name === name) {
    rankings[i].votes ++;
    set(ref(db, 'totalVotes'), rankings);
    break;
  }
}
  createLeaderboard();
}
function createLeaderboard(){
  rankings.sort((a, b) => b.votes - a.votes);
  var leaderboard = document.getElementById('leaderboard')
  leaderboard.innerHTML = ""
  for (let i in rankings) {
    let li = document.createElement("li");
    li.innerHTML = `
    <span>${rankings[i].name}</span> 
    <span>${rankings[i].votes}</span> 
    
  `;
    let btn = document.createElement("input");
    btn.type = "image";
    btn.src = "arrow_up.png";
    btn.classList.add("vote-btn");
    btn.addEventListener("click", () => addVote(rankings[i].name));
    li.appendChild(btn);

    leaderboard.appendChild(li);
}

}








console.clear();


var modal = document.getElementById("modal");

// Get the button that opens the modal
var btn = document.getElementById("voteBtn");

// Get the <span> element that closes the modal
var submitBtn = document.getElementById('submitVote')


btn.onclick = function() {
  modal.style.display = "block";
}

submitBtn.onclick = function() {
  modal.style.display = "none";
  // Code for adding the votes here
  var finalVotes = [];
  document.querySelectorAll('.vote-pair').forEach(pair => {
    let selected = pair.querySelector('.vote-choice.selected');
    if (selected) {
      finalVotes.push(selected.textContent); 
}
    else {
      finalVotes.push(null); 
}
  });
}


window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
   