// 4 questions to do... always start with data, then logic
var questions = [
    {
        title: "How much is 2 + 2?",
        options: ["0", "1", "2", "4"],
        answer: "4"
    },
    {
        title: "How much is 2 + 3?",
        options: ["2", "5", "2", "4"],
        answer: "5"
    },
    {
        title: "How much is 2 + 4?",
        options: ["7", "9", "2", "4"],
        answer: "6"
    },
    {
        title: "How much is 2 + 5?",
        options: ["0", "6", "2", "3"],
        answer: "7"
    },
]

var questionContainer = document.getElementById("questions");
var questionTitle = document.getElementById("question-name");
var questionOptions = document.getElementById("options");
var startScreen = document.getElementById("start-screen");
var startButton = document.getElementById("start-button");
var countdownContainer = document.getElementById("countdown");

var timerClock = 75;
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