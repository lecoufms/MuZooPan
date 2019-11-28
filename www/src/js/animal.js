function gerenciaNavMenu(){
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
		   			// $("#NavMenu").children().last().addClass( "mr-1" );
			   		$("#NavMenu").attr("class", "nav flex-column nav-justified");
			   	}
		   	}
	   	}
}
function paraTudo(my){
	$(my).parent().parent().addClass("carousel-ite");
	$(my).parent().parent().removeClass("carousel-item");
	console.log($(my).parent().parent());
}
function continuaTudo(my){
	$(my).parent().parent().addClass("carousel-item");
	$(my).parent().parent().removeClass("carousel-ite");
	console.log($(my).parent().parent());	
}
readyAnimal = function() {
	// document.getElementById("NavMenu").addEventListener("load", gerenciaNavMenu, false);
	$( "span.player-play" ).each(function( index ) {
	  pause=$(this).parent().children(".player-pause");
	  play=$(this);
	  audio=$(this).parent().children(".player")[0];
	  control=$(this).parent().parent().children(".progressAu").children(".player-timeline").children(".player-timeline-control");
	  $( this ).on( "click", ButtonPlayer.bind(null,pause,play));
	  $(this).on("click",progressAnimal.bind(null,audio,play,control));
	});
	$( "span.player-pause" ).each(function( index ) {
	  play=$(this).parent().children(".player-play");
	  pause=$(this);
	  audio=$(play).parent().children(".player")[0];
	  $( this ).on( "click", ButtonPlayer.bind(null,pause,play));
	  control=$(play).parent().parent().children(".progressAu").children(".player-timeline").children(".player-timeline-control");
	  $(this).on("click",progressAnimal.bind(null,audio,play,control));
	});
	$("audio.player").each(function(){
		play=$(this).parent().children(".player-play");
		pause=$(this).parent().children(".player-pause");
	    audio=$(play).parent().children(".player")[0];
		control=$(this).parent().parent().children(".progressAu").children(".player-timeline").children(".player-timeline-control");
		$(this).on("ended",myEnd.bind(null,play,pause,control));
		$(this).on("timeupdate",progressAnimal.bind(null,audio,play,control));
	});
	$("div.player-timeline").each(function(){
		audio=$(this).parent().parent().children(".player-controls").children(".player")[0];
		$(this).on("click",seek.bind(this,audio));
	});
	$("div.player-timeline-control").each(function(){
		audio=$(this).parent().parent().parent().children(".player-controls").children(".player")[0];
		$(this).on("click",seek.bind(this,audio));
	});
	$("#NavMenu").children().each(function(){
		$(this).children().on("click",todos);
   	});

};
function ButtonPlayer(pause, play){
	if ($(pause).css("display") == "none") {
		$(play).css("display", "none");
		$(pause).css("display", "inline-block");
	}else{
		$(pause).css("display", "none");
		$(play).css("display", "inline-block");
	}
}

function progressAnimal(audio, play, control){
	valor = (audio.currentTime*100)/audio.duration;
	valor2=valor;
	if ($(play).css("display") == "none" && audio.currentTime >= 0) {
		audio.play();
		$(control).css("width", valor2+"%");
	}else{
		audio.pause();
	}   
}

function myEnd(play,pause, control){
	ButtonPlayer(pause,play);
	console.log($(control).css("width"))
	$(control).css("width", 0+"px");
}
function seek(audio,e){
	console.log(e.offsetX)
	valor = e.offsetX;
	console.log(valor)
	console.log(parseInt($(".player-timeline").css('width')))
	valor2 = (valor*100)/parseInt($(".player-timeline").css('width'));
	console.log(valor2)
	console.log(audio.duration)
	valor3=(valor2*audio.duration)/100;
	console.log(valor3)
	audio.currentTime=valor3;
}
function todos(e){
	$( "span.player-play" ).each(function( index ) {
	  $(this).css("display","inline-block");
	  control=$(this).parent().parent().children(".progressAu").children(".player-timeline").children(".player-timeline-control");
	  $(control).css("width", 0+"px");
	});
	$( "audio.player" ).each(function( index ) {
		a=$(this)[0];
		a.pause();
		a.currentTime = 0;
	});
	$( "span.player-pause" ).each(function( index ) {
	  $(this).css("display","none");
	});
}