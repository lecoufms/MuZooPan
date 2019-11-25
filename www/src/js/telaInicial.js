class TelaInicial{
	/*
		static instancia = null
	
		getInstance(){
			
		}

		onDeviceReady(){

		}
		
		changeElementInTela(){
			
		}
		OBRIGATORIO IMPLEMENTAR EM TODAS AS CLASSES TELA => DEVEM EXTENDER A CLASSE TELA
	*/
	static instancia = null
	static camera = null
	constructor(){
		TelaInicial.camera = true
	}
	
	getInstance(){
		if (!TelaInicial.instancia) {
			TelaInicial.instancia =  new TelaInicial()
			return TelaInicial.instancia
		}else{
			return TelaInicial.instancia
		}
	}
	
	onDeviceReady(){
		document.getElementById('camera').addEventListener("click", TelaInicial.prototype.barcodescanner,true);
    	document.getElementById('buttonSobre').addEventListener("click", TelaInicial.prototype.changePrepare.bind(null,'about',true),true);
	}

	changePrepare(text, isApp){
    	(function factory(text) {
        	console.log(text);
        	if (text) {
	            window.localStorage.setItem("qrcodeInput", text);
	            console.log(window.localStorage.getItem("qrcodeInput"));
	            if (isApp){
	                window.localStorage.setItem("config", "app");
	                app.gerente();
	            }else if(text=="quiz"){
	            	window.localStorage.setItem("config", "quiz");
	            	app.gerente();
	            }else{
	                window.localStorage.setItem("config", "obj");
	                app.gerente();
	            }
	            return;
	        }
	    }) (text);
	}

	barcodescanner() {
		
	    cordova.plugins.barcodeScanner.scan(
	         function (result) {
	             console.log("cancelado "+result.cancelled);
	             if (!result.cancelled) {
	                 TelaInicial.camera = true;
	                 console.log(result.text);
	                 return TelaInicial.prototype.changePrepare(result.text);
	             }else{
	                 return TelaInicial.camera=false;
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
	             orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
	             disableAnimations : true, // iOS
	             disableSuccessBeep: false // iOS and Android
	       }
	    );
	     TelaInicial.camera=false;
	}
}