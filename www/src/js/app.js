

var app = {
    historico_sessao:[],
    context: {},
    error:false,
    fileAtualizacao:{},
    fileatualizado:[],
    dirEntry:{},
    dirRoot:{},
    telaAppAtual:{},
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    startInit(){
        return $("#invisible").load("views/templates.html", app.gerente)
    },
    startModalAtualizacao(){
        $('#mensagemlLabel').text("Baixando recursos")

        $('#mensagem').modal('show')
    },
    async gerente(){
        let context
        if (window.localStorage.getItem("config") && window.localStorage.getItem("config") != "inicial") {
            let path = window.localStorage.getItem("config") == 'app' || !app.dirEntry ? '/files/config/' : app.dirEntry.toURL()
            // context =  app.getFileRead(app.dirEntry, window.localStorage.getItem("config")+".json", app.readFile)
             app.telaAppAtual.info =  File.readFile(path+window.localStorage.getItem("config")+".json", File.prototype.selectContext)
        }else{
            window.localStorage.setItem("config", "inicial")
            app.telaAppAtual.info = {"idtemplate": "inicial"};
        }
        console.log(app.telaAppAtual.info)
        app.changePage(app.telaAppAtual.info)
        await app.defineTelaAtual()
        app.callOnDeviceReadyTela()
        app.onMenu()
        app.getEstilo()
        app.historico_sessao.push({
            "config": window.localStorage.getItem("config"),
            "qrcodeInput": window.localStorage.getItem("qrcodeInput")
        })
    },
    changePage(ctxt){
        let template = $("#"+ctxt.idtemplate).html();
        let compiledTemplate = Template7.compile(template);
        // ctxt= alterar(ctxt);
        let html = compiledTemplate(ctxt);
        document.getElementById("visible").innerHTML=html;
    },
    callOnDeviceReadyTela(){
        if (app.telaAppAtual.tela.onDeviceReady) {
            app.telaAppAtual.tela.onDeviceReady();
        }
    },
    defineTelaAtual(){
        if (window.localStorage.getItem("config") == 'inicial'){
            app.telaAppAtual.tela= TelaInicial.prototype.getInstance();
        }else if (window.localStorage.getItem("config") == 'app'){
            // app.telaAppAtual.tela = TelaSobre.prototype.getInstance()    
            app.telaAppAtual.tela= Tela.prototype.getInstance();
        }else if(window.localStorage.getItem("config") == "quiz"){
            app.telaAppAtual.tela = TelaQuiz.prototype.getInstance()
        }else if (window.localStorage.getItem("config") == "obj"){
            app.telaAppAtual.tela = TelaAnimal.prototype.getInstance() //procurar como encontrar um objeto dentro de um array 
        }else if(window.localStorage.getItem("config") == 'error'){
            app.telaAppAtual.tela= Tela.prototype.getInstance();
        }
    },
    callUpdateElementInTela(){
        if (app.telaAppAtual.tela.updateElementInTela) {
            app.telaAppAtual.tela.updateElementInTela();
        }
    },
    async onDeviceReady() {
        await this.verificaDadosServidor()
        this.receivedEvent('deviceready');
        document.addEventListener("pause", this.estadoAtual,false);
        document.addEventListener("backbutton", this.anterior,false);
    },
    async verificaDadosServidor(){
        let file = 'https://datamuzoopan.herokuapp.com/controller/controller.php?key='+window.localStorage.getItem("key")
        let t = await app.getDadosServidor(file)
        console.log(t)
        if (app.fileAtualizacao.status == "desatualizado") {
            app.setDados()
        }else{
            File.prototype.getDir("fill/config", true, function(dirEntry){return app.closeModalAtualizacao()}, File.prototype.fail)
        }
    },
    setDirEntry(dirEntry){
        app.dirEntry=dirEntry
        console.log(app.dirEntry)
    },
    setDados(event){
        File.prototype.getDir("fill/config", true, app.getFileWrite, File.prototype.fail)
    },
    getDadosArq(){
        File.prototype.getDir("fill/config", true, app.getFileRead, File.prototype.fail)
    },
    getFileWrite(dirEntry){
        name = app.fileatualizado.shift()
        File.prototype.getFile(dirEntry, name, true, app.writeFile, File.prototype.fail)
    },
    getFileRead(dirEntry, name = 'obj.json',sucessFunction = app.readFile){
        File.prototype.getFile(dirEntry, name, true, sucessFunction, File.prototype.fail)
    },
    async writeFile(fileEntry, name){
        name = name.split(".json")[0]
        return File.prototype.writeFile(fileEntry, app.fileAtualizacao[name], app.gerenteWrite)
    },
    readFile(fileEntry){
        File.prototype.readFile(fileEntry, app.setFileInVar)
    },
    setFileInVar(result){
        console.log(result)
    },
    gerenteWrite(){
        if (app.fileatualizado.length > 0) {
            app.setDados()
        }else{
            app.closeModalAtualizacao()
            app.setStorageKey()
        }
    },
    closeModalAtualizacao(){
        $('#mensagem').modal('hide')
    },
    async getDadosServidor(file){
        let dados
        await $.get(file, function(data){
            dados=data
        })
        app.fileAtualizacao=JSON.parse(dados)
        app.fileatualizado = app.fileAtualizacao.listUpdate
        return JSON.parse(dados)
    },
    setStorageKey(){
        if (app.fileAtualizacao.status == 'desatualizado') {
           window.localStorage.setItem("key", app.fileAtualizacao.key) 
        }
    },
    onMenu() {
        document.getElementById("myCanvasNav").addEventListener("click", app.buttonMenuClose);
        document.getElementById('estilo').addEventListener("click", app.defineContraste);
        document.getElementById("volume").addEventListener("change", app.stateVolumeHsetD);
        document.getElementById('aumentaFonte').addEventListener("click", app.aumentaFonte);
        document.getElementById('diminuiFonte').addEventListener("click", app.diminuiFonte);
        document.getElementById('fonte').addEventListener("change", app.Fonte);
        //console
        document.getElementById("buttonMenu").addEventListener("click", app.sideBar);
        document.getElementById("buttonMenu").addEventListener("click", app.sideBar2);
        window.addEventListener("resize", app.setTamanhoFonte);
        
    },
    buttonMenuClose() {
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("mySidebar").style.display = "none";
        document.getElementById("myCanvasNav").style.width = "0";
        document.getElementById("myCanvasNav").style.opacity = "0"; 
    },
    defineContraste() {
        if (document.getElementById('estilo').checked) {
            window.localStorage.setItem("contraste", "on");
            app.setContraste();
            app.setContrasteNomeApp();
        }else{
            window.localStorage.setItem("contraste", "off");
            app.removeContraste();
            app.removeContrasteNomeApp();
        }

    },
    stateVolumeHsetD() {
        let valor =  document.getElementById("volume").value;
        if(valor > 0){
            if (window.localStorage.getItem("volume") != valor) {
                app.setVolumeDis(valor);
            }
        }
    },
    sucess(sucess) {
        console.log("sucesso ao alterar volume Music" + sucess);
    },
    setVolumeDis(valor) { 
        if (cordova.platformId == "android") {
            window.androidVolume.setMusic(valor, false, sucess, File.prototype.fail);
        }
    },
    aumentaFonte(){
        valor=parseInt(document.getElementById('fonte').value) + 1;
        window.localStorage.setItem("fonte", valor);
        app.setTamanhoFonte();
    },
    diminuiFonte(){
        valor=parseInt(document.getElementById('fonte').value) - 1;
        window.localStorage.setItem("fonte", valor);
        app.setTamanhoFonte();
    },
    Fonte() {
        window.localStorage.setItem("fonte", document.getElementById('fonte').value);
        app.setTamanhoFonte();
    },
    sideBar() {
        document.getElementById("myCanvasNav").style.width = "100%";
        document.getElementById("myCanvasNav").style.opacity = "0.8";
        try{
            app.setVolumeHtml();   
        }catch (e) {
            console.log(e);
        }
    },
    sideBar2() {
        document.getElementById("mySidebar").style.width = "60vw";
        document.getElementById("mySidebar").style.display = "block";
    },
    setTamanhoFonte() {
        minimo=10;
        maximo=app.setMaximo();
        tamanho=window.localStorage.getItem("fonte");
        if (tamanho >= minimo && tamanho <= maximo) {
            document.styleSheets[2]["cssRules"][0]["style"].setProperty('--tamanhoFonte', tamanho);  
            document.getElementById('fonte').value= tamanho;
        }else if (tamanho < minimo) {
            document.styleSheets[2]["cssRules"][0]["style"].setProperty('--tamanhoFonte', minimo);
            document.getElementById('fonte').value= minimo;
        }else if (tamanho > maximo) {
            document.styleSheets[2]["cssRules"][0]["style"].setProperty('--tamanhoFonte', maximo);  
            document.getElementById('fonte').value= maximo; 
        }
        app.callUpdateElementInTela()
        window.localStorage.setItem("fonte", document.getElementById('fonte').value);
    },
    setMaximo(){
        if (window.screen.availWidth < 576) {
            return 30;
        }else if(window.screen.availWidth < 768){
            return 50;
        }else if(window.screen.availWidth < 992){
            return 70;
        }else if(window.screen.availWidth < 1200){
            return 90;
        }else{
            return 100;
        }
    },
    setContraste() {
        document.styleSheets[2]["cssRules"][0]["style"].setProperty('--corFundo',document.styleSheets[2]["cssRules"][0]["style"].getPropertyValue('--corFundoCon'));
        document.styleSheets[2]["cssRules"][0]["style"].setProperty('--corFonteTitulo',document.styleSheets[2]["cssRules"][0]["style"].getPropertyValue('--corFonteTextContras'));
        document.styleSheets[2]["cssRules"][0]["style"].setProperty('--corFundoMenuOpcao',document.styleSheets[2]["cssRules"][0]["style"].getPropertyValue('--corFundoMenuCont'));
        document.styleSheets[2]["cssRules"][0]["style"].setProperty('--corFundoMenuCorpo',document.styleSheets[2]["cssRules"][0]["style"].getPropertyValue('none'));
        document.styleSheets[2]["cssRules"][0]["style"].setProperty('--corBarraMenu',document.styleSheets[2]["cssRules"][0]["style"].getPropertyValue('--corBarraMenuCon'));
        document.styleSheets[2]["cssRules"][0]["style"].setProperty('--corFonteTextoLidoMenuOpcao',document.styleSheets[2]["cssRules"][0]["style"].getPropertyValue('--corFonteMenuCont'));
        document.styleSheets[2]["cssRules"][0]["style"].setProperty('--corFonteTextoLidoMenuCorpo',document.styleSheets[2]["cssRules"][0]["style"].getPropertyValue('--corFonteTextContras'));
    },
    setContrasteNomeApp(){
        let img= document.getElementById("nomeApp")
        if (img) {
            document.getElementById("nomeApp").src="files/img/MuzoopanCont.png";
        }
    },
    removeContraste() {
        document.styleSheets[2]["cssRules"][0]["style"].setProperty('--corFundo',document.styleSheets[2]["cssRules"][0]["style"].getPropertyValue('--corFundoNormal'));
        document.styleSheets[2]["cssRules"][0]["style"].setProperty('--corFonteTitulo',document.styleSheets[2]["cssRules"][0]["style"].getPropertyValue('--corFonteTituloNormal'));
        document.styleSheets[2]["cssRules"][0]["style"].setProperty('--corFundoMenuOpcao',document.styleSheets[2]["cssRules"][0]["style"].getPropertyValue('--corFundoNavAnimal'));
        document.styleSheets[2]["cssRules"][0]["style"].setProperty('--corFundoMenuCorpo',document.styleSheets[2]["cssRules"][0]["style"].getPropertyValue('--corFundoNavAnimal'));
        document.styleSheets[2]["cssRules"][0]["style"].setProperty('--corBarraMenu',document.styleSheets[2]["cssRules"][0]["style"].getPropertyValue('--corFundoSelect'));
        document.styleSheets[2]["cssRules"][0]["style"].setProperty('--corFonteTextoLidoMenuOpcao',document.styleSheets[2]["cssRules"][0]["style"].getPropertyValue('--corFonteTituloNormal'));
        document.styleSheets[2]["cssRules"][0]["style"].setProperty('--corFonteTextoLidoMenuCorpo',document.styleSheets[2]["cssRules"][0]["style"].getPropertyValue('--corFonteTextoLido'));
    },
    removeContrasteNomeApp(){
        let img= document.getElementById("nomeApp")
        if (img) {
            document.getElementById("nomeApp").src="files/img/Muzoopan.png";    
        }
        
    },
    createImg(path){
        img = document.createElement("img")
            img.id="nomeApp"
            img.style.width="110%"
            img.src=path
            return img
    },
    getEstilo(){
        if (window.localStorage.getItem("contraste") == null) {
            console.log("foi")
            window.localStorage.setItem("contraste", "off");
        }
        if (window.localStorage.getItem("fonte") == null) {
            var tamanho = document.styleSheets[2]["cssRules"][0]["style"].getPropertyValue('--tamanhoFonte');
            window.localStorage.setItem("fonte", tamanho);
            console.log("foi")
        }
        if (window.localStorage.getItem("contraste") == "on") {
            document.getElementById('estilo').checked=true;
            app.setContraste();
            app.setContrasteNomeApp();
            
        }else if (window.localStorage.getItem("contraste") == "off") {
            app.removeContraste();
            app.removeContrasteNomeApp();
            document.getElementById('estilo').checked=false;
        }
        if (window.localStorage.getItem("fonte")) {
            console.log("foi2")   
            app.setTamanhoFonte();
        }
        try{
            app.setVolumeHtml();   
        }catch (e) {
            console.log(e);
        }
    },
    setVolumeHtml() {
        if (cordova.platformId == "android") {
                window.androidVolume.getMusic(function (sucess) {
                    console.log(' null volume localStorage');
                    document.getElementById("volume").value = sucess;
                }, File.prototype.fail);
        }
        
    },
    estadoAtual(){
        window.localStorage.removeItem("qrcodeInput");
        window.localStorage.removeItem("volume");
        window.localStorage.removeItem("config");
        window.localStorage.removeItem("dirEntry");
    },
    exit(){
        console.log("exit");
        app.setAppLocalStorage()
        window.localStorage.removeItem("qrcodeInput");
        window.localStorage.removeItem("volume");
        window.localStorage.removeItem("config")
        if (cordova.platformId != "browser") {
            navigator.app.exitApp();
        }

    },
    anterior(e) {
        //DO
        if (cordova.platformId != "browser") {
            e.preventDefault();
        }
        
        TelaQuiz.prototype.getLocalStorageQuiz()

        if (window.localStorage.getItem("config") == "quiz") {
            console.log("não pode jovem");
        }else if (window.localStorage.getItem("config") == "obj" && window.localStorage.getItem("anterior") && TelaQuiz.jdata.vou == "revisao"){
            console.log('vamos voltar da revisao, prob');
            var onde = JSON.parse(window.localStorage.getItem('anterior'));
            window.localStorage.setItem("qrcodeInput", onde.nome);
            window.localStorage.setItem("config", onde.nome);
            app.gerente();
        }else if (window.localStorage.getItem("config") != "inicial") {
            window.localStorage.removeItem("qrcodeInput");
            window.localStorage.removeItem("volume");
            window.localStorage.removeItem("config");
            console.log('vou ao index, bele');
            app.gerente();
            // window.location.href="../index.html";
        }else if (window.location.href.indexOf("index") != -1 && TelaInicial.camera){
            app.exit();
            // window.history.go(-1);
        }else if ( window.localStorage.getItem("config") == "app" && window.localStorage.getItem("qrcodeInput") == "premio"){
            app.exit();
        }
        TelaInicial.camera=true;
        app.telaAppAtual={}

    },
    receivedEvent(id) {
        
    }
};

app.initialize();

$("#invisible").ready(app.startInit)
$("#mensagem").ready(app.startModalAtualizacao)