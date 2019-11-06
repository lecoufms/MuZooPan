var app = {
    info_app: {},
    historico_sessao:[],
    camera: null,
    animal:null,
    dirFiles: {},
    dirConfig:{},
    dirImage:{},
    dirSounds:{},
    dirVideos:{},
    fileAtualizacao:{},
    initialize: function(dados) {
        app.camera=true
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    startInit(){
        return $("#invisible").load("views/templates.html", app.gerente)
    },
    startModalAtualizacao(){
        $('#mensagemlLabel').text("Baixando recursos")

        $('#mensagem').modal('show')
    },
    getInfoServidor(){

    },
    gerente(){
        var context
        if (window.localStorage.getItem("config") && window.localStorage.getItem("config") != "inicial") {
            context = File.readFile("files/config/"+window.localStorage.getItem("config")+".json")
            console.log(window.localStorage.getItem("config")); 
        }else{
            window.localStorage.setItem("config", "inicial")
            context = {"key": "inicial"};
        }
        console.log(context)
        app.changePage(context)
        app.onMenu()
        app.getEstilo()
        app.ready()
        app.historico_sessao.push({
            "config": window.localStorage.getItem("config"),
            "qrcodeInput": window.localStorage.getItem("qrcodeInput"),
            "anterior":{}
        })
    },
    changePage(ctxt){
        var template = $("#"+(window.localStorage.getItem("config")=="obj"? "obj":ctxt.key)).html();
        var compiledTemplate = Template7.compile(template);
        // ctxt= alterar(ctxt);
        let html = compiledTemplate(ctxt);
        document.getElementById("visible").innerHTML=html;
    },
    ready(){
        console.log("ready")
        
        if (window.localStorage.getItem("config") == 'app'){
                ;
        }else if(window.localStorage.getItem("config") == "quiz"){
                ;
        }else if (window.localStorage.getItem("config") == "obj"){
            app.animal= TelaAnimal.prototype.getInstance()
            app.animal.onDeviceReady();
            console.log(app.animal)
            // TelaAnimal.prototype.setKeysVisitaGuiada(window.localStorage.getItem("qrcodeInput"))
            // console.log(TelaAnimal.prototype.getKeysVisitaGuiada())
        }else{
            TelaInicial.prototype.onDeviceReady();
        }
    },
    async onDeviceReady() {
        await this.verificaDadosServidor()
        this.receivedEvent('deviceready');
        document.addEventListener("pause", this.estadoAtual,false);
        document.addEventListener("backbutton", this.anterior,false);
    },
    async verificaDadosServidor(){
        let nativePath
        let file = 'https://datamuzoopan.herokuapp.com/controller/controller.php?key='+window.localStorage.getItem("key")

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

            console.log('file system open: ' + JSON.stringify(fs.root));

            fs.root.getDirectory("file", { create: true,exclusive: true}, function (dirEntry) {
                app.dirFiles = dirEntry
                dirEntry.getDirectory("config", { create: true, exclusive: true}, function (dirEntry) {
                    dirEntry.getFile(name, {create: true, exclusive: true}, function(fileEntry){
                        fileEntry.createWriter(async function(escrever){
                            escrever.onwrite = function(evt) {
                                console.log("write success");
                            };
                            let text = await app.getDadosServidor(file)
                            escrever.write(JSON.stringify(app.fileAtualizacao));
                        },File.prototype.fail)
                    }, File.prototype.fail);
                }, File.prototype.fail)
                // console.log(app.dirFiles)
                // if (app.dirFiles) {
                //     // app.dirConfig =  File.prototype.getDir(app.dirFiles, "config",false)
                //     // let obj = File.prototype.getFile(app.dirConfig, "obj", false)
                //     // let text = File.prototype.readFile(obj)
                //     console.log("foi1")
                // }else{  
                //     console.log("foi2")
                //     app.info_app = await app.getDadosServidor(file)

                //     // app.dirFiles = await File.prototype.getDir(fs.root, "files",false)
                //     // console.log(app.dirFiles)
                //     // app.dirConfig = await File.prototype.getDir(app.dirFiles, "config",true)
                //     // let obj = await File.prototype.getFile(app.dirConfig, "obj", true)
                //     // console.log(obj)
                //     // await File.prototype.writeFile(obj, app.info_app.obj)
                // }
                // console.log(app.dirFiles)
            }, File.prototype.fail)


        }, File.prototype.fail);
    },
    async setDadosInFile(){

    },
    async getDadosServidor(file){
        let dados
        await $.get(file, function(data){
            dados=data
        })
        app.fileAtualizacao=JSON.parse(dados)
        return JSON.parse(dados)
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
    fail(evt) {
        console.log("fail "+evt);
    },
    setVolumeDis(valor) { 
        if (cordova.platformId == "android") {
            window.androidVolume.setMusic(valor, false, sucess, fail);
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
            app.ready()
        }else if (tamanho < minimo) {
            document.styleSheets[2]["cssRules"][0]["style"].setProperty('--tamanhoFonte', minimo);
            document.getElementById('fonte').value= minimo;
            app.ready()
        }else if (tamanho > maximo) {
            document.styleSheets[2]["cssRules"][0]["style"].setProperty('--tamanhoFonte', maximo);  
            document.getElementById('fonte').value= maximo; 
            app.ready()
        }
        
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
            window.localStorage.setItem("contraste", "off");
        }
        if (window.localStorage.getItem("fonte") == null) {
            var tamanho = document.styleSheets[0]["cssRules"][0]["style"].getPropertyValue('--tamanhoFonte');
            window.localStorage.setItem("fonte", tamanho);
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
                }, fail);
        }
        
    },
    estadoAtual(){
        if (cordova.platformId != "browser") {
            if (window.localStorage.getItem("qrcodeInput") ==  "premio") {
                window.localStorage.removeItem("anterior");
            }
            window.localStorage.removeItem("qrcodeInput");
            window.localStorage.removeItem("volume");
            window.localStorage.removeItem("config");
        }
    },
    exit(){
        console.log("exit");
        window.localStorage.removeItem("qrcodeInput");
        window.localStorage.removeItem("volume");
        window.localStorage.removeItem("config")
        if (cordova.platformId != "browser") {
            navigator.app.exitApp();
        }

    },
    anterior(e) {
        if (cordova.platformId != "browser") {
            e.preventDefault();
        }
        var anterior;
        var jdata;
        if (window.localStorage.getItem("anterior")) {
            anterior = localStorage.getItem('anterior');
            if(anterior){
                jdata = JSON.parse(anterior);
            }
        }
        if (window.localStorage.getItem("config") == "quiz") {
            console.log("não pode jovem");
        }else if (window.localStorage.getItem("config") == "obj" && window.localStorage.getItem("anterior") && jdata.vou == "revisao"){
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
        }else if (window.location.href.indexOf("index") != -1 && app.camera){
            app.exit();
            // window.history.go(-1);
        }else if ( window.localStorage.getItem("config") == "app" && window.localStorage.getItem("qrcodeInput") == "premio"){
            app.exit();
        }
        camera=true;
    },
    receivedEvent(id) {
        
    }
};

app.initialize();


$("#invisible").ready(app.startInit)
$("#mensagem").ready(app.startModalAtualizacao)