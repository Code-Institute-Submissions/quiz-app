const username = document.getElementById('username');
const submitScoreClick = document.getElementById('submitScoreClick');
const endScore = document.getElementById('endScore');
const lastScore = localStorage.getItem('lastScore');

//convert to JSON
localStorage.setItem("highScores", JSON.stringify([]));

endScore.innerText = lastScore;

//const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

//const MAX_HIGH_SCORES = 5;

username.addEventListener("keyup", () => {
    submitScoreClick.disabled = !username.value;
    console.log(username.value);
}); 

saveScore = e => {
    console.log("clicked save");
    //e.preventDefault();

    /*const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/'); */
};