// start with data, then logic
var questions = [
    {
        title: "What is JavaScript primarily used for?",
        options: ["a) Styling web pages", "b) Enhancing interactivity on web pages", "c) Database management", "d) Server-side scripting"],
        answer: "b) Enhancing interactivity on web pages"
    },
    {
        title: "Which symbol represents the modulus?",
        options: ["a) !", "b) >=", "c) *", "d) %"],
        answer: "d) %"
    },
    {
        title: "Which method is used to remove the last element from an array in JavaScript?",
        options: ["a) slice()", "b) remove()", "c) pop()", "d) delete()"],
        answer: "c) pop()"
    },
    {
        title: "Which symbol is used for commenting out single-lines in JavaScript?",
        options: ["a) //", "b) /*...*/", "c) &&", "d) ||"],
        answer: "a) //"
    },
    {
        title: "Which is NOT a primitive data type in JavaScript?",
        options: ["a) Boolean", "b) Object", "c) Undefined", "d) String"],
        answer: "b) Object"
    },
    {
        title: "What does the 'DOM' stand for in JavaScript?",
        options: ["a) Dynamic Object Model", "b) Data Object Model", "c) Document Order Model", "d) Document Object Model"],
        answer: "d) Document Object Model"
    },
    {
        title: "What is the purpose of the addEventListener method in JavaScript?",
        options: ["a) To add a new HTML element", "b) To create a new event", "c) To attach an event handler to an element", "d) To remove an event from an element"],
        answer: "c) To attach an event handler to an element"
    },
    {
        title: "What does the NaN value represent in JavaScript?",
        options: ["a) Not a Number", "b) Null and Nothing", "c) Negative Number", "d) No Assignment"],
        answer: "a) Not a Number"
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

// starting states
var timeLeft = 60;
var questionIndex = 0;
var answerCount = 0;
var timerInterval = setInterval(function() {
}, 1000);




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




function countdownTimer() {
    var timerInterval = setInterval(function() {
        // decrease var timeLeft that was declared earlier by 1
        timeLeft --;
    
        // countdown html element display the text of timeleft 
        countdownEl.textContent = timeLeft + " seconds";
    
        if(timeLeft === 0 || questionIndex === questions.length - 1 || timeLeft < 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            endGame();
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

    // Subtract time if answer is incorrect
    if (buttonEl.value !== correctAnswer) {
        timeLeft -= 10;
    } else if
        (buttonEl.value === correctAnswer) {
        answerCount++;    
    };

    // stops action from taking place if the click is not on the buttonEl
    if (buttonEl.matches(questions.options)) {
        return;
    } else {
        questionIndex++;
        renderQuestions();
    };
}

questionOptions.addEventListener("click", questionClick);



function endGame() {
    countdownEl.textContent = 0;

    // show final score
    finalScore.textContent = "Your final score is: " + answerCount

    // go to results page
    questionContainer.classList.add('hide');
    resultsPage.classList.remove('hide');
}




submitButton.addEventListener("click", function() {
    var initials = initialsEl.value.trim();
    if (initials !== '') {
        var highScores = JSON.parse(window.localStorage.getItem('highScores')) || [];
        var newScore = {
            initials: initials,
            score: answerCount
        };

        highScores.push(newScore);
        window.localStorage.setItem('highScores', JSON.stringify(highScores));
        window.location.href = 'highscores.html';
    }
});