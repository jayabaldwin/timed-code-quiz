var highscoreList = document.getElementById("highscores-list");
var resetButton = document.getElementById("reset-highscores");
var resetMessage = document.getElementById("reset-message");

var highScores = JSON.parse(window.localStorage.getItem('highScores')) || [];

function displayHighScores() {
    // presents scores in descending order, from highest to lowest score
    // REVISE THIS FUNCTION
    highScores.sort((a, b) => b.score - a.score);
    highscoreList.innerHTML = '';
    highscoreList.setAttribute("style", "list-style-type: none;")

    for (var i = 0; i < highScores.length; i++) {
        var scoreItem = document.createElement('li');
        scoreItem.textContent = `${highScores[i].initials}: ${highScores[i].score}`;
        highscoreList.appendChild(scoreItem);
    }
}

// call function to display the high scores
displayHighScores();

// clear high scores using reset button
resetButton.addEventListener('click', function () {
    window.localStorage.removeItem('highScores');
    window.location.reload();
});