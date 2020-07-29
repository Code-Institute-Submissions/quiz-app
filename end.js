const username = document.getElementById('username');
const submitScoreClick = document.getElementById('submitScoreClick');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

//const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

//const MAX_HIGH_SCORES = 5;

//finalScore.innerText = mostRecentScore;

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