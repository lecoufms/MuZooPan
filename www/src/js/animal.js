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
    // $("div.tab-pane").on("click", todos);
    
    // document.getElementById('play').addEventListener('click',progress.bind(null,audio1),true);

    // document.getElementById('pause').addEventListener('click',progress.bind(null,audio1),true);
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
    $("#fonte").on("change",gerenciaNavMenu);
    $("#aumentaFonte").on("click",gerenciaNavMenu);
    $("#diminuiFonte").on("click",gerenciaNavMenu);
    gerenciaNavMenu();
};
function teste(){
  filho = $("div #NavMenu").children()[0];
  $(filho).children().removeClass("col");
  console.log($(filho).children().width());
  $(filho).children().addClass("col");
  console.log($(filho).children().width());
}

function gerenciaNavMenu(){
    var t1=0;
    var t2=0;
    $("div #NavMenu").children().each(function(){
      filho = $(this).children()[0];
      t1=t1+parseInt($(filho).css("width"));
      $(filho).removeClass("col");
      t2=t2+parseInt($(filho).css("width"));
      $(filho).addClass("col");
    });
    var hf= t1-t2;
    var v=t2+hf;
    var fonte=0;
    console.log("div #NavMenu" + " "+t1 + " "+t2 + " "+hf + " "+v + " "+ window.localStorage.getItem("fonte"));
    if (t1 >= parseInt($("#NavMenu").css("width")) && (hf+t2) >= parseInt($("#NavMenu").css("width"))) {
        $("#NavMenu").attr("class", "nav flex-column nav-justified");
        fonte=window.localStorage.getItem("fonte");
        console.log("entrei 1");
    }
    if(t2 < parseInt($("#NavMenu").css("width")) ){
      console.log("entrei 2");
      if ((parseInt($("#NavMenu").css("width")) - t2) > 2) {
          $("#NavMenu").attr("class", "nav nav-pills nav-justified");
      }
    }
}
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
    });
    $( "span.player-pause" ).each(function( index ) {
      $(this).css("display","none");
    });
}