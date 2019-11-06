var currentQuestion = 0;
var score = 0;
var totalRevisao=0;
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
var premiacao;
var myQuestions;
var Quiz;
var questionMy;
var jdata;
var alter;
function preparaRetorno() {
    var data = localStorage.getItem('anterior');
    if(data){
        jdata = JSON.parse(data);
            console.log(jdata);
            if (context[0].data === jdata.data) {
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
}
function setVariaveis() {
    currentQuestion = jdata.pergunta.indice;
    realizada=jdata;
    score = jdata.pontos;
    acerto = jdata.acerto;
    bonus = jdata.sequencia;
    totalRevisao = jdata.totalR;
    revisao= jdata.revisao;
    return;
}
function vaiRetornar() {
    if(preparaRetorno()){
        setVariaveis();
        if (context[0].data == jdata.data && jdata.vou =="revisao") {
            vamosPreparaPPasseio("quiz","quiz",currentQuestion);
            window.localStorage.setItem('anterior',JSON.stringify(realizada));
            questionMy = document.getElementById(jdata.aResposta);
            if (questionMy != null) {
                clickAlt(questionMy);
            }
        }else if (context[0].data == jdata.data && jdata.vou == "premio"){
            Nextpremio();
        }
    }
}

function vamosPreparaPPasseio(key, go,indice){
    realizadaQ = {'nome' : myQuestions[indice].keyAnimal, 'indice': indice};
    realizada = {
        "nome": key,
        "vou": go,
        "data": context[0].data,
        "pergunta" : realizadaQ,
        "tamanho": myQuestions.length,
        "pontos":score,
        "totalR": totalRevisao,
        "revisao" : revisao,
        "acerto": acerto,
        "sequencia": bonus,
        "aResposta": (questionMy ? questionMy.id : null)
    };
    return;
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
    var img1 = document.getElementById('correct');
    var img2 = document.getElementById('incorrect');
    var pai1;
    var pai2;
    var audio;
    questionMy.parentNode.parentNode.className="col-10 offset-1 mb-4";
    questionMy.parentNode.style.background='';
    questionMy.parentNode.className="opt m-0";
    if (img2) {
        alter.parentNode.style.background='';
        alter.parentNode.parentNode.className="col-10 offset-1 mb-4";
        alter.parentNode.className="opt m-0";
        pai1 = img1.parentNode.parentNode.parentNode;
        pai2 = img2.parentNode.parentNode.parentNode;
        pai2.className="";
        pai1.className="";
        audio  = document.getElementById('incorrectAudio');
        pai1.removeChild(img1.parentNode.parentNode);
        pai2.removeChild(img2.parentNode.parentNode);
        pai2.removeChild(audio);
    }else{
        pai1 = img1.parentNode.parentNode.parentNode;
        pai1.className="";
        audio  = document.getElementById('correctAudio');
        pai1.removeChild(img1.parentNode.parentNode);
        pai1.removeChild(audio);
    }
    colocarSeleciona();
    questionMy=null;
    alter=null
}
function loadQuesition(qIndex) {
    console.log(qIndex);
    var q = myQuestions[qIndex];
    questionEl.innerText = q.texto;
    opt1.innerText = Object.keys(q.alternativas[0])[0].toUpperCase()+') '+Object.values(q.alternativas[0])[0];
    opt2.innerText = Object.keys(q.alternativas[1])[0].toUpperCase()+') '+Object.values(q.alternativas[1])[0];
    opt3.innerText = Object.keys(q.alternativas[2])[0].toUpperCase()+') '+Object.values(q.alternativas[2])[0];
    opt4.innerText = Object.keys(q.alternativas[3])[0].toUpperCase()+') '+Object.values(q.alternativas[3])[0];
}
function eCerta() {
    if (opt1.innerText[0].toLowerCase() == myQuestions[currentQuestion].resposta) {
        return document.getElementById("opt1");
    }else if (opt2.innerText[0].toLowerCase() == myQuestions[currentQuestion].resposta) {
        return document.getElementById("opt2");
    }else if (opt3.innerText[0].toLowerCase() == myQuestions[currentQuestion].resposta) {
        return document.getElementById("opt3");
    }else if (opt4.innerText[0].toLowerCase() == myQuestions[currentQuestion].resposta) {
        return document.getElementById("opt4");
    }
}

function insertAudio(my, qual){
    var audio = document.createElement('audio');
    audio.autoplay=true;
    audio.src='../files/sounds/quiz/'+qual+'.ogg';
    audio.id=qual+"Audio";
    audio.style.display="none";
    my.parentNode.parentNode.parentNode.insertAdjacentElement('afterbegin',audio);
}
function respostaCerta(my) {
    var newCor = document.styleSheets[1]["cssRules"][0]["style"].getPropertyValue('--corFonteQuizV');    
    var img = document.createElement('img');
    var divP= document.createElement('div');
    var divf = document.createElement("div");
    divP.className = "col-1 m-0 p-0 mb-2 align-self-center";
    divf.className="thumbnail text-center";
    img.src="../files/img/correct.png";
    img.className='img-fluid';
    img.id='correct';
    valor = my.parentNode.parentNode.offsetHeight*70/100;
    img.style.maxHeight=valor+"px";
    my.parentNode.className="opt media-body m-0";
    my.parentNode.style.background=newCor;
    divf.appendChild(img);
    divP.appendChild(divf);
    my.parentNode.parentNode.className="col-10 mb-4";
    my.parentNode.parentNode.parentNode.className="media";
    my.parentNode.parentNode.parentNode.insertAdjacentElement("afterbegin",divP);
    
}

function respostaErrada(my) {
    var newCor = document.styleSheets[1]["cssRules"][0]["style"].getPropertyValue('--corFonteQuizE');    
    my.parentNode.style.background=newCor;
    var img = document.createElement('img');
    var divP= document.createElement('div');
    var divf = document.createElement("div");
    divP.className = "col-1 m-0 p-0 mb-3 align-self-center";
    divf.className="thumbnail text-center";
    img.className='img-fluid';
    img.src="../files/img/incorrect.png";
    img.id='incorrect';
    valor=my.parentNode.parentNode.offsetHeight*70/100
    img.style.maxHeight=valor+"px";
    my.parentNode.className="opt media-body m-0";
    divf.appendChild(img);
    divP.appendChild(divf);
    my.parentNode.parentNode.className="col-10 mb-4";
    my.parentNode.parentNode.parentNode.className="media";
    my.parentNode.parentNode.parentNode.insertAdjacentElement("afterbegin",divP);
}

function alteraNextButton(){
    var pai = document.getElementById('next-btn').parentNode;
    var filho = document.getElementById('next-btn');
    var cls = document.getElementById('next-btn').className;
    var newFilho = document.createElement('span');
    var newCor = document.styleSheets[1]["cssRules"][0]["style"].getPropertyValue('--corFonteQuizV');
    if (document.getElementById('next-btn').innerText == 'CONFIRMAR') {
        if(currentQuestion == (myQuestions.length-1)){
            newFilho.innerText='CONCLUIR';
        }else{
            newFilho.innerText='PRÓXIMA';
        }
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

function retirarSeleciona(){
    $(".opt").each(function(){  
        $(this).removeClass("opt");
        $(this).addClass("optNSelect");
    });
}
function colocarSeleciona(){
    $(".optNSelect").each(function(){  
        $(this).removeClass("optNSelect");
        $(this).addClass("opt");
    });
}
function EcertoAlt(){
    if (questionMy.innerText[0].toLowerCase() == myQuestions[currentQuestion].resposta) {
        bonus+=1;
        definePontuacao();
        pontuacao();
        alteraBarra(queBarraSou(),qualBarraPBonus());
        respostaCerta(questionMy);
        insertAudio(questionMy,'correct');
    }else{
        bonus=0;
        alteraBarra(queBarraSou(),qualBarraPBonus());
        respostaErrada(questionMy);
        alter=eCerta();
        respostaCerta(alter);
        insertAudio(questionMy,'incorrect');
    }
    retirarSeleciona();
    revisao =0;
    alteraNextButton();
    currentQuestion=currentQuestion+1;
    if (currentQuestion < myQuestions.length) {
        vamosPreparaPPasseio("quiz","quiz", currentQuestion);
        window.localStorage.setItem('anterior',JSON.stringify(realizada));
    }
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
    document.getElementById('progress').innerText='Pergunta '+(currentQuestion+1)+' / '+(myQuestions.length);
}

function alteraBarra(barraA, barraN){
    var t= document.getElementById('barra'+barraA).src;
    var tn=t.length;
    var pai = document.getElementById('barra'+barraA).parentNode;
    var img = document.createElement('img');
    img.className='img-fluid';
    pai.removeChild(document.getElementById('barra'+barraA));
    img.src= '../files/img/bar_'+(!barraN ? ''+'.png':(barraN==4 ? barraN +'.gif': barraN+'.png'));
    img.id='barra'+barraN;
    pai.appendChild(img);
}

function prox() {
    if (document.getElementById('next-btn').innerText == 'CONFIRMAR') {
        EcertoAlt();
    }else if (document.getElementById('next-btn').innerText == 'PRÓXIMA' || document.getElementById('next-btn').innerText == 'CONCLUIR') {
        if (currentQuestion == (myQuestions.length)) {
            Nextpremio();
        }else{
            retiraVisuResposta();
            loadQuesition(currentQuestion);
            progress();
            alteraNextButton();
        }
    }
}
function clickAlt(button) {
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
    vamosPreparaPPasseio("premio","premio",currentQuestion-1);
    window.localStorage.setItem('anterior',JSON.stringify(realizada));
    window.localStorage.setItem("qrcodeInput", "premio");
    window.localStorage.setItem("config", "app");
    changePage("view.html");
}


ready = function(){
    myQuestions =context[0].questions;
    vaiRetornar();
        container = document.getElementById('quizContainer');
        questionEl = document.getElementById('question').children[0];
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
            if (document.getElementById('next-btn').innerText == 'CONFIRMAR') {
                totalRevisao=totalRevisao+1;
                revisao=revisao+1;
                vamosPreparaPPasseio("quiz","revisao",currentQuestion);
                window.localStorage.setItem('anterior',JSON.stringify(realizada));
                window.localStorage.setItem("qrcodeInput", myQuestions[currentQuestion].keyAnimal);
                window.localStorage.setItem("config", "obj");
                changePage("view.html");
            }
        });
}

function defineMedalha() {
    preparaRetorno();
    setVariaveis();
    var resultado = (score*100)/(((jdata.tamanho - 3) * 150) + (3 * 100));
    var result;
    if (resultado == 100) {
        result = "trofeu";
    }else if (resultado < 100 && resultado >= 64.4) {
        result = "ouro";
    }else if (resultado < 64.4 && resultado >= 28.8) {
        result = "prata";
    }else if (resultado < 28.8) {
        result = "bronze";
    }
    var premio = {"premio" : result, "pontos" : score, "acertos" : acerto, "bonus" : bonus, "revisao" : totalRevisao};
    console.log(resultado);
    return premio;
}