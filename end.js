/* End page */ 

const username = document.getElementById("username");
const submitScoreClick = document.getElementById("submitScoreClick");
const endScore = document.getElementById("endScore");

const highScoreLimit = 5;

// update score text 

const lastScore = localStorage.getItem("lastScore");
endScore.innerText = lastScore;

//convert local storage from string to object
const highScore = JSON.parse(localStorage.getItem("highScore")) || [];
console.log(highScore);

username.addEventListener("change", () => {
    console.log(username.value);
    submitScoreClick.disabled = !username.value;
});


saveScore = function(e) {
    console.log("Clicked save");
    e.preventDefault();

    const score = {
    score: lastScore,
    name: username.value
};
highScore.push(score);

// Use only top 5 scores for list. Add score to array, splice after 5 and then sort in order. 

highScore.sort((a,b) => b.score - a.score)

// Stop after 5th score
highScore.splice(5);

// Update local storage with high scores, need to convert to JSON so we can save as string in high scores
localStorage.setItem("highScore",JSON.stringify(highScore));

//Return home
window.location.assign("index.html");


console.log(highScore);
};



