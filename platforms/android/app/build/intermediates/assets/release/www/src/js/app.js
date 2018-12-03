function onMenu() {
  document.getElementById("buttonMenu").addEventListener("click", sideBar);
  document.getElementById("buttonMenu2").addEventListener("click", buttonMenu);
  document.getElementById('estilo').addEventListener("click", Estilo);
  document.getElementById("volume").addEventListener("change", stateVolumeD);
  document.getElementById('aumentaFonte').addEventListener("click", aumentaFonte);
  document.getElementById('diminuiFonte').addEventListener("click", diminuiFonte);
  document.getElementById('fonte').addEventListener("change", Fonte);
  getEstilo();
}

function Estilo() {
  if (document.getElementById('estilo').checked) {
  window.localStorage.setItem("contraste", "on");
  }else{
  window.localStorage.setItem("contraste", "off");
  }
  getEstilo();
}
function Fonte() {
  window.localStorage.setItem("fonte", document.getElementById('fonte').value);
  document.getElementById('fonte').value=window.localStorage.getItem("fonte");
  console.log(document.getElementById('fonte').value);
  getEstilo();
}
function setContraste() {
  document.styleSheets[1]["cssRules"][0]["style"].setProperty('--corFonteTitulo','grey');
}
function removeContraste() {
  document.styleSheets[1]["cssRules"][0]["style"].setProperty('--corFonteTitulo','#fb5a01');
}
function setTamanhoFonte(tamanho) {
  document.styleSheets[1]["cssRules"][0]["style"].setProperty('--tamanhoFonte', tamanho);  
  document.getElementById('fonte').value= tamanho;
}
function getEstilo(){
  if (window.localStorage.getItem("contraste") == null) {
  window.localStorage.setItem("contraste", "off");
  }
  if (window.localStorage.getItem("fonte") == null) {
  var tamanho = document.styleSheets[1]["cssRules"][0]["style"].getPropertyValue('--tamanhoFonte');
  window.localStorage.setItem("fonte", tamanho);
  }
  if (window.localStorage.getItem("volume") == null) {
      window.androidVolume.getMusic(function (sucess) {
        console.log('volume localStorage');
      window.localStorage.setItem("volume",sucess);
    }, fail);
  }
  console.log(window.localStorage.getItem("contraste"));
  if (window.localStorage.getItem("contraste") == "on") {
  document.getElementById('estilo').checked=true;
  setContraste();
  }else if (window.localStorage.getItem("contraste") == "off") {
  removeContraste();
  document.getElementById('estilo').checked=false;
  }
  if (window.localStorage.getItem("fonte") != 'null') {
  setTamanhoFonte(parseInt(window.localStorage.getItem('fonte')));
  }
  if (window.localStorage.getItem("volume") != 'null') {
    console.log('volume html');
    setVolumeHtml(window.localStorage.getItem("volume"));
  }
}
function exit(){
  console.log("exit");
  window.localStorage.removeItem("anterior");
  if (cordova.platformId != "browser") {
  navigator.app.exitApp();
  }
}

function buttonMenu() {
  document.getElementById("mySidebar").style.display = "none";
}
function sideBar() {
  document.getElementById("mySidebar").style.display = "block";
}


function fail(evt) {
  console.log(evt);
}
function sucess(sucess) {
  console.log(sucess);
}
function stateVolumeD() {
  console.log("music");
  console.log( parseInt(document.getElementById("volume").value));
  setVolumeDi(parseInt(document.getElementById("volume").value));
}
function stateVolumeH() {
  console.log("music");
  window.androidVolume.getMusic(function (sucess) {
        console.log('volume localStorage');
      setVolumeHtml(parseInt(sucess));
    }, fail);
  console.log( parseInt(document.getElementById("volume").value));
  setVolumeDi(parseInt(document.getElementById("volume").value));
}
function setVolumeHtml(valor) {
  document.getElementById("volume").value = valor;
  window.localStorage.setItem("volume",valor);
}
function setVolumeDi(valor){
  window.androidVolume.setMusic(valor, false, sucess, fail);
  window.localStorage.setItem("volume",valor);
}



function stateFonte() {
  console.log( parseInt(document.getElementById("fonte").value));
}
function aumentaFonte(){
  console.log(typeof document.getElementById('fonte').value);
  document.getElementById('fonte').value= parseInt(document.getElementById('fonte').value) + 1;
  Fonte();
}
function diminuiFonte(){
  document.getElementById('fonte').value= parseInt(document.getElementById('fonte').value) - 1;
  Fonte();
}














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
    new Question("There are ____ main components of object oriented programming.", ["1", "6","2", "4"], "4"),
    new Question("Which language is used for web apps?", ["PHP", "Python", "Javascript", "All"], "All"),
    new Question("MVC is a ____.", ["Language", "Library", "Framework", "All"], "Framework")
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();





*/