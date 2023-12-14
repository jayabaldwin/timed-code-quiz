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

// timer
var timeLeft = 60;

// question index
var questionIndex = 0;

// button that initiates the start game function
startButton.addEventListener("click", startGame);

// hides start screen, displays question screen, initiates timer and renders first question
function startGame() {
    startScreen.classList.add('hide');
    questionContainer.classList.remove('hide');

    setInterval(countdownTimer, 1000);

    renderQuestions();
}

// timer... need to clearInterval when 0 but can't figure out how to when setInterval hasnt been declared as a function
function countdownTimer() {
    timeLeft --;
    countdownEl.textContent = timeLeft;


    if (timeLeft === 0) {
        questionContainer.classList.add('hide');
        resultsPage.classList.remove('hide');
    }
}


function renderQuestions() {
    var currentQuestion = questions[questionIndex];
    questionOptions.innerHTML = "";
    questionTitle.textContent = currentQuestion.title

    var optionsArray = questions[questionIndex].options;
    for (var i=0; i < optionsArray.length; i++) {
        var choice = optionsArray[i];
        console.log(choice);

        var choiceEl = document.createElement("button");
        choiceEl.setAttribute("value", choice);
        choiceEl.textContent = choice;
        questionOptions.appendChild(choiceEl);
    }
}

// moving forward to the next question upon making a choice
function questionClick(event) {
    var buttonEl = event.target;
    console.log("answerValue", buttonEl.value);

    questionIndex++;
    renderQuestions();

// if button vakue !== questions answer
// peanalize time ... timeLeft -= 10

// if time < 0 {
    if (timeLeft < 0) {
        timeLeft = 0;
    }
}










questionOptions.addEventListener("click", questionClick);


// compare value, if correct all g, incorrect subtract 10, if value of counter 0 stop game