var currentQuestion = 0;
var score = 0;
var revisao=0;
var acerto=0;
var bonus = 0;
var bonusTotal=0;
var container;
var questionEl;
var opt1;
var opt2;
var opt3;
var opt4;
var realizada;
var nextBtn;
// var resultCont = document.getElementById('result');
var myQuestions;
var Quiz;
var questionMy;

function vaiRetornar() {
    var data = localStorage.getItem('anterior');
    console.log(data);
    if(data){
        var jdata = JSON.parse(data);
        if(jdata){
            console.log('vaiRetornar');
            var timeD = new Date(jdata.data);
            if (timeD.toLocaleDateString() == (new Date()).toLocaleDateString()) {
                currentQuestion = jdata.pergunta.indice;
                realizada=jdata;
                score = jdata.pontos;
                acerto = jdata.acerto;
                bonus = jdata.sequencia;
                questionMy = document.getElementById(jdata.aResposta)
                if (questionMy != null) {
                    clickAlt(questionMy);
                }
            }else{
                currentQuestion=0;
                qualQuestion();
            }
        }
    }else{
        currentQuestion=0;
        qualQuestion();
    }
}

temQuestions = function (context){
    for (var i =0; i < context.length; i++) {
        console.log(context[i]["name"]);
        if(context[i]["name"] == 'quiz'){
            myQuestions =context[i]["questions"];
            Quiz=true;
            vaiRetornar();
            return;
        }
    }
}

function qualQuestion(){
    realizadaQ = {'nome' : myQuestions[i].nomeAnimal, 'indice': currentQuestion};
    realizada = {"nome": "quiz", "data": new Date(), "pergunta" : realizadaQ, "pontos":score, "acerto": acerto, "sequencia": bonus, "aResposta": (questionMy ? questionMy.id : null)};
}

function pontuacao(){
    document.getElementById('qnAcertos').innerText=acerto;
    document.getElementById('qnPontos').innerText=score;
}
function queBarraSou() {
    return document.getElementsByClassName('thumbnail')[0].children[0].id.substr(-1);   
}
function definePontuacao(){
    pontos=100;
    if (revisao > 0){
        while (pontos > 0 && revisao > 0){
            pontos-=50;
            revisao=revisao-1;
        }
    }
    if (bonus >= 4){
        pontos+=50;
    }
    score += pontos;
    acerto += 1;
}
function qualBarraPBonus() {
    if (bonus <=3) {
        return bonus;
    }else{
        return 4;
    }
}
function retiraVisuResposta(){
    var newCor = document.styleSheets[1]["cssRules"][0]["style"].getPropertyValue('--corFundoAlter');
    var img1 = document.getElementById('correct');
    var img2 = document.getElementById('incorrect');
    questionMy.parentNode.style.background='';
    if (img2 != null) {
        var alter = eCerta();
        alter.parentNode.style.background=newCor;
        alter.parentNode.parentNode.removeChild(img1);
        questionMy.parentNode.parentNode.removeChild(img2);
    }else{
        questionMy.parentNode.parentNode.removeChild(img1);
    }
    questionMy=null;   
}
function loadQuesition(qIndex) {
    var q = myQuestions[qIndex];
    questionEl.innerText = (qIndex+1) + '. '+q.texto;
    opt1.innerText = Object.keys(q.alternativas[0])[0].toUpperCase()+') '+Object.values(q.alternativas[0])[0];
    opt2.innerText = Object.keys(q.alternativas[1])[0].toUpperCase()+') '+Object.values(q.alternativas[1])[0];
    opt3.innerText = Object.keys(q.alternativas[2])[0].toUpperCase()+') '+Object.values(q.alternativas[2])[0];
    opt4.innerText = Object.keys(q.alternativas[3])[0].toUpperCase()+') '+Object.values(q.alternativas[3])[0];
}
function eCerta() {
    if (opt1.innerText[0].toLowerCase() == myQuestions[currentQuestion].resposta) {
        return opt1;
    }else if (opt2.innerText[0].toLowerCase() == myQuestions[currentQuestion].resposta) {
        return opt;
    }else if (opt3.innerText[0].toLowerCase() == myQuestions[currentQuestion].resposta) {
        return opt3;
    }else if (opt4.innerText[0].toLowerCase() == myQuestions[currentQuestion].resposta) {
        return opt4;
    }
}
/*
function resolveSuccess(fs) {
    console.log(fs.data);
    var file = 'files/config/quiz.json';
    fs.getFile(file, { create: true, exclusive: false }, function (fileEntry) {

        console.log("fileEntry is file?" + fileEntry.isFile.toString());
        console.log(fileEntry.name);
        // fileEntry.fullPath == '/someFile.txt'
        // writeFile(fileEntry, null);

    }, function (e) {
        console.log(e.target);
    });
}
*/
function armazena(file) {
    console.log(file);
/*    window.resolveLocalFileSystemURI(cordova.file.applicationDirectory, resolveSuccess, function (e) {
        console.log(e.target);
    });*/
}

function respostaCerta(my) {
    var newCor = document.styleSheets[1]["cssRules"][0]["style"].getPropertyValue('--corFonteQuizV');    
    var img = document.createElement('img');
    // var audio = document.createElement('audio');
    img.src="../files/img/correct.png";
    img.className='img-responsive';
    img.id='correct';
    img.style.width='10%';
    /*audio.autoplay=true;
    audio.src='../files/sounds/quiz/correct.wav';*/
    my.parentNode.style.background=newCor;
    my.parentNode.parentNode.appendChild(img);
    // my.parentNode.parentNode.insertAdjacentElement('beforebegin',audio);
}

