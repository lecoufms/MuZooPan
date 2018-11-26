var history=[];

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

function barcodescanner() {
    cordova.plugins.barcodeScanner.scan(
      function (result) {
          changePrepare(result.text);
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
function anterior() {
  if (history.length == 0) {
    return;
  }
  window.localStorage.setItem("qrcodeInput", history[history.length-1].qrcode);
  window.localStorage.setItem("config", history[history.length-1].config);
  render();
}
function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}
function onDeviceReady() {
    // Register the event listener
    document.addEventListener("backbutton", anterior, false);
}
