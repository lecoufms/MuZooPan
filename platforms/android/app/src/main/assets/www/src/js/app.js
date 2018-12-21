function fail(evt) {
    console.log("fail "+evt);
}
function onMenu() {
    document.getElementById("buttonMenu").addEventListener("click", sideBar);
    // document.getElementById("buttonMenu2").addEventListener("click", buttonMenu);
    document.getElementById("myCanvasNav").addEventListener("click", buttonMenu);
    document.getElementById('estilo').addEventListener("click", Estilo);
    // document.getElementById("volume").addEventListener("change", stateVolumeHsetD);
    document.getElementById('aumentaFonte').addEventListener("click", aumentaFonte);
    document.getElementById('diminuiFonte').addEventListener("click", diminuiFonte);
    document.getElementById('fonte').addEventListener("change", Fonte);
    document.getElementById("buttonMenu").addEventListener("click", sideBar2);
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
            console.log(' null volume localStorage');
            window.localStorage.setItem("volume",sucess);
        }, fail);
    }
    if (window.localStorage.getItem("contraste") == "on") {
        document.getElementById('estilo').checked=true;
        setContraste();
    }else if (window.localStorage.getItem("contraste") == "off") {
        removeContraste();
        document.getElementById('estilo').checked=false;
    }
    if (window.localStorage.getItem("fonte")) {
        setTamanhoFonte(parseInt(window.localStorage.getItem('fonte')));
    }
    if (window.localStorage.getItem("volume")) {
        // setVolumeHtml(window.localStorage.getItem("volume"));
        // setVolumeDis(window.localStorage.getItem("volume"));
    }
}
function exit(){
    console.log("exit");
    window.localStorage.removeItem("qrcodeInput");
    window.localStorage.removeItem("anterior");
    if (cordova.platformId != "browser") {
        navigator.app.exitApp();
    }
}

function buttonMenu() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("myCanvasNav").style.width = "0";
    document.getElementById("myCanvasNav").style.opacity = "0"; 
}
function sideBar() {
    document.getElementById("myCanvasNav").style.width = "100%";
    document.getElementById("myCanvasNav").style.opacity = "0.8";
    // stateVolumeUsetH();
}


function sideBar2() {
    document.getElementById("mySidebar").style.width = "40%";
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













// function sucess(sucess) {
//     console.log("sucesso ao alterar volume Music" + sucess);
// }

// function setVolumeHtml(valor) {
//     document.getElementById("volume").value = valor;
//     window.localStorage.setItem("volume", valor);
// }
// function setVolumeDis(valor) {
//     window.androidVolume.setMusic(valor, false, sucess, fail);
//     window.localStorage.setItem("volume",valor);
// }





// function stateVolumeHsetD() {
//     var valor =  document.getElementById("volume").value;
//     if(valor > 0){
//         if (window.localStorage.getItem("volume") != valor) {
//             setVolumeDis(valor);
//         }
//     }
// }
// function stateVolumeUsetH() {
//     console.log("action ");
//     window.androidVolume.getMusic(function (sucess) {
//             var valor = parseInt(sucess);
//             console.log(typeof sucess);
//             // var valor = (sucess+1);
//             // console.log(' stateVolumeU '+valor);
//             if (valor > 0) {
//                 if (window.localStorage.getItem("volume") != valor) {
//                     setVolumeHtml(valor);
//                 }
//             }

//     }, fail);
//     // console.log( parseInt(document.getElementById("volume").value));
// }
// function stateVolumeDsetH(e) {
//     console.log("action ");
//     window.androidVolume.getMusic(function (sucess) {
//             var valor = parseInt(sucess);
//             console.log(typeof sucess);
//             var valor = (sucess-1);
//             console.log(' stateVolumeD '+ valor);
//             if (valor > 0 ) {
//                 if (window.localStorage.getItem("volume") != valor) {
//                     setVolumeDis(valor);
//                     setVolumeHtml(valor);
//                 }
//             }
//     }, fail);
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
    new Question("There are ____ main components of object oriented programming.", ["1", "6","2", "4"], "4"),
    new Question("Which language is used for web apps?", ["PHP", "Python", "Javascript", "All"], "All"),
    new Question("MVC is a ____.", ["Language", "Library", "Framework", "All"], "Framework")
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();





*/