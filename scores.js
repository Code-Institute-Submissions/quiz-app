/* High Score page */ 

// reference scores list
const scoresList = document.getElementById("scoresList");

//get high scores out of local storage
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

console.log(highScores);

// iterate through each high score and add list elements with username and score inside of it

scoresList.innerHTML = highScores
    .map( score =>{
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
})
.join("");

