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

	updateElementInTela(){
		TelaAnimal.prototype.gerenciaNavMenu();
		console.log("gerenciaNavMenu")
    }
    
	onDeviceReady(){
		$( "span.player-play" ).each(function( index ) {
		  	let pause=$(this).parent().children(".player-pause");
		  	let play=$(this);
		  	let audio=$(this).parent().children(".player")[0];
		  	let control=$(this).parent().parent().children(".progressAu").children(".player-timeline").children(".player-timeline-control");
		  	$( this ).on( "click", TelaAnimal.prototype.buttonPlayer.bind(null,pause,play));
		  	$(this).on("click",TelaAnimal.prototype.progressAnimal.bind(null,audio,play,control));
		});

		$( "span.player-pause" ).each(function( index ) {
		  	let play=$(this).parent().children(".player-play");
		  	let pause=$(this);
		  	let audio=$(play).parent().children(".player")[0];
		  	$( this ).on( "click", TelaAnimal.prototype.buttonPlayer.bind(null,pause,play));
		  	let control=$(play).parent().parent().children(".progressAu").children(".player-timeline").children(".player-timeline-control");
		  	$(this).on("click",TelaAnimal.prototype.progressAnimal.bind(null,audio,play,control));
		});

		$("audio.player").each(function(){
			let play=$(this).parent().children(".player-play");
			let pause=$(this).parent().children(".player-pause");
		    let audio=$(play).parent().children(".player")[0];
			let control=$(this).parent().parent().children(".progressAu").children(".player-timeline").children(".player-timeline-control");
			$(this).on("ended",TelaAnimal.prototype.myEnd.bind(null,play,pause,control));
			$(this).on("timeupdate",TelaAnimal.prototype.progressAnimal.bind(null,audio,play,control));
		});

		$("div.player-timeline").each(function(){
			let audio=$(this).parent().parent().children(".player-controls").children(".player")[0];
			$(this).on("click",TelaAnimal.prototype.seek.bind(this,audio));
		});

		$("div.player-timeline-control").each(function(){
			let audio=$(this).parent().parent().parent().children(".player-controls").children(".player")[0];
			$(this).on("click",TelaAnimal.prototype.seek.bind(this,audio));
		});

		$("#NavMenu").children().each(function(){
			$(this).children().on("click",TelaAnimal.prototype.todos);
	   	});
	   	TelaAnimal.prototype.updateElementInTela()
	}
	

	gerenciaNavMenu(){
	   	var last = $("#NavMenu").children().last()
	   	var widthFilhos=0;
	   	$("#NavMenu").children().each(function(){
	   		$(this).children().removeClass("col");
	   		$(this).children().addClass("p-0");
	   		widthFilhos=widthFilhos+parseInt($(this).children().css("width"));
	   		$(this).children().addClass("col");
	   		$(this).children().removeClass("p-0");
	   	});

	   	var n = parseInt($("#NavMenu").css("height"))/ (parseInt($("#NavMenu").children().css("height"))+ parseInt($("#NavMenu").children().css("margin-top")));
	   	console.log(n);
	   	console.log(widthFilhos);
	   	console.log(window.screen.availWidth);
	   	if (parseInt(n) != $("#NavMenu").children().length || n != 1) {
	   		console.log(n);
	   		if (parseInt($("#NavMenu").css("height")) > (parseInt($("#NavMenu").children().css("height"))+ parseInt($("#NavMenu").children().css("margin-top"))) && $("#NavMenu").attr("class") == "nav nav-pills nav-justified") {
	   			console.log(n);
	   			$("#NavMenu").children().each(function(){
			   		$(this).removeClass("mr-1");
			   	});
		   		$("#NavMenu").attr("class", "nav flex-column nav-justified");
		   		console.log("nav flex-column nav-justified");
		   	}else if(widthFilhos < window.screen.availWidth && $("#NavMenu").attr("class") == "nav flex-column nav-justified"){
		   		$("#NavMenu").children().each(function(){
			   			$(this).addClass("mr-1");
			   	});
		   		$("#NavMenu").children().last().removeClass( "mr-1" );
		   		$("#NavMenu").attr("class", "nav nav-pills nav-justified");	
		   		console.log("nav nav-pills nav-justified");
		   		if (parseInt($("#NavMenu").css("height")) > (parseInt($("#NavMenu").children().css("height"))+ parseInt($("#NavMenu").children().css("margin-top"))) && $("#NavMenu").attr("class") == "nav nav-pills nav-justified") {
		   			console.log("nav flex-column nav-justified");
		   			$("#NavMenu").children().each(function(){
				   		$(this).removeClass("mr-1");
				   	});
			   		$("#NavMenu").attr("class", "nav flex-column nav-justified");
			   	}
		   	}
	   	}
	}

	buttonPlayer(pause, play){
		if ($(pause).css("display") == "none") {
			$(play).css("display", "none");
			$(pause).css("display", "inline-block");
		}else{
			$(pause).css("display", "none");
			$(play).css("display", "inline-block");
		}
	}

	progressAnimal(audio, play, control){
		let valor = (audio.currentTime*100)/audio.duration;
		let valor2=valor;
		if ($(play).css("display") == "none" && audio.currentTime >= 0) {
			audio.play();
			$(control).css("width", valor2+"%");
		}else{
			audio.pause();
		}   
	}

	myEnd(play,pause, control){
		TelaAnimal.prototype.buttonPlayer(pause,play);
		console.log($(control).css("width"))
		$(control).css("width", 0+"px");
	}

	seek(audio,e){
		let valor = e.offsetX;
		let valor2 = (valor*100)/parseInt($(".player-timeline").css('width'));
		let valor3=(valor2*audio.duration)/100;
		audio.currentTime=valor3;
	}
	
	todos(e){
		$( "span.player-play" ).each(function( index ) {
		  $(this).css("display","inline-block");
		  let control=$(this).parent().parent().children(".progressAu").children(".player-timeline").children(".player-timeline-control");
		  $(control).css("width", 0+"px");
		});
		$( "audio.player" ).each(function( index ) {
			let audio=$(this)[0];
			audio.pause();
			audio.currentTime = 0;
		});
		$( "span.player-pause" ).each(function( index ) {
		  $(this).css("display","none");
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