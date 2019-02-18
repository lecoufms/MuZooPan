var control;
function anterior(e) {
    e.preventDefault();
    console.log('teste');
    var ind = cordova.file.applicationDirectory+'www/index.html';
    var anterior;
    var jdata;
    if (window.localStorage.getItem("anterior")) {
        anterior = localStorage.getItem('anterior');
        console.log(anterior);
        if(anterior){
            jdata = JSON.parse(anterior);
        }
    }
    if (window.localStorage.getItem("config") == "quiz") {
        console.log("não pode jovem");
    }else if (window.localStorage.getItem("config") == "obj" && window.localStorage.getItem("anterior") && (jdata.totalR < jdata.tamanho)){
        console.log('vamos voltar da revisao, prob');
        var onde = JSON.parse(window.localStorage.getItem('anterior'));
        window.localStorage.setItem("qrcodeInput", onde.nome);
        window.localStorage.setItem("config", onde.nome);
        changePage("view.html");
    }else if (window.location.href !== ind) {
        console.log('vou ao index, bele');
        window.history.go(-1);
    }else if (window.location.href === ind && camera){
        exit();
    }else if ( window.localStorage.getItem("config") == "app" && window.localStorage.getItem("qrcodeInput") == "premio"){
        exit();
    }
}

function changePage(path){
  window.location.assign(path);
}



function fail(evt) {
    console.log("fail "+evt);
}



