function gerenciaNavMenu(){
	   	var widthFilhos=0;
	   	$("#NavMenu").children().each(function(){
	   		$(this).children().addClass("p-0");
	   		widthFilhos=widthFilhos+parseInt($(this).children().css("width"));
	   		$(this).children().removeClass("p-0");
	   	});
	   	var n = parseInt($("#NavMenu").css("height"))/ parseInt($("#NavMenu").children().css("height"));
	   	if (n != $("#NavMenu").children().length || n != 1) {
	   		if (parseInt($("#NavMenu").css("height")) > parseInt($("#NavMenu").children().css("height")) && $("#NavMenu").attr("class") == "nav nav-pills nav-justified") {
		   		$("#NavMenu").attr("class", "nav flex-column nav-justified");
		   	}else if(widthFilhos < window.screen.availWidth && $("#NavMenu").attr("class") == "nav flex-column nav-justified"){
		   		$("#NavMenu").attr("class", "nav nav-pills nav-justified");	
		   		if (parseInt($("#NavMenu").css("height")) > parseInt($("#NavMenu").children().css("height")) && $("#NavMenu").attr("class") == "nav nav-pills nav-justified") {
			   		$("#NavMenu").attr("class", "nav flex-column nav-justified");
			   	}
		   	}
	   	}
}
readyAnimal = function() {
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
	valor2=100-valor;
	if ($(play).css("display") == "none" && audio.currentTime >= 0) {
		audio.play();
		$(control).css("height", valor2+"%");
	}else{
		audio.pause();
	}   
}

function myEnd(play,pause, control){
	ButtonPlayer(pause,play);
	$(control).css("height", 100+"%");
}
function seek(audio,e){
	valor = e.offsetY+1;
	valor2 = (valor*100)/parseInt($(e.target).css('height'));
	valor3=100-valor2;
	valor4=(valor3*audio.duration)/100;
	audio.currentTime=valor4;
}
function todos(e){
	$( "span.player-play" ).each(function( index ) {
	  $(this).css("display","inline-block");
	  control=$(this).parent().parent().children(".progressAu").children(".player-timeline").children(".player-timeline-control");
	  $(control).css("height", 100+"%");
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
