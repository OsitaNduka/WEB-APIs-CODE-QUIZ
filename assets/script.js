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
//var nameEl = document.querySelector("#name");
var feedbackEl = document.querySelector("#feedback");
//var reStartBtn = document.querySelector("#restart");
var wrapperEl = document.querySelector(".wrapper");
var startScreenEl = document.querySelector("#start-screen");
var endScreenEl = document.querySelector("#end-screen")
var timerCounter = document.querySelector("#time")

var currentQuestionIndex = 0;
var time = questions.length *15;
var timerId; 

function quizStart() {
    timerId = setInterval(timer, 1000);

    startScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestion();
}

function timer () { 
  time = time -1
  console.log(time);
  timerCounter.textContent = time
}
startBtn.onclick = quizStart;
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
    if (currentQuestionIndex == questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
}

function quizEnd() {
    clearInterval(timerId);
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class", "hide");
    var finalScoreEl = document.getElementById("#final-score");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class", "hide");
}

