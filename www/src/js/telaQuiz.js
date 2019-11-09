class TelaQuiz{
	currentQuestion
	score
	totalRevisao
	revisao
	acerto
	bonus
	bonusTotal
	realizada
	myQuestions
	questionMy
	alter
	static jdata
	static instancia
	

	constructor(){
		this.currentQuestion = 0
		this.score = 0
		this.totalRevisao=0
		this.revisao=0
		this.acerto=0
		this.bonus = 0
		this.bonusTotal=0
	}

	getInstance(){
		if (!Tela.instancia) {
			TelaQuiz.instancia =  new TelaQuiz()
			console.log(JSON.stringify(TelaQuiz.instancia))
			return TelaQuiz.instancia
		}else{
			return TelaQuiz.instancia
		}
	}
	
	updateElementInTela(){
		console.log("UpdateElementInTela")
    }
	async confirmaQuiz(){
		this.getLocalStorageQuiz()
		if (this.jdata) {
            if (app.context[0].data === jdata.data && jdata.nome == "premio") {
                window.localStorage.setItem("qrcodeInput", "premio")
            }
		}
        
    }
    getLocalStorageQuiz(){
        let data = localStorage.getItem('quiz');
        if(data){
            this.jdata = JSON.parse(data);
        }
    }
	onDeviceReady(){
	    this.myQuestions =app.context[0].questions;
	    this.vaiRetornar();
	    this.progress();
	    this.loadQuesition(this.currentQuestion);
	    this.addEventAlter();
	    this.pontuacao();
	    this.alteraBarra(this.queBarraSou(),this.qualBarraPBonus());
	    $("#foot").click(function(){
	        if (document.getElementById('next-btn').innerText == 'CONFIRMAR') {
	            TelaQuiz.totalRevisao=TelaQuiz.totalRevisao+1;
	            TelaQuiz.revisao=TelaQuiz.revisao+1;
	            TelaQuiz.vamosPreparaPPasseio("quiz","revisao", TelaQuiz.currentQuestion);
	            window.localStorage.setItem('anterior',JSON.stringify(TelaQuiz.realizada));
	            window.localStorage.setItem("qrcodeInput", TelaQuiz.myQuestions[TelaQuiz.currentQuestion].keyAnimal);
	            window.localStorage.setItem("config", "obj");
	            app.gerente();
	        }
	    });
	}

	addEventAlter() {
	    document.getElementById('opt1').parentNode.addEventListener('click', this.clickAlt,true);
	    document.getElementById('opt2').parentNode.addEventListener('click', this.clickAlt,true);
	    document.getElementById('opt3').parentNode.addEventListener('click', this.clickAlt,true);
	    document.getElementById('opt4').parentNode.addEventListener('click', this.clickAlt,true);
	}

	vaiRetornar() {
	    if(this.preparaRetorno()){
	        this.setVariaveis();
	        if (app.context[0].data == this.jdata.data && this.jdata.vou =="revisao") {
	            this.vamosPreparaPPasseio("quiz","quiz", this.currentQuestion);
	            window.localStorage.setItem('quiz',JSON.stringify(realizada));
	            this.questionMy = document.getElementById(this.jdata.aResposta);
	            if (this.questionMy != null) {
	                this.clickAlt(this.questionMy);
	            }
	        }else if (app.context[0].data == this.jdata.data && this.jdata.vou == "premio"){
	            this.Nextpremio(TelaQuiz.instancia);
	        }
	    }
	}

	preparaRetorno() {
		this.getLocalStorageQuiz()
	    if(this.jdata){
	        if (app.context[0].data === jdata.data) {
	            return true;
	        }else{
	            return false;
	        }
	    }else{
	       return false;
	    }
	}

	setVariaveis() {
	    this.currentQuestion = this.jdata.pergunta.indice;
	    this.realizada=this.jdata;
	    this.score = this.jdata.pontos;
	    this.acerto = this.jdata.acerto;
	    this.bonus = this.jdata.sequencia;
	    this.totalRevisao = this.jdata.totalR;
	    this.revisao= this.jdata.revisao;
	}

	vamosPreparaPPasseio(key, go,indice){
	    this.realizadaQ = {'nome' : this.myQuestions[indice].keyAnimal, 'indice': indice}
	    this.realizada = {
	        "nome": key,
	        "vou": go,
	        "data": app.context[0].data,
	        "pergunta" : this.realizadaQ,
	        "tamanho": this.myQuestions.length,
	        "pontos": this.score,
	        "totalR": this.totalRevisao,
	        "revisao" : this.revisao,
	        "acerto": this.acerto,
	        "sequencia": this.bonus,
	        "aResposta": (this.questionMy ? this.questionMy.id : null)
	    }
	}

	clickAlt(event) {
	    if (document.getElementById('next-btn').innerText == 'CONFIRMAR') {
	        TelaQuiz.instancia.questionMy = event.target
	        TelaQuiz.prototype.podeButton()
	    }
	}
	
	podeButton(){
	  	let newCor = document.styleSheets[2]["cssRules"][0]["style"].getPropertyValue('--corFonteQuizV');
	    if (document.getElementById('next-btn').style.getPropertyValue('--corFonteQuizConfDes') != newCor) {
	        document.getElementById('next-btn').style.setProperty('--corFonteQuizConfDes', newCor);
	        document.getElementById('next-btn').style.cursor='pointer';
	        document.getElementById('next-btn').addEventListener('click', this.prox);
	    }
	}
	
	prox() {
	    if (document.getElementById('next-btn').innerText == 'CONFIRMAR') {
	        TelaQuiz.prototype.EcertoAlt(TelaQuiz.instancia);
	    }else if (document.getElementById('next-btn').innerText == 'PRÓXIMA' || document.getElementById('next-btn').innerText == 'CONCLUIR') {
	        if (TelaQuiz.prototype.currentQuestion == (TelaQuiz.prototype.myQuestions.length)) {
	            TelaQuiz.prototype.Nextpremio(TelaQuiz.instancia);
	        }else{
	            TelaQuiz.prototype.retiraVisuResposta();
	            TelaQuiz.prototype.loadQuesition(TelaQuiz.prototype.currentQuestion);
	            TelaQuiz.prototype.progress();
	            TelaQuiz.prototype.alteraNextButton();
	        }
	    }
	}
	
	EcertoAlt(telaQuiz){
		if (telaQuiz.questionMy.innerText[0].toLowerCase() == telaQuiz.myQuestions[telaQuiz.currentQuestion].resposta) {
	        telaQuiz.bonus+=1;
	        telaQuiz.definePontuacao();
	        telaQuiz.pontuacao();
	        telaQuiz.alteraBarra(telaQuiz.queBarraSou(), telaQuiz.qualBarraPBonus());
	        telaQuiz.respostaCerta(telaQuiz.questionMy);
	        telaQuiz.insertAudio(telaQuiz.questionMy,'correct');
	    }else{
	        telaQuiz.bonus=0;
	        telaQuiz.alteraBarra(telaQuiz.queBarraSou(), telaQuiz.qualBarraPBonus());
	        telaQuiz.respostaErrada(telaQuiz.questionMy);
	        telaQuiz.alter=telaQuiz.eCerta();
	        telaQuiz.respostaCerta(telaQuiz.alter);
	        telaQuiz.insertAudio(telaQuiz.questionMy,'incorrect');
	    }
	    telaQuiz.retirarSeleciona();
	    telaQuiz.revisao =0;
	    telaQuiz.alteraNextButton();
	    telaQuiz.currentQuestion=telaQuiz.currentQuestion+1;
	    if (telaQuiz.currentQuestion < telaQuiz.myQuestions.length) {
	        telaQuiz.vamosPreparaPPasseio("quiz","quiz", telaQuiz.currentQuestion);
	        window.localStorage.setItem('quiz',JSON.stringify(telaQuiz.realizada));
	    }
	}

	definePontuacao(){
	    this.pontos=100;
	    if (this.revisao > 0){
	        while (this.pontos > 0 && this.revisao > 0){
	            this.pontos-=50;
	            this.revisao=this.revisao-1;
	        }
	    }
	    if (this.bonus >= 4){
	        this.pontos+=50;
	    }
	    this.score += this.pontos;
	    this.acerto += 1;
	}

	pontuacao(){
	    document.getElementById('qnAcertos').innerText=this.acerto;
	    document.getElementById('qnPontos').innerText=this.score;
	}

	alteraBarra(barraA, barraN){
	    let pai = document.getElementById('barra'+barraA).parentNode;
	    let img = document.createElement('img');
	    img.className='img-fluid';
	    pai.removeChild(document.getElementById('barra'+barraA));
	    img.src= '/files/img/bar_'+(!barraN ? ''+'.png':(barraN==4 ? barraN +'.gif': barraN+'.png'));
	    img.id='barra'+barraN;
	    pai.appendChild(img);
	}

	queBarraSou() {
	    return document.getElementsByClassName('thumbnail')[0].children[0].id.substr(-1);   
	}

	qualBarraPBonus() {
	    if (this.bonus <=3) {
	        return this.bonus;
	    }else{
	        return 4;
	    }
	}

	respostaCerta(my) {
	    let newCor = document.styleSheets[2]["cssRules"][0]["style"].getPropertyValue('--corFonteQuizV');    
	    let img = document.createElement('img');
	    let divP= document.createElement('div');
	    let divf = document.createElement("div");
	    divP.className = "col-1 m-0 p-0 mb-2 align-self-center";
	    divf.className="thumbnail text-center";
	    img.src="/files/img/correct.png";
	    img.className='img-fluid';
	    img.id='correct';
	    let valor = my.parentNode.parentNode.offsetHeight*70/100;
	    img.style.maxHeight= valor+"px";
	    my.parentNode.className="opt media-body m-0";
	    my.parentNode.style.background=newCor;
	    divf.appendChild(img);
	    divP.appendChild(divf);
	    my.parentNode.parentNode.className="col-10 mb-4";
	    my.parentNode.parentNode.parentNode.className="media";
	    my.parentNode.parentNode.parentNode.insertAdjacentElement("afterbegin",divP);
	}

	insertAudio(my, qual){
	    let audio = document.createElement('audio');
	    audio.autoplay=true;
	    audio.src='/files/sounds/quiz/'+qual+'.ogg';
	    audio.id=qual+"Audio";
	    audio.style.display="none";
	    my.parentNode.parentNode.parentNode.insertAdjacentElement('afterbegin',audio);
	}

	respostaErrada(my) {
	    let newCor = document.styleSheets[2]["cssRules"][0]["style"].getPropertyValue('--corFonteQuizE');    
	    my.parentNode.style.background=newCor;
	    let img = document.createElement('img');
	    let divP= document.createElement('div');
	    let divf = document.createElement("div");
	    divP.className = "col-1 m-0 p-0 mb-3 align-self-center";
	    divf.className="thumbnail text-center";
	    img.className='img-fluid';
	    img.src="/files/img/incorrect.png";
	    img.id='incorrect';
	    let valor=my.parentNode.parentNode.offsetHeight*70/100
	    img.style.maxHeight=valor+"px";
	    my.parentNode.className="opt media-body m-0";
	    divf.appendChild(img);
	    divP.appendChild(divf);
	    my.parentNode.parentNode.className="col-10 mb-4";
	    my.parentNode.parentNode.parentNode.className="media";
	    my.parentNode.parentNode.parentNode.insertAdjacentElement("afterbegin",divP);
	}

	eCerta() {
	    if (document.getElementById("opt1").innerText[0].toLowerCase() == myQuestions[currentQuestion].resposta) {
	        return document.getElementById("opt1");
	    }else if (document.getElementById("opt2").innerText[0].toLowerCase() == myQuestions[currentQuestion].resposta) {
	        return document.getElementById("opt2");
	    }else if (document.getElementById("opt3").innerText[0].toLowerCase() == myQuestions[currentQuestion].resposta) {
	        return document.getElementById("opt3");
	    }else if (document.getElementById("opt4").innerText[0].toLowerCase() == myQuestions[currentQuestion].resposta) {
	        return document.getElementById("opt4");
	    }
	}

	retirarSeleciona(){
	    $(".opt").each(function(){  
	        $(this).removeClass("opt");
	        $(this).addClass("optNSelect");
	    });
	}

	alteraNextButton(){
	    let pai = document.getElementById('next-btn').parentNode;
	    let filho = document.getElementById('next-btn');
	    let cls = document.getElementById('next-btn').className;
	    let newFilho = document.createElement('span');
	    let newCor = document.styleSheets[1]["cssRules"][0]["style"].getPropertyValue('--corFonteQuizV');
	    if (document.getElementById('next-btn').innerText == 'CONFIRMAR') {
	        if(this.currentQuestion == (this.myQuestions.length-1)){
	            newFilho.innerText='CONCLUIR';
	        }else{
	            newFilho.innerText='PRÓXIMA';
	        }
	        newFilho.id='next-btn';
	        newFilho.className= cls;
	        newFilho.cursor='pointer';
	        newFilho.style.color = newCor;
	        newFilho.style.cursor='pointer';
	        newFilho.addEventListener("click", this.prox);
	    }else if(document.getElementById('next-btn').innerText == 'PRÓXIMA'){
	        newFilho.innerText = 'CONFIRMAR';
	        newFilho.id='next-btn';
	        newFilho.className= cls;
	    }
	    pai.removeChild(filho);
	    pai.appendChild(newFilho);
	}

	Nextpremio(telaQuiz){
	    telaQuiz.vamosPreparaPPasseio("premio","premio",telaQuiz.currentQuestion-1);
	    window.localStorage.setItem('quiz',JSON.stringify(telaQuiz.realizada));
	    window.localStorage.setItem("qrcodeInput", "premio");
	    window.localStorage.setItem("config", "quiz");
	    app.gerente()
	}

	retiraVisuResposta(){
	    let img1 = document.getElementById('correct');
	    let img2 = document.getElementById('incorrect');
	    let pai1;
	    let pai2;
	    let audio;
	    this.questionMy.parentNode.parentNode.className="col-10 offset-1 mb-4";
	    this.questionMy.parentNode.style.background='';
	    this.questionMy.parentNode.className="opt m-0";
	    if (img2) {
	        this.alter.parentNode.style.background='';
	        this.alter.parentNode.parentNode.className="col-10 offset-1 mb-4";
	        this.alter.parentNode.className="opt m-0";
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
	    this.colocarSeleciona();
	    this.questionMy=null;
	    this.alter=null
	}

	colocarSeleciona(){
	    $(".optNSelect").each(function(){  
	        $(this).removeClass("optNSelect");
	        $(this).addClass("opt");
	    });
	}

	loadQuesition(qIndex) {
	    let q = this.myQuestions[qIndex];
	    document.getElementById('question').children[0].innerText = q.texto;
	    document.getElementById("opt1").innerText = Object.keys(q.alternativas[0])[0].toUpperCase()+') '+Object.values(q.alternativas[0])[0];
	    document.getElementById("opt2").innerText = Object.keys(q.alternativas[1])[0].toUpperCase()+') '+Object.values(q.alternativas[1])[0];
	    document.getElementById("opt3").innerText = Object.keys(q.alternativas[2])[0].toUpperCase()+') '+Object.values(q.alternativas[2])[0];
	    document.getElementById("opt4").innerText = Object.keys(q.alternativas[3])[0].toUpperCase()+') '+Object.values(q.alternativas[3])[0];
	}

	progress() {
	    document.getElementById('progress').innerText='Pergunta '+(this.currentQuestion+1)+' / '+(this.myQuestions.length);
	}


};