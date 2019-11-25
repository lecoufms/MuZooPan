class TelaAnimal{
	static instancia = null

	constructor(){
		this.keysVisitaGuiada=[]
	}
	
	getInstance(){
		if (!TelaAnimal.instancia) {
			TelaAnimal.instancia =  new TelaAnimal()
			return TelaAnimal.instancia
		}else{
			return TelaAnimal.instancia
		}
	}
	
	setKeysVisitaGuiada(key){
		if (this.existeEmKeysVisitaGuiada) {
			this.keysVisitaGuiada.push(key)
		}
	}
	
	getKeysVisitaGuiada(){
		return this.keysVisitaGuiada;
	}
	
	existeEmKeysVisitaGuiada(){
		return (this.keysVisitaGuiada.indexOf(window.localStorage.getItem("qrcodeInput")) == -1)
	}

	async updateElementInTela(){
		await TelaAnimal.prototype.gerenciaNavMenu();
		console.log("gerenciaNavMenu")
    }
    
	onDeviceReady(){
		var that = this
		$("#NavMenu").children().each(function(){
			$(this).children().on("click",that.todos);
	   	})
	}
	

	gerenciaNavMenu(){
	   	var widthFilhos=0;
	   	$("#NavMenu").children().each(function(){
	   		$(this).children().removeClass("col");
	   		$(this).children().addClass("p-0");
	   		widthFilhos=widthFilhos+parseInt($(this).children().css("width"));
	   		$(this).children().addClass("col");
	   		$(this).children().removeClass("p-0");
	   	});

	   	var n = parseInt($("#NavMenu").css("height"))/ (parseInt($("#NavMenu").children().css("height"))+ parseInt($("#NavMenu").children().css("margin-top")));
	   	console.log(widthFilhos)
	   	console.log(n)
	   	// parseInt(n) != $("#NavMenu").children().length ||
	   	if (n != 1) {
	   		console.log(n)
	   		console.log(n != 0)
	   		if (parseInt($("#NavMenu").css("height")) > (parseInt($("#NavMenu").children().css("height"))+ parseInt($("#NavMenu").children().css("margin-top"))) && $("#NavMenu").attr("class") == "nav nav-pills nav-justified m-1") {
	   	   		$("#NavMenu").attr("class", "nav flex-column nav-justified m-2");
	   	   		console.log("nav flex-column nav-justified m-2")
		   	}else if(widthFilhos < window.screen.availWidth && $("#NavMenu").attr("class") == "nav flex-column nav-justified m-2"){
		   		$("#NavMenu").attr("class", "nav nav-pills nav-justified m-1");	
		   		console.log("nav nav-pills nav-justified m-1")
		   		if (parseInt($("#NavMenu").css("height")) > (parseInt($("#NavMenu").children().css("height"))+ parseInt($("#NavMenu").children().css("margin-top"))) && $("#NavMenu").attr("class") == "nav nav-pills nav-justified m-1") {
			   		$("#NavMenu").attr("class", "nav flex-column nav-justified m-2");
			   		console.log("nav flex-column nav-justified m-2")
			   	}
		   	}
	   	}
	   	console.log(parseInt($("#NavMenu").css("height")))
	    console.log((parseInt($("#NavMenu").children().css("height"))))
	   	console.log(parseInt($("#NavMenu").children().css("margin-top")))
	}

	todos(e){
		$( "audio.player" ).each(function( index ) {
			let a=$(this)[0];
			a.pause();
			a.currentTime = 0;
		});
	}

	paraTudo(my){
		$(my).parent().parent().addClass("carousel-ite");
		$(my).parent().parent().removeClass("carousel-item");
		console.log($(my).parent().parent());
	}

	continuaTudo(my){
		$(my).parent().parent().addClass("carousel-item");
		$(my).parent().parent().removeClass("carousel-ite");
		console.log($(my).parent().parent());	
	}

};