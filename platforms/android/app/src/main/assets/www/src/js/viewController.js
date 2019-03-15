var context = "";
var html;

function selectContext(c) {
    for(i=0; i<c.length; i++){
        if(c[i].key == window.localStorage.getItem("qrcodeInput")){
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
                    console.log("false");
                    renderOnScreen({"key":"error","mensagem":"Ocorreu um erro inesperado.<br> Retorne e tente novamente.", "anterior" : JSON.parse(window.localStorage.getItem('anterior'))});
                }
            }
        }
    }
    rawFile.send(null);
}
function alterar(contexto){
    var conteudo;
    if (window.localStorage.getItem("qrcodeInput") == "premio") {
        var premio = defineMedalha();
        conteudo = { "premiacao": premio, "conteudo" : contexto };
    }else{
        conteudo = contexto;
    }
    
    return conteudo;
}

function renderOnScreen(ctxt) {
    var template = $("#"+ (ctxt.key=="error"? "Error404":(window.localStorage.getItem("config")=="obj"? "obj":ctxt.key))).html();
    var compiledTemplate = Template7.compile(template);
    ctxt= alterar(ctxt);
    html = compiledTemplate(ctxt);
    document.getElementById("visible").innerHTML=html;
    $("#visible").ready(function (e,ctxt){
        if (window.localStorage.getItem("config") == "quiz") {
            if($('#visible').is(':visible')){ 
                    ready();
            }
        }else if (window.localStorage.getItem("config") == "obj") {
            readyAnimal();
        }
        getEstilo();
        onMenu();
    });
    
}
function render(){
    readFile("../files/config/"+window.localStorage.getItem("config")+".json");
}
(function(){return $("#invisible").load("templates.html",render)})();

$(document).ready(function(){
    document.addEventListener("deviceready", onDeviceReady, true);
});
