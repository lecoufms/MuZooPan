var currentQuestion = 0;
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


/*var currentQuestion =0;
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