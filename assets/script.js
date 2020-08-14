
/* Create constants */
const question = document.querySelector('#question');
const options = Array.from(document.querySelectorAll('.choice-text'));
const counterDisplay = document.getElementById('counter');
const userScoreDisplay = document.getElementById('userScore');
const addPoints = 15;
const questionLimit = 3;
const username = document.getElementById('username');
const submitScoreClick = document.getElementById('submit-score-click');
const highScoreRef = document.getElementById('highScoreID');
const lastScore = localStorage.getItem('lastScore');
const highScoreStorage = localStorage.getItem('highScoreStorage');


/* Create variables */

let currentQuestion = {};
let readyForAnswers = false;
let userScore = 0;
let counter = 0;
let remainingQuestions = [];
let questions = [];

/* Fetch questions from API */

fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple')
  .then((result) => {

    return result.json();


  })

  .then((apiQuestions) => {
    questions = apiQuestions.results.map((apiQuestion) => {
      const currentQuestion = {
        question: apiQuestion.question,
      };

      const answerOptions = [...apiQuestion.incorrect_answers];
      currentQuestion.answer = Math.floor(Math.random() * 4) + 1;
      answerOptions.splice(currentQuestion.answer - 1, 0, apiQuestion.correct_answer);

      answerOptions.forEach((choice, index) => {
        currentQuestion['choice' + (index + 1)] = choice;
      });
      return currentQuestion;
    });

    startQuiz();

  })

  .catch((err) => {
    console.error(err);

  });


/* Hide and display HTML sections */

$("#start-game-click").click(function() {
  $('#game-page').show();
  $('#start-page').hide();
  $('#score-page').hide();
  $('#high-score-page').hide();
});

$('#high-score-click').click(function() {
  $('#high-score-page').show();
  $('#start-page').hide();
  $('#score-page').hide();
  $('#game-page').hide();
});

$('#submit-score-click').click(function() {
  $('#high-score-page').show();
  $('#start-page').hide();
  $('#score-page').hide();
  $('#game-page').hide();
});

$('.home-click').click(function() {
  location.reload();
  $('#start-page').show();
  $('#high-score-page').hide();
  $('#score-page').hide();
  $('#game-page').hide();
});


/* Start game */ 

const startQuiz = () => {
    counter = 0;
    userScore = 0;
    remainingQuestions = [...questions]; // Copy all qs from question array using spread operator
    nextQuestion();
};

/* Pull in remaining questions */

const nextQuestion = () => {

  if (remainingQuestions.length === 0 || counter >= questionLimit) {
    localStorage.setItem('lastScore', userScore);
    updateScore();
    updateHighScore();
    submitPage();
  }

  counter++;
  counterDisplay.innerText = `${counter}/${questionLimit}`;
  const questionNumber = Math.floor(Math.random() * remainingQuestions.length);
  currentQuestion = remainingQuestions[questionNumber];
  question.innerText = currentQuestion.question;

  options.forEach((option) => {
    const number = option.dataset['number'];
    option.innerText = currentQuestion['choice' + number];
  });

  remainingQuestions.splice(questionNumber, 1);
};

const updateScore = () => {
  document.getElementById('lastScore').innerHTML = userScore;
};

const submitPage = () => {
  $('#score-page').show();
  $('#high-score-page').hide();
  $('#start-page').hide();
  $('#game-page').hide();
};

/* Check if answers are correct */ 

options.forEach((option) => {

  option.addEventListener('click', (e) => {
    const selectedOption = e.target;
    const selectedAnswer = selectedOption.dataset['number'];

    let applyClass = 'wrong';

    if (selectedAnswer == currentQuestion.answer) {
      applyClass = 'right';
    }

    if (applyClass === 'right') {
      increaseScore(addPoints);
    }

    selectedOption.parentElement.classList.add(applyClass);

    setTimeout(() => {
      selectedOption.parentElement.classList.remove(applyClass);
      nextQuestion();
    }, 1000);
  });
});

const increaseScore = (number) => {
  userScore += number;
  userScoreDisplay.innerText = userScore;
};

/* Update score and store in local storage */ 

const readLocalStorage = () => {

  savedHighScore = localStorage.getItem('highScoreStorage');

  if (!savedHighScore) {
    console.log('something in storage');
    highScore = savedHighScore;
  } else {
    highScore = 0;
  }
  return;
};

updateHighScore();

const updateHighScore = () => {

  readLocalStorage();
  highScoreRef.innerHTML = highScoreStorage;

  if (userScore > highScore) {
    console.log(highScore);
    console.log('higher than high score');
    localStorage.setItem('highScoreStorage', userScore);
  } else {
    console.log('Not higher than high score');
  }
};





