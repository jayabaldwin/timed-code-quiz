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

var questionContainer = document.getElementById("questions");
var questionTitle = document.getElementById("question-name");
var questionOptions = document.getElementById("options");
var startScreen = document.getElementById("start-screen");
var startButton = document.getElementById("start-button");
var countdownContainer = document.getElementById("countdown");

var timerClock = 60;
var questionCounter = 0;

// logic

startButton.addEventListener("click", startGame);

function startGame() {
    startScreen.classList.add('hide');
    questionContainer.classList.remove('hide');

    setInterval(countdownTimer, 1000);
    // use clear interval to stop the countdown
    renderQuestions();
}

function countdownTimer() {
    timerClock --;
    countdownContainer.textContent = timerClock;
}


function renderQuestions() {
    var currentQuestion = questions[questionCounter];
    questionOptions.innerHTML = "";
    questionTitle.textContent = currentQuestion.title

    var optionsArray = questions[questionCounter].options;
    for (var i=0; i < optionsArray.length; i++) {
        var choice = optionsArray[i];
        console.log(choice);

        var choiceEl = document.createElement("button");
        choiceEl.setAttribute("value", choice);
        choiceEl.textContent = choice;
        questionOptions.appendChild(choiceEl);

    }
}

function questionClick(event) {
    var buttonEl = event.target;
    console.log("answerValue", buttonEl.value);

    questionCounter++;
    renderQuestions();

}

questionOptions.addEventListener("click", questionClick);

// compare value, if correct all g, incorrect subtract 10, if value of counter 0 stop game