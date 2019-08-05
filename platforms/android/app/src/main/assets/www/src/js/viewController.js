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
                try{
                    context = JSON.parse(rawFile.responseText);
                }catch (e)  {
                    console.log(e);
                }
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
    if ("quiz" == window.localStorage.getItem("qrcodeInput")) {
         var data = localStorage.getItem('anterior');
        if(data){
            jdata = JSON.parse(data);
            if (jdata.vou == "premio") {
                window.localStorage.setItem("qrcodeInput", "premio");
                window.localStorage.setItem("config", "app");
            }
        }
    }
    readFile("../files/config/"+window.localStorage.getItem("config")+".json");
}
(function(){return $("#invisible").load("templates.html",render)})();

    // {
    //   "keyAnimal":"jaguatirica",
    //   "nomeAnimal":"Jaguatirica",
    //   "texto": "Em qual dos seguintes habitats a Jaguatirica pode ser encontrada?",
    //   "alternativas": [{"a":"Deserto"},{"b":"Ártico"},{"c":"Savanas"},{"d":"Manguezais"}],
    //   "resposta":"c"
    // },
    // {
    //   "keyAnimal":"capivara",
    //   "nomeAnimal":"Capivara",
    //   "texto": "Qual é a época de reprodução das capivaras?",
    //   "alternativas": [{"a":"Janeiro a março"},{"b":"Setembro a fevereiro"},{"c":"Grande parte dos meses"},{"d":"Abril a agosto"}],
    //   "resposta":"c"
    // },
    // {
    //   "keyAnimal":"capivara",
    //   "nomeAnimal":"Capivara",
    //   "texto": "Qual o período de gestação da Capivara?",
    //   "alternativas": [{"a":"Quatro meses"},{"b":"Um mês"},{"c":"Cinco meses"},{"d":"Três meses"}],
    //   "resposta":"c"
    // },
    // {
    //   "keyAnimal":"cascavel",
    //   "nomeAnimal": "Cascavel",
    //   "texto": "Em relação a sua reprodução, a cascavel (Crotalus durissus) é:",
    //   "alternativas": [{"a": "Ovípara"},{"b": "Ovovípara"},{"c": "Vivípara"},{"d": "Ovulípara"}],
    //   "resposta": "c"
    // },
    // {
    //   "keyAnimal":"cascavel",
    //   "nomeAnimal": "Cascavel",
    //   "texto": "A média de vida de uma cascavel oscila entre:",
    //   "alternativas": [{"a": "5 a 7 anos"},{"b": "11 a 14 anos"},{"c": "9 a 11 anos"},{"d": "10 a 12 anos"}],
    //   "resposta": "d"
    // },
    // {
    //   "keyAnimal":"peixe piranha",
    //   "nomeAnimal":"Peixe Piranha",
    //   "texto": "Em qual período do ano ocorre a reprodução dos peixes piranha?",
    //   "alternativas": [{"a":"Abril a junho"},{"b":"Janeiro a março"},{"c":"Setembro a outubro"},{"d":"Dezembro a março"}],
    //   "resposta":"d"
    // },
    // {
    //   "keyAnimal":"peixe piranha",
    //   "nomeAnimal":"Peixe Piranha",
    //   "texto": "A distribuição geográfica dos peixes piranha ocorre em qual America?",
    //   "alternativas": [{"a":"América Central"},{"b":"América do Norte"},{"c":"América do Sul"},{"d":"América Continental"}],
    //   "resposta":"c"
    // },