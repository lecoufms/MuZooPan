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
		this.gerenciaNavMenu();
    }
    
	onDeviceReady(){
		this.gerenciaNavMenu();
		// this.setClickPlayes();
		// $( "span.player-play" ).each(function( index ) {
		  
		//   // let control=$(this).parent().parent().children(".progressAu").children(".player-timeline").children(".player-timeline-control");
		//   $(this).on( "click", TelaAnimal.ButtonPlayer);
		// 	console.log(this)
		//   // $(this).on("click",this.progressAnimal.bind(null,audio,play,control));
		// });
	}
	setClickPlayes(){
		$( "span.player-play" ).each(function( index ) {
		  
		  // let control=$(this).parent().parent().children(".progressAu").children(".player-timeline").children(".player-timeline-control");
		  $( this ).on( "click", this.ButtonPlayer);
		  // $(this).on("click",this.progressAnimal.bind(null,audio,play,control));
		});
		// $( "span.player-pause" ).each(function( index ) {
		//   let play=$(this).parent().children(".player-play");
		//   let pause=$(this);
		//   let audio=$(play).parent().children(".player")[0];
		//   $( this ).on( "click", this.ButtonPlayer);
		//   let control=$(play).parent().parent().children(".progressAu").children(".player-timeline").children(".player-timeline-control");
		//   $(this).on("click",this.progressAnimal.bind(null,audio,play,control));
		// });
		// $("audio.player").each(function(){
		// 	let play=$(this).parent().children(".player-play");
		// 	let pause=$(this).parent().children(".player-pause");
		//   	let audio=$(play).parent().children(".player")[0];
		// 	let control=$(this).parent().parent().children(".progressAu").children(".player-timeline").children(".player-timeline-control");
		// 	$(this).on("ended",this.myEnd.bind(null,play,pause,control));
		// 	$(this).on("timeupdate",this.progressAnimal.bind(null,audio,play,control));
		// });
		// $("div.player-timeline").each(function(){
		// 	let audio=$(this).parent().parent().children(".player-controls").children(".player")[0];
		// 	$(this).on("click",this.seek.bind(this,audio));
		// });
		// $("div.player-timeline-control").each(function(){
		// 	let audio=$(this).parent().parent().parent().children(".player-controls").children(".player")[0];
		// 	$(this).on("click",this.seek.bind(this,audio));
		// });
		// $("#NavMenu").children().each(function(){
		// 	$(this).children().on("click",this.todos);
	 //   	});
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
	   	if (parseInt(n) != $("#NavMenu").children().length || n != 1) {
	   		if (parseInt($("#NavMenu").css("height")) > (parseInt($("#NavMenu").children().css("height"))+ parseInt($("#NavMenu").children().css("margin-top"))) && $("#NavMenu").attr("class") == "nav nav-pills nav-justified m-1") {
	   	   		$("#NavMenu").attr("class", "nav flex-column nav-justified m-2");
		   	}else if(widthFilhos < window.screen.availWidth && $("#NavMenu").attr("class") == "nav flex-column nav-justified m-2"){
		   		$("#NavMenu").attr("class", "nav nav-pills nav-justified m-1");	
		   		if (parseInt($("#NavMenu").css("height")) > (parseInt($("#NavMenu").children().css("height"))+ parseInt($("#NavMenu").children().css("margin-top"))) && $("#NavMenu").attr("class") == "nav nav-pills nav-justified m-1") {
			   		$("#NavMenu").attr("class", "nav flex-column nav-justified m-2");
			   	}
		   	}
	   	}
	}
	ButtonPlayer(event){
		console.log(event.target)
		let pause=$(event.target).parent().children(".player-pause");
		let play=$(event.target);
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
		let valor2=100-valor;
		if ($(play).css("display") == "none" && audio.currentTime >= 0) {
			audio.play();
			$(control).css("height", valor2+"%");
		}else{
			audio.pause();
		}   
	}

	myEnd(play,pause, control){
		this.ButtonPlayer(pause,play);
		$(control).css("height", 100+"%");
	}
	seek(audio,e){
		let valor = e.offsetY+1;
		let valor2 = (valor*100)/parseInt($(e.target).css('height'));
		let valor3=100-valor2;
		let valor4=(valor3*audio.duration)/100;
		audio.currentTime=valor4;
	}
	todos(e){
		$( "span.player-play" ).each(function( index ) {
		  $(this).css("display","inline-block");
		  let control=$(this).parent().parent().children(".progressAu").children(".player-timeline").children(".player-timeline-control");
		  $(control).css("height", 100+"%");
		});
		$( "audio.player" ).each(function( index ) {
			let a=$(this)[0];
			a.pause();
			a.currentTime = 0;
		});
		$( "span.player-pause" ).each(function( index ) {
		  $(this).css("display","none");
		});
	}

};