// array of questions and answers
var questions = [
    { prompt: "Commonly used data types, DO NOT include:", answers: [" Strings", "Booleans","alerts", "numbers"], correct: "alerts" },

    { prompt: "The condition in an if/else statement is enclosed within?:", answers: [ "Quotes", "Curly brackets", "Parenthesis", "Square brackets"], correct: "Parenthesis" },

    { prompt: "Arrays in Javascript can be store in?", answers: [ "numbers and strings", "other arrays", "booleans", "all of the above"], correct: "all of the above" },

    { prompt: "String values must be enclosed within ..... when being assigned to variables:", answers: [ "commas", "curly brakets", "quotes", "parenthesis"], correct: "quotes" },

    { prompt: "A very useful tool used during development and debugging for printing content to the debugger is:", answers: [ "javascript", "terminal/bash", "for loops","console.log"], correct: "console.log" },
];


//select DOM ELEMENTS

var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector(".timer");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector(".scores");
var startBtn = document.querySelector("#start");
var nameEl = document.querySelector(".initials");
var feedbackEl = document.querySelector("#feedback");
var GoBackBtn = document.querySelector(".GoBack");
var wrapperEl = document.querySelector(".wrapper");
var startScreenEl = document.querySelector("#start-screen");
var endScreenEl = document.querySelector("#end-screen");
var timerCounter = document.querySelector("#time");
var scoresBtn = document.querySelector("view-high-scores");
var highscores = document.querySelector("#highscores");
var submitHighScore = document.querySelector("submitHighScore")

var currentQuestionIndex = 0;
var time = questions.length *15;
var timerId; 

// function to start Quiz

function quizStart() {
    timerId = setInterval(timer, 1000);
    startScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestion();
}

function timer () { 
  time = time - 1;
  //console.log(time);
  timerCounter.textContent = time;
  }

// Star Quiz by clicking the Start Quiz button

startBtn.onclick = quizStart;

// Array of Questions and Answers List with buttons
function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    var promptEl = document.getElementById("question-title")
    promptEl.textContent = currentQuestion.prompt;
    choicesEl.innerHTML = "";
    currentQuestion.answers.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.onclick = questionClick;
        choicesEl.appendChild(choiceBtn);
    });
}

function questionClick() {
    if (this.value !== questions[currentQuestionIndex].correct) {
      time -= 10;
      if (time < 0) {
        time = 0;
      }
      timerEl.textContent = time;
      feedbackEl.textContent = `Wrong! The correct answer was ${questions[currentQuestionIndex].correct}.`;
      feedbackEl.style.color = "red";
    } else {
      feedbackEl.textContent = "Correct!";
      feedbackEl.style.color = "green";
    }
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback hide");
    }, 2000);
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
}

// Function to end the Quiz

function quizEnd() {
    clearInterval(timerId);
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class", "hide");
}

function timer () {
  time --;
  timerCounter.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}

// Save Final score in local storage with user's Initials

function submitHighScore() {
  var initials = document.querySelector(".initials").value();
  console.log(initials)
if (initials !=="") {
  var highscores = 
  JSON.parse(window.localStorage.getItem("highscores")) || [];
  var newScore = {
    score: time,
    initials: initials
  };
  highscores.push(newScore);
  window.localStorage.setItem("highscores", JSON.stringify(highscores));
}
}

onclick = "functionName()"


// User's final score saved by pressing enter

function checkForEnter(event) {
  if (event.key === "Enter") {
    submitHighScore();
  }
}

initials.onkeyup = checkForEnter;

submitBtn.onclick = submitHighScore;

//Retrieve High Scores from Local Storage in ranking order

function printHighscores () {
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  highscores.sort(function(a, b) {
    return b.score - a.score;
  });
}


function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}
document.getElementById("clear").onclick = clearHighscores;

printHighscores();