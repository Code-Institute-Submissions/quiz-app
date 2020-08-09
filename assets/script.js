// Select qs and options

const question = document.querySelector('#question');
const options = Array.from(document.querySelectorAll('.choice-text'));

// Create game info display
const counterDisplay = document.getElementById('counter');
const userScoreDisplay = document.getElementById('userScore');


// Create variables
let currentQuestion = {};
let readyForAnswers = false;
let userScore = 0;
let counter = 0;
let remainingQuestions = []; // allows new question to be given to player each time

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple")
.then( result => {
    return result.json();
})
.then((apiQuestions) => {
        questions = apiQuestions.results.map((apiQuestion) => {
            const currentQuestion = {
                question: apiQuestion.question,
            };

            const answerOptions = [...apiQuestion.incorrect_answers];
            currentQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerOptions.splice(
                currentQuestion.answer - 1,
                0,
                apiQuestion.correct_answer
            );

            answerOptions.forEach((choice, index) => {
                currentQuestion['choice' + (index + 1)] = choice;
            });

    

            return currentQuestion;
        });

        console.log(questions);


        startQuiz();
    })
    .catch((err) => {
        console.error(err);
    });

// Hide and display HTML sections


$("#start-game-click").click(function() {
  console.log("click start");
  $('#game-page').show();
  $('#start-page').hide();
  $('#submit-page').hide();
  $('#high-score-page').hide();
});

$('#high-score-click').click(function() {
    console.log("High score show");
  $('#high-score-page').show();
  $('#start-page').hide();
  $('#submit-page').hide();
  $('#game-page').hide();
});

$('#submit-score-click').click(function() {
     console.log("submit score show");
  $('#high-score-page').show();
  $('#start-page').hide();
  $('#submit-page').hide();
  $('#game-page').hide();
});

$('#home-click').click(function() {
  $('#start-page').show();
  $('#high-score-page').hide();
  $('#submit-page').hide();
  $('#game-page').hide();
});



// Set constants for game
const addPoints = 15;// When you get a correct answer it adds points
const questionLimit = 3; // Limits no. of questions per game
let questions = [];


// Arrow functions to start game
const startQuiz = () => {
    counter = 0;
    userScore = 0;
    remainingQuestions = [...questions]; // Copy all qs from question array using spread operator
    nextQuestion();
};

const nextQuestion = () => {
    if (remainingQuestions.length === 0 || counter >= questionLimit) {
        localStorage.setItem("lastScore", userScore);
        //go to the end page
        //return window.location.assign('index.html');

    
        submitPage = () => {
        console.log("submit function");
         $('#submit-page').show();
         $('#high-score-page').hide();
         $('#start-page').hide();
         $('#game-page').hide();
        }

        
        submitPage();

    }
    counter++; // Increment by 1 when game is started
    counterDisplay.innerText = `${counter}/${questionLimit}`; // Increment with each question


    const questionNumber = Math.floor(Math.random() * remainingQuestions.length); // Find a random number among the no. of available questions
    currentQuestion = remainingQuestions[questionNumber]; 
    question.innerText = currentQuestion.question;

    options.forEach((option) => { // iterate through each choice
        const number = option.dataset['number']; // reference dataset number ??
        option.innerText = currentQuestion['choice' + number]; // ??
    });

    remainingQuestions.splice(questionNumber, 1); // Remove used question from array
    //readyForAnswers = true;
};

// Add functionality to for next question 

options.forEach(option => { // Add click event listener to each choice
    option.addEventListener('click', (e) => { // 
        //if (!readyForAnswers) return; // Ignore clicks if too early

        //readyForAnswers = false;
        const selectedOption = e.target;
        
        const selectedAnswer = selectedOption.dataset['number'];


       //check if the answers are correct
        let applyClass = "wrong";
            if (selectedAnswer == currentQuestion.answer) {
                applyClass = "right";
            }

        console.log(applyClass);

        if(applyClass === "right") {
            increaseScore(addPoints);
        }

         selectedOption.parentElement.classList.add(applyClass); // Select parent container and apply class

        
        setTimeout(() => {
            selectedOption.parentElement.classList.remove(applyClass); // Remove class
            nextQuestion();
        }, 1000);
  });
}); 

increaseScore = number => {
    userScore += number;
    userScoreDisplay.innerText = userScore;
}

//startQuiz();

/* High Score page */ 

// reference scores list
const scoresList = document.getElementById("scoresList");

//get high scores out of local storage

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

console.log(highScores);

// iterate through each high score and add list elements with username and score inside of it

scoresList.innerHTML = highScores
    .map( score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
})
.join("");

/* End High Score Page */

/* Final page */
const username = document.getElementById('username');
const submitScoreClick = document.getElementById('submit-score-click');
const endScore = document.getElementById('endScore');
const lastScore = localStorage.getItem('lastScore');

//et reference to high scores, pull what is in local storage and convert to JSON, if nothing there then reference empty array

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

    // update local storage with high scores

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("index.html");

    console.log(highScores);

    
};

/* End Final page */