function respostaErrada(my) {
    var newCor = document.styleSheets[1]["cssRules"][0]["style"].getPropertyValue('--corFonteQuizE');    
    my.parentNode.style.background=newCor;
    var img = document.createElement('img');
    img.src="../files/img/incorrect.png";
    img.className='img-responsive';
    img.id='incorrect';
    img.style.width='10%';
    my.parentNode.parentNode.appendChild(img);
    
}

function alteraNextButton(){
    var pai = document.getElementById('next-btn').parentNode;
    var filho = document.getElementById('next-btn');
    var cls = document.getElementById('next-btn').className;
    var newFilho = document.createElement('p');
    var newCor = document.styleSheets[1]["cssRules"][0]["style"].getPropertyValue('--corFonteQuizV');
    if (document.getElementById('next-btn').innerText == 'CONFIRMAR') {
        newFilho.innerText='PRÓXIMA';
        newFilho.id='next-btn';
        newFilho.className= cls;
        newFilho.cursor='pointer';
        newFilho.style.color = newCor;
        newFilho.style.cursor='pointer';
        newFilho.addEventListener("click", prox);
    }else if(document.getElementById('next-btn').innerText == 'PRÓXIMA'){
        newFilho.innerText = 'CONFIRMAR';
        newFilho.id='next-btn';
        newFilho.className= cls;
    }
    pai.removeChild(filho);
    pai.appendChild(newFilho);
}

function EcertoAlt(){
    if (questionMy.innerText[0].toLowerCase() == myQuestions[currentQuestion].resposta) {
        bonus+=1;
        definePontuacao();
        pontuacao();
        alteraBarra(queBarraSou(),qualBarraPBonus());
        respostaCerta(questionMy);
    }else{
        bonus=0;
        alteraBarra(queBarraSou(),qualBarraPBonus());
        respostaErrada(questionMy);
        respostaCerta(eCerta());
    }
    revisao =0;
    alteraNextButton();
}

function podeButton(){
    var newCor = document.styleSheets[1]["cssRules"][0]["style"].getPropertyValue('--corFonteQuizV');
    if (document.getElementById('next-btn').style.getPropertyValue('--corFonteQuizConfDes') != newCor) {
        document.getElementById('next-btn').style.setProperty('--corFonteQuizConfDes',newCor);
        document.getElementById('next-btn').style.cursor='pointer';
        document.getElementById('next-btn').addEventListener('click',prox);
    }
}

function progress() {
    document.getElementById('progress').innerText='Pergunta'+myQuestions.length+' / '+(currentQuestion+1);
}

function alteraBarra(barraA, barraN){
    var t= document.getElementById('barra'+barraA).src;
    var tn=t.length;
    var pai = document.getElementById('barra'+barraA).parentNode;
    var img = document.createElement('img');
    img.className='img-responsive';
    pai.removeChild(document.getElementById('barra'+barraA));
    img.src= '../files/img/bar_'+(!barraN ? '':barraN )+'.png';
    img.id='barra'+barraN;
    img.style.width='80%';
    pai.appendChild(img);
}

function prox() {
    if (document.getElementById('next-btn').innerText == 'CONFIRMAR') {
        EcertoAlt();
    }else if (document.getElementById('next-btn').innerText == 'PRÓXIMA') {
        if (currentQuestion == (myQuestions.length-1)) {
            Nextpremio();
        }else{
            retiraVisuResposta();
            currentQuestion=currentQuestion+1;
            loadQuesition(currentQuestion);
            progress();
            alteraNextButton();
        }
    }
}
function clickAlt(button) {
    console.log(button.innerText);
    console.log(document.getElementById('next-btn').innerText + ' == ' + 'CONFIRMAR');
    if (document.getElementById('next-btn').innerText == 'CONFIRMAR') {
        questionMy=button;
        podeButton();
    }
}

function addEventAlter() {
    opt1.parentNode.addEventListener('click',clickAlt.bind(null,opt1),true);
    opt2.parentNode.addEventListener('click',clickAlt.bind(null,opt2),true);
    opt3.parentNode.addEventListener('click',clickAlt.bind(null,opt3),true);
    opt4.parentNode.addEventListener('click',clickAlt.bind(null,opt4),true);
}

function  Nextpremio(){
    qualQuestion();
    window.localStorage.setItem('anterior',JSON.stringify(realizada));
    console.log(window.localStorage.getItem('anterior'));
    window.localStorage.setItem("qrcodeInput", "premio");
    window.localStorage.setItem("config", "app");
    try{
        armazena('../files/config/history.json');
    } catch (e) {
        console.log(e);
    }
    changePage("view.html");
}

ready = function(){
    temQuestions(context);
    if (Quiz) {
        container = document.getElementById('quizContainer');
        questionEl = document.getElementById('question');
        opt1 = document.getElementById('opt1');
        opt2 = document.getElementById('opt2');
        opt3 = document.getElementById('opt3');
        opt4 = document.getElementById('opt4');
        nextBtn = document.getElementById('next-btn');
        progress();
        loadQuesition(currentQuestion);
        addEventAlter();
        pontuacao();
        alteraBarra(queBarraSou(),qualBarraPBonus());
       $("#foot").click(function(){ 
            revisao=revisao+1;
            qualQuestion();
            window.localStorage.setItem('anterior',JSON.stringify(realizada));
            console.log(window.localStorage.getItem('anterior'));
            window.localStorage.setItem("qrcodeInput", myQuestions[currentQuestion].nomeAnimal);
            window.localStorage.setItem("config", "obj");
            try{
                armazena('../files/config/history.json');
            } catch (e) {
                console.log(e);
            }
            changePage("view.html");
        });
    }
}


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