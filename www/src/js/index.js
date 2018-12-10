var camera= true; 
function changePage(path){
  window.location.assign(path);
}

function changePrepare(text,isApp){
    (function factory(text) {
        if (text) {
            window.localStorage.setItem("qrcodeInput", text);
            if (isApp){
                window.localStorage.setItem("config", "app");
                changePage("views/view.html");
            }else if(text=="quiz"){
                window.localStorage.setItem("config", "quiz");
                changePage("views/view.html");
            }else{
                window.localStorage.setItem("config", "obj");
                changePage("views/view.html");
            }
        }
    }) (text);
}

function barcodescanner(event) {
    camera = false;
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            console.log("cancelado "+result.cancelled);
            if (!result.cancelled) {
                changePrepare(result.text);
                camera = true;
            }   
        },
        function (error) {
            alert("Scanning failed: " + error);
        },
        {
            preferFrontCamera : false, // iOS and Android
            showFlipCameraButton : true, // iOS and Android
            showTorchButton : true, // iOS and Android
            saveHistory: true, // Android, save scan history (default false)
            prompt : "Place a barcode inside the scan area", // Android
            resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
            orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations : true, // iOS
            disableSuccessBeep: false // iOS and Android
      }
    );
}

/*
toDo maquina de estado
*/

/*function estadoAtual(){

}*/


function onDeviceReady() {
    // Register the event listener
    // document.addEventListener("pause", estadoAtual);
    // document.addEventListener("resume", restaura); .applicationDirectory applicationDirectory  
    onMenu();
    document.getElementById('camera').addEventListener("click", barcodescanner.bind(camera),true);
    document.getElementById('buttonSobre').addEventListener("click", changePrepare.bind(null,'about',true),true);
    document.addEventListener("backbutton", anterior,true);
    
    // document.addEventListener("volumeupbutton", stateVolumeUsetH);
    // document.addEventListener("volumedownbutton", stateVolumeDsetH);
  
    console.log(cordova.file);
}
/*// function teste para o plugin file do cordova

function onFileSystemSuccess(fileSystem) {
    console.log(fileSystem.name);
}

function onResolveSuccess(fileEntry) {
    console.log(fileEntry.name);
}
function fail(evt) {
    console.log(evt);
}
*/



function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, true);
}


function anterior(e) {
    e.preventDefault();
    console.log('teste');
    var ind = cordova.file.applicationDirectory+'www/index.html';
    if (window.localStorage.getItem("config") == "quiz") {
        console.log("não pode jovem");
    }else if (window.localStorage.getItem("config") == "obj" && window.localStorage.getItem("anterior")){
        console.log('vamos voltar da revisao, prob');
        var onde = JSON.parse(window.localStorage.getItem('anterior'));
        window.localStorage.setItem("qrcodeInput", onde.nome);
        window.localStorage.setItem("config", onde.nome);
        changePage("view.html");
    }else if (window.location.href !== ind) {
        console.log('vou ao index, bele');
        window.history.go(-1);
    }else if ( (window.location.href === ind && camera) || (window.localStorage.getItem("config") == "app" && window.localStorage.getItem("qrcodeInput") == "premio")){
        alert(camera);
        exit();
    }
}
