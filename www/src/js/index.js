function changePrepare(text,isApp){
    (function factory(text) {
        console.log(text);
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
    //changePrepare("quiz");
     cordova.plugins.barcodeScanner.scan(
         function (result) {
             console.log("cancelado "+result.cancelled);
             if (!result.cancelled) {
                 camera = true;
                 changePrepare(result.text);
             }else{
                 camera = false;
             }
         },
         function (error) {
             alert("Scanning falhou: " + error);
         },
         {
             preferFrontCamera : false, // iOS and Android
             showFlipCameraButton : true, // iOS and Android
             showTorchButton : true, // iOS and Android
             saveHistory: false, // Android, save scan history (default false)
             prompt : "Coloque qrcode dentro da área de scan", // Android
             resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
             formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
             orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
             disableAnimations : true, // iOS
             disableSuccessBeep: false // iOS and Android
       }
    );
     camera = false;
}

$(document).ready(function(){
    document.getElementById('camera').addEventListener("click", barcodescanner.bind(camera),true);
    document.getElementById('buttonSobre').addEventListener("click", changePrepare.bind(null,'about',true),true);
    getEstilo();
    onMenu();
});
