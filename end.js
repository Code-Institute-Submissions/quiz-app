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

// Use only top 5 scores for list

highScore.sort((a,b) => b.score - a.score)

// Stop after 5th score
highScore.splice(5);


console.log(highScore);
};



