/*var currentQuestion = 0;
var score = 0;

var container = document.getElementById('quizContainer');
var questionEl = document.getElementById('question;');
var opt1 = document.getElementById('opt1');
var opt2 = document.getElementById('opt2');
var opt3 = document.getElementById('opt3');
var opt4 = document.getElementById('opt4');

var nextBtn = document.getElementById('nextButton');
var resultCont = document.getElementById('result');

function loadQuesition(qIndex) {
    var q = questions[qIndex];
    questionEl.textContent = (qIndex+1) + '. '+q.question;
    opt1.textContent = q.option1;
    opt2.textContent = q.option2;
    opt3.textContent = q.option3;
    opt4.textContent = q.option4;

};

function loadNextQuestion() {
    var
}


var currentQuestion =0;
var score = 0;
var  totQuestion = questions.length;
var container =document.getElementById('quizcontainer');
var questionEl = document.getElementById('question');
var op1 = document.getElementById('opt1');
var op2 = document.getElementById('opt2');
var op3 = document.getElementById('opt3');
var op4 = document.getElementById('opt4');
var nextButton =document.getElementById('nextButton');
var resultCont =document.getElementById('pontos');


function loadQuestion(questionIndex) {
    var q = questions[questionIndex];
    questionEl.textContent = (questionIndex +1) +'.'+q.question;
    opt1.textContent = q.option1;
    opt2.textContent = q.option2;
    opt3.textContent = q.option3;
    opt4.textContent = q.option4;
};
function loadNextQustion() {
var selectedOption =document.querySelector('input[type=radio]:checked');
if (!selectedOption){
    alert('Please select your answer');
    return;
}
var answer = selectedOption.value;
if (questions[currentQuestion].answer == answer){
    score+=100;
}
selectedOption.checked = false;
currentQuestion++;
if (currentQuestion == totQuestion-1){
    nextButton.textContent = 'Encerrar';
    changePrepare("premio",true);
} 
if (currentQuestion ==totQuestion){
    container.style.display = 'none';
    resultCont.style.display = '';
    resultCont.textContent = 'Your Score: '+score;
    return;
}
loadQuestion(currentQuestion);
}*/


/*OUTRO ARQUIVO.JS*/
// function stateVolumesetlocalSt() {
//     console.log("action ");
//     if (cordova.platformId == "android") {
//         window.androidVolume.getMusic(function (sucess) {
//                 var valor = parseInt(sucess);
//                 console.log(typeof sucess);
//                 // var valor = (sucess+1);
//                 // console.log(' stateVolumeU '+valor);
//                 if (valor > 0) {
//                     if (window.localStorage.getItem("volume") != valor) {
//                         window.localStorage.setItem("volume", valor);
//                         setVolumeHtml(valor);
//                     }
//                 }

//         }, fail);
//     }
//     // console.log( parseInt(document.getElementById("volume").value));
// }
// function stateVolumeDsetH(e) {
//     console.log("action ");
//     if (cordova.platformId == "android") {
//         window.androidVolume.getMusic(function (sucess) {
//                 var valor = parseInt(sucess);
//                 console.log(typeof sucess);
//                 var valor = (sucess-1);
//                 console.log(' stateVolumeD '+ valor);
//                 if (valor > 0 ) {
//                     if (window.localStorage.getItem("volume") != valor) {
//                         setVolumeDis(valor);
//                         setVolumeHtml(valor);
//                     }
//                 }
//         }, fail);
//     }
//     e.preventDefault();
//     // console.log( parseInt(document.getElementById("volume").value));
// }



/*    function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// create questions
var questions = [
    new Question("Which one is not an object oriented programming language?", ["Java", "C#","C++", "C"], "C"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("There are ____ main components of object oriented programming.", ["1", "6","2", "10"], "4"),
    new Question("Which language is used for web apps?", ["PHP", "Python", "Javascript", "All"], "All"),
    new Question("MVC is a ____.", ["Language", "Library", "Framework", "All"], "Framework")
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();





*/