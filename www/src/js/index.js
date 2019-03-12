function changePrepare(text,isApp){
    (function factory(text) {
        if (text) {
            window.localStorage.setItem("qrcodeInput", text);
            if (isApp){
                window.localStorage.setItem("config", "app");
                changePage("views/view.html");
                // render();
            }else if(text=="quiz"){
                window.localStorage.setItem("config", "quiz");
                changePage("views/view.html");
                // render();
            }else{
                window.localStorage.setItem("config", "obj");
                changePage("views/view.html");
                // render();
            }
        }
    }) (text);
}

function barcodescanner(event) {
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            console.log("cancelado "+result.cancelled);
            if (!result.cancelled) {
                changePrepare(result.text);
            }
        },
        function (error) {
            alert("Scanning falhou: " + error);
        },
        {
            preferFrontCamera : false, // iOS and Android
            showFlipCameraButton : true, // iOS and Android
            showTorchButton : true, // iOS and Android
            saveHistory: true, // Android, save scan history (default false)
            prompt : "Coloque um qrcode dentro da área de scan", // Android
            resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
            orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations : true, // iOS
            disableSuccessBeep: false // iOS and Android
      }
    );
}


$(document).ready(function(){
    document.addEventListener("deviceready", onDeviceReady, true);
    getEstilo();
    onMenu();
    document.getElementById('camera').addEventListener("click", barcodescanner.bind(camera),true);
    document.getElementById('buttonSobre').addEventListener("click", changePrepare.bind(null,'about',true),true);
   
});


