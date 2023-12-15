// 4 questions to do... always start with data, then logic
var questions = [
    {
        title: "Which is NOT a primitive data type in JavaScript?",
        options: ["Boolean", "Object", "Undefined", "String"],
        answer: "Object"
    },
    {
        title: "Which symbol represents the modulus?",
        options: ["!", ">=", "*", "%"],
        answer: "%"
    },
    {
        title: "Which method is used to remove the last element from an array in JavaScript?",
        options: ["slice()", "remove()", "pop()", "delete()"],
        answer: "pop()"
    },
    {
        title: "Which symbol is used for commenting out single-lines in JavaScript?",
        options: ["//", "/*...*/", "&&", "||"],
        answer: "//"
    },
]

// variables to connect to DOM elements
var questionContainer = document.getElementById("questions");
var questionTitle = document.getElementById("question-name");
var questionOptions = document.getElementById("options");
var startScreen = document.getElementById("start-screen");
var startButton = document.getElementById("start-button");
var countdownEl = document.getElementById("countdown");
var resultsPage = document.getElementById("results");
var initialsEl = document.getElementById("initials");
var submitButton = document.getElementById("submit");
var finalScore = document.getElementById("final-score");

// starting timer state
var timeLeft = 60;

// question index
var questionIndex = 0;

// timer for clearing later
var timerInterval;


// button that starts the game
startButton.addEventListener("click", function() {
    // hides start screen
    startScreen.classList.add('hide');

    // displays question screen
    questionContainer.classList.remove('hide');

    // initiates timer
    countdownTimer();

    // renders first question
    renderQuestions();
});

// function startGame() {
//     // hides start screen
//     startScreen.classList.add('hide');

//     // displays question screen
//     questionContainer.classList.remove('hide');

//     // initiates timer
//     countdownTimer();

//     // renders first question
//     renderQuestions();
// }


function countdownTimer() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
        // decrease var timeLeft that was declared earlier by 1
        timeLeft --;

        // countdown html element display the text of timeleft 
        countdownEl.textContent = timeLeft;

        if(timeLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);

            // when time runs out, go to results page regardless of if quiz is completed
            questionContainer.classList.add('hide');
            resultsPage.classList.remove('hide');
         }
     }, 1000);
  }


function renderQuestions() {
    // select question object from the array of questions
    var currentQuestion = questions[questionIndex];

    // clear out previous question from html
    questionOptions.innerHTML = "";

    // the text for the html question header = title of the current question 
    questionTitle.textContent = currentQuestion.title

    // question array [indexed] and selecting the options property from inside it
    var optionsArray = currentQuestion.options;

    // loop through each potential answer
    for (var i=0; i < optionsArray.length; i++) {
        var choice = optionsArray[i];

        // create buttons for each option
        var choiceEl = document.createElement("button");

        // set the value of the button to be the choice variable aka the option
        choiceEl.setAttribute("value", choice);

        // set the text content of the button to be the option values
        choiceEl.textContent = choice;

        // adds button into the div
        questionOptions.appendChild(choiceEl);
    }
}


function questionClick(event) {
    // Get the element that triggered the event and store it in buttonEl
    var buttonEl = event.target;
    console.log("answerValue", buttonEl.value);

    // Get the correct answer for the current question and store it in correctAnswer
    var correctAnswer = questions[questionIndex].answer;

    // Subtract time if answer is incorrect, but dont allow to go into minus seconds
    if (buttonEl.value !== correctAnswer && timeLeft > 10) {
        timeLeft -= 10;
    } else if 
        (buttonEl.value !== correctAnswer && timeLeft < 10) {
        clearInterval(timerInterval);  
    }

    // Check if current question is last one, and if they are completed prior to time running out
    if (questionIndex === questions.length - 1) {
        // clear timerInterval as all questions have been answered
        clearInterval(timerInterval);
        // go to results page
        questionContainer.classList.add('hide');
        resultsPage.classList.remove('hide');
    } else {
        // Move to the next question
        questionIndex++;
        renderQuestions();
    }
}

questionOptions.addEventListener("click", questionClick);


submitButton.addEventListener("click", function() {
    var initials = initialsEl.value.trim();
    if (initials !== '') {
        var highScores = JSON.parse(window.localStorage.getItem('highScores')) || [];
        var newScore = {
            initials: initials,
            // SCORE SHOULD BE HOW MANY QUESTIONS ARE CORRECT + TIME REMAINING
            score: timeLeft
        };

        finalScore.textContent = newScore.score;

        highScores.push(newScore);
        window.localStorage.setItem('highScores', JSON.stringify(highScores));
        window.location.href = 'highscores.html';
    }
});