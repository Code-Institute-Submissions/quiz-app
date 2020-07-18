// Select questions and options
const question = document.querySelector('#question');
const options = Array.from(document.querySelectorAll('.choice-text'));

// Create variables
let currentQuestion = {};
let readyForAnswers = false;
let userScore = 0;
let counter = 0;
let remainingQuestions = []; // allows new question to be given to player each time

// Hard coded questions stored in objects
let questions = [
    {
        question: "Grand Central Terminal, Park Avenue, New York is the worlds...",
        choice1: "Largest railway station",
        choice2: "Highest railway station",
        choice3: "Longest railway station",
        choice4: "None of the above",
        answer: 1, // Shows correct answer
    },
    {
        question: "For which of the following disciplines is Nobel Prize awarded?",
        choice1: "Physics and Chemistry",
        choice2: "Physiology or Medicine",
        choice3: "Literature, Peace and Economics",
        choice4: "All of the above",
        answer: 4,
    },
    {
        question: " How did Spider-Man get his powers?",
        choice1: "Born with them",
        choice2: "Woke up with them after a strange dream",
        choice3: "Bitten by a radioactive spider",
        choice4: "Military experiment gone wrong",
        answer: 3,
    },
];

// Set constants for game
const addPoints = 15;// When you get a correct answer it adds points
const questionLimit = 3; // Limits no. of questions per game

// Arrow functions to start game
startQuiz = () => {
    counter = 0;
    userScore = 0;
    remainingQuestions = [...questions]; // Copy all qs from question array using spread operator
    nextQuestion();
};

nextQuestion = () => {
    if (remainingQuestions.length === 0 || counter >= questionLimit) {
        //go to the end page
        return window.location.assign('/end.html');
    }
    counter++; // Increment by 1 when game is started
    const questionNumber = Math.floor(Math.random() * remainingQuestions.length); // Find a random number among the no. of available questions
    currentQuestion = remainingQuestions[questionNumber]; 
    question.innerText = currentQuestion.question;

    options.forEach((option) => { // iterate through each choice
        const number = option.dataset['number']; // reference dataset number ??
        option.innerText = currentQuestion['choice' + number]; // ??
    });

    remainingQuestions.splice(questionNumber, 1); // Remove used question from array
    readyForAnswers = true;
};

// Add functionality to for next question 

options.forEach(option => { // Add click event listener to each choice
    option.addEventListener('click', (e) => { // 
        if (!readyForAnswers) return; // Ignore clicks if too early

        readyForAnswers = false;
        const selectedOption = e.target;
        const selectedAnswer = selectedOption.dataset['number'];


        const applyClass = selectedAnswer == currentQuestion.answer ? "right" : "wrong"; //check if the answers are correct

        selectedOption.parentElement.classList.add(applyClass); // Select parent container and apply class

        setTimeout(() => {
            selectedOption.parentElement.classList.remove(applyClass); // Remove class
            nextQuestion();
        }, 1000);
  });
}); 


startQuiz();