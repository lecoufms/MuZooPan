var context = "";
var html;

function selectContext(c) {
    for(i=0; i<c.length; i++){
        if(c[i].name == window.localStorage.getItem("qrcodeInput")){
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
                    renderOnScreen({"name":"error","mensagem":"Desculpe amigx!<br> Este animal não pertence ao seu roteiro."});
                }
            }
        }
    }
    rawFile.send(null);
}

function renderOnScreen(ctxt) {
        var template = $("#"+ (ctxt.name=="error"? "Error404":(window.localStorage.getItem("config")=="obj"? "obj":ctxt.name))).html();
        var compiledTemplate = Template7.compile(template);
        html = compiledTemplate(ctxt);
        document.getElementById("visible").innerHTML=html;
}

function render(){
    readFile("../files/config/"+window.localStorage.getItem("config")+".json");
}
(function(){return $("#invisible").load("templates.html",render)})();

