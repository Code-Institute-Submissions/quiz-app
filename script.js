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

    



// Set constants for game
const addPoints = 15;// When you get a correct answer it adds points
const questionLimit = 3; // Limits no. of questions per game


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
        return window.location.assign('/end.html');
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
        }, 3000);
  });
}); 

increaseScore = number => {
    userScore += number;
    userScoreDisplay.innerText = userScore;
}

startQuiz();