function onMenu() {
    document.getElementById("buttonMenu").addEventListener("click", sideBar);
    // document.getElementById("buttonMenu2").addEventListener("click", buttonMenu);
    document.getElementById("myCanvasNav").addEventListener("click", buttonMenuClose);
    document.getElementById('estilo').addEventListener("click", Estilo);
    document.getElementById("volume").addEventListener("change", stateVolumeHsetD);
    document.getElementById('aumentaFonte').addEventListener("click", aumentaFonte);
    document.getElementById('diminuiFonte').addEventListener("click", diminuiFonte);
    document.getElementById('fonte').addEventListener("change", Fonte);
    document.getElementById("buttonMenu").addEventListener("click", sideBar2);

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

/*
CONTRASTE
 --corFundo: var(--corFundoNormal);
    --corFonteTitulo: var(--corFonteTituloNormal); 
    --corFundoMenuOpcao: var(--corFundoNavAnimal);
    --corFundoMenuCorpo: var(--corFundoNavAnimal);
    --corBarraMenu: var(--corFundoSelect);
    --corFonteTextoLidoMenuOpcao: var(--corFonteTituloNormal);
    --corFonteTextoLidoMenuCorpo:var(--corFonteTextoLido);

*/
function setContraste() {
    document.styleSheets[1]["cssRules"][0]["style"].setProperty('--corFundo',document.styleSheets[1]["cssRules"][0]["style"].getPropertyValue('--corFundoCon'));
    document.styleSheets[1]["cssRules"][0]["style"].setProperty('--corFonteTitulo',document.styleSheets[1]["cssRules"][0]["style"].getPropertyValue('--corFonteTextContras'));
    document.styleSheets[1]["cssRules"][0]["style"].setProperty('--corFundoMenuOpcao',document.styleSheets[1]["cssRules"][0]["style"].getPropertyValue('--corFundoMenuCont'));
    document.styleSheets[1]["cssRules"][0]["style"].setProperty('--corFundoMenuCorpo',document.styleSheets[1]["cssRules"][0]["style"].getPropertyValue('none'));
    document.styleSheets[1]["cssRules"][0]["style"].setProperty('--corBarraMenu',document.styleSheets[1]["cssRules"][0]["style"].getPropertyValue('--corBarraMenuCon'));
    document.styleSheets[1]["cssRules"][0]["style"].setProperty('--corFonteTextoLidoMenuOpcao',document.styleSheets[1]["cssRules"][0]["style"].getPropertyValue('--corFonteMenuCont'));
    document.styleSheets[1]["cssRules"][0]["style"].setProperty('--corFonteTextoLidoMenuCorpo',document.styleSheets[1]["cssRules"][0]["style"].getPropertyValue('--corFonteTextContras'));
}
function removeContraste() {
    document.styleSheets[1]["cssRules"][0]["style"].setProperty('--corFundo',document.styleSheets[1]["cssRules"][0]["style"].getPropertyValue('--corFundoNormal'));
    document.styleSheets[1]["cssRules"][0]["style"].setProperty('--corFonteTitulo',document.styleSheets[1]["cssRules"][0]["style"].getPropertyValue('--corFonteTituloNormal'));
    document.styleSheets[1]["cssRules"][0]["style"].setProperty('--corFundoMenuOpcao',document.styleSheets[1]["cssRules"][0]["style"].getPropertyValue('--corFundoNavAnimal'));
    document.styleSheets[1]["cssRules"][0]["style"].setProperty('--corFundoMenuCorpo',document.styleSheets[1]["cssRules"][0]["style"].getPropertyValue('--corFundoNavAnimal'));
    document.styleSheets[1]["cssRules"][0]["style"].setProperty('--corBarraMenu',document.styleSheets[1]["cssRules"][0]["style"].getPropertyValue('--corFundoSelect'));
    document.styleSheets[1]["cssRules"][0]["style"].setProperty('--corFonteTextoLidoMenuOpcao',document.styleSheets[1]["cssRules"][0]["style"].getPropertyValue('--corFonteTituloNormal'));
    document.styleSheets[1]["cssRules"][0]["style"].setProperty('--corFonteTextoLidoMenuCorpo',document.styleSheets[1]["cssRules"][0]["style"].getPropertyValue('--corFonteTextoLido'));
}
function onDeviceReady() {
    // Register the event listener
    // document.addEventListener("pause", estadoAtual);
    // document.addEventListener("resume", restaura); .applicationDirectory applicationDirectory  
    
    document.addEventListener("backbutton", anterior,true);
    try{

        setVolumeHtml();   
    }catch (e)  {
        console.log(e);
    }
    console.log(cordova.platformId);
}



function setTamanhoFonte(tamanho) {
    if (tamanho >= 15 && tamanho <= 30) {
        document.styleSheets[1]["cssRules"][0]["style"].setProperty('--tamanhoFonte', tamanho);  
        document.getElementById('fonte').value= tamanho;
    }else if (tamanho <= 15) {
        document.styleSheets[1]["cssRules"][0]["style"].setProperty('--tamanhoFonte', 10);  
        document.getElementById('fonte').value= 1;
    }else if (tamanho > 30) {
        document.styleSheets[1]["cssRules"][0]["style"].setProperty('--tamanhoFonte', 30);  
        document.getElementById('fonte').value= 30;
    }
}
function getEstilo(){
    if (window.localStorage.getItem("contraste") == null) {
        window.localStorage.setItem("contraste", "off");
    }
    if (window.localStorage.getItem("fonte") == null) {
        var tamanho = document.styleSheets[1]["cssRules"][0]["style"].getPropertyValue('--tamanhoFonte');
        window.localStorage.setItem("fonte", tamanho);
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
    try{

        setVolumeHtml();   
    }catch (e) {
        console.log(e);
    }
}
function exit(){
    console.log("exit");
    window.localStorage.removeItem("qrcodeInput");
    window.localStorage.removeItem("anterior");
    window.localStorage.removeItem("volume");
    if (cordova.platformId != "browser") {
        navigator.app.exitApp();
    }

}

function buttonMenuClose() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myCanvasNav").style.width = "0";
    document.getElementById("myCanvasNav").style.opacity = "0"; 
}
function sideBar() {
    document.getElementById("myCanvasNav").style.width = "100%";
    document.getElementById("myCanvasNav").style.opacity = "0.8";
    try{
        setVolumeHtml();   
    }catch (e) {
        console.log(e);
    }
}

function sideBar2() {
    document.getElementById("mySidebar").style.width = "60vw";
    document.getElementById("mySidebar").style.display = "block";
}

function aumentaFonte(){
    console.log(typeof document.getElementById('fonte').value);
    setTamanhoFonte(parseInt(document.getElementById('fonte').value) + 1);
    Fonte();
}
function diminuiFonte(){
    setTamanhoFonte(parseInt(document.getElementById('fonte').value) - 1);
    Fonte();
}













function sucess(sucess) {
    console.log("sucesso ao alterar volume Music" + sucess);
}

function setVolumeHtml() {
    if (cordova.platformId == "android") {
            window.androidVolume.getMusic(function (sucess) {
                console.log(' null volume localStorage');
                document.getElementById("volume").value = sucess;
            }, fail);
    }
    
}
function setVolumeDis(valor) { 
    if (cordova.platformId == "android") {
        window.androidVolume.setMusic(valor, false, sucess, fail);
    }
}





function stateVolumeHsetD() {
    var valor =  document.getElementById("volume").value;
    if(valor > 0){
        if (window.localStorage.getItem("volume") != valor) {
            setVolumeDis(valor);
        }
    }
}
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