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

// starting timer state
var timeLeft = 60;

// question index
var questionIndex = 0;


// button that initiates the start game function
startButton.addEventListener("click", startGame);


function startGame() {
    // hides start screen
    startScreen.classList.add('hide');

    // displays question screen
    questionContainer.classList.remove('hide');

    // initiates timer
    countdownTimer();

    // renders first question
    renderQuestions();
}


// timer
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


// questions function
function renderQuestions() {
    // select question object from the array of questions
    var currentQuestion = questions[questionIndex];

    // clear out previous question from html
    questionOptions.innerHTML = "";

    // the text for the html question header = title of the current question 
    questionTitle.textContent = currentQuestion.title

    // question array [indexed] and selecting the options property from inside it
    var optionsArray = questions[questionIndex].options;

    // loop through each potential answer
    for (var i=0; i < optionsArray.length; i++) {
        var choice = optionsArray[i];
        console.log(choice);

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

// initially used within start game function but couldnt figure out how to clearinterval when it wasnt declared as a variable
// setInterval(countdownTimer, 1000);

// timer... need to clearInterval when 0 but can't figure out how to when setInterval hasnt been declared as a function
// function countdownTimer() {
//     // decrease var timeLeft that was declared earlier by 1
//     timeLeft --;

//     // countdown html element display the text of timeleft 
//     countdownEl.textContent = timeLeft;

//     // when time runs out, go to results page regardless of if quiz is answered
//     if (timeLeft === 0) {
//         questionContainer.classList.add('hide');
//         resultsPage.classList.remove('hide');
//     }
// }