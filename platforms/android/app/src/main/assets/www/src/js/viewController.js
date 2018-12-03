var context = "";
var html;

function selectContext(c) {
    for(i=0; i<c.length; i++){
        if(c[i].name == window.localStorage.getItem("qrcodeInput") || 'animal,'+c[i].name == window.localStorage.getItem("qrcodeInput")){
            renderOnScreen(c[i]);
            return true;
        }
    }
    return false;
}

function readFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                context = JSON.parse(rawFile.responseText);
                if(!selectContext(context)){
                    renderOnScreen({"name":"error","mensagem":"Ocorreu um erro inesperado.<br> Retorne a tela incial e tente novamente."});
                }
            }
        }
    }
    rawFile.send(null);
}
function alterar(contexto){
    var conteudo;
    if(window.localStorage.getItem("config") == "obj"){
        conteudo= contexto;
    }else if(window.localStorage.getItem("qrcodeInput") == "quiz"){
        conteudo = contexto;
    }else if(window.localStorage.getItem("qrcodeInput") == "about"){
        conteudo = contexto;
    }else if (window.localStorage.getItem("qrcodeInput") == "premio") {
        var premio = defineMedalha();
        conteudo = { "premiacao": premio, "conteudo" : contexto };
    }
    console.log(conteudo);
    return conteudo;
}

function renderOnScreen(ctxt) {
        var template = $("#"+ (ctxt.name=="error"? "Error404":(window.localStorage.getItem("config")=="obj"? "obj":ctxt.name))).html();
        var compiledTemplate = Template7.compile(template);
        ctxt= alterar(ctxt);
        console.log(ctxt);
        html = compiledTemplate(ctxt);
        document.getElementById("visible").innerHTML=html;
        if (window.localStorage.getItem("config") == "quiz") {
            ready();
        }
}

function render(){
    readFile("../files/config/"+window.localStorage.getItem("config")+".json");
}
(function(){return $("#invisible").load("templates.html",render)})();

function onDeviceReadyV() {
    document.addEventListener("backbutton", anterior,false);
    document.addEventListener("volumedownbutton", stateVolumeH, false);
    document.addEventListener("volumeupbutton", stateVolumeH, false);
    console.log(cordova.file);
    onMenu();
}

function onLoadV() {
    document.addEventListener("deviceready", onDeviceReadyV, true);
}
