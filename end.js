const username = document.getElementById('username');
const submitScoreClick = document.getElementById('submitScoreClick');
const endScore = document.getElementById('endScore');
const lastScore = localStorage.getItem('lastScore');

//et reference to high scores, pull what is in local storage and convert to JSON, if nothing there then reference empty array
const highScores = JSON.parse(localStorage.getItem("highScores")) || [] ;
console.log(highScores);


endScore.innerText = lastScore;

username.addEventListener("keyup", () => {
    submitScoreClick.disabled = !username.value;
    console.log(username.value);
}); 

saveScore = e => {
    console.log("clicked save");
    e.preventDefault();
  
     
};