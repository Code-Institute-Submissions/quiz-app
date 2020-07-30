const username = document.getElementById('username');
const submitScoreClick = document.getElementById('submitScoreClick');
const endScore = document.getElementById('endScore');
const lastScore = localStorage.getItem('lastScore');

//et reference to high scores, pull what is in local storage and convert to JSON, if nothing there then reference empty array
const highScores = JSON.parse(localStorage.getItem("highScores")) || [] ;
console.log(highScores);

const maxScores = 5;

endScore.innerText = lastScore;

username.addEventListener("keyup", () => {
    submitScoreClick.disabled = !username.value;
    console.log(username.value);
}); 

saveScore = e => {
    console.log("clicked save");
    e.preventDefault();
  
    const score = {
        score: lastScore,
        name: username.value
    };

    highScores.push(score); //push through the score to HighScores array

    // sort scores in highest to lowest, by taking the b score and subtracting a score - if b score is higher than a, then put b before a
    highScores.sort( (a,b) => { 
        return b.score - a.score;
    })

    // cut after 5 scores 
    highScores.splice(5);

    console.log(highScores);
};