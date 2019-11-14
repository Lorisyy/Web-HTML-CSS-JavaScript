/*Global boolean varibles to judge START/CRASH/OUT(CHEAT)*/
startflag=0;
crashflag=0;
outflag=0;
/*judge START/CRASH/OUT(CHEAT): Respectively*/
window.onload = function (){
    /*Start*/
    $("#S").mouseover(checkStart);
    /*Crash*/
    $('.block').mouseover(checkCrash);
    $('.block').mouseleave(back);
    /*Out*/
    $("#pos").mouseleave(checkout);
    $("#E").mouseover(checkEnd);
}
function back(obj){
    obj.target.className="block";
}
function checkStart(){
    if(startflag == 1){
        $("#display").html("You have restarted the game!");
        crashflag = 0;
        outflag = 0;
    }
    else{
        $("#display").html("You have started the game!");
        startflag = 1;
        crashflag = 0;
        outflag = 0;
    }
}
function checkCrash(obj){
    if(crashflag == 0 && startflag ==1 && outflag ==0){
        crashflag = 1;
        obj.target.className="block-false";
        $("#display").html("You lose!");
    }
}
function checkout(){
    if(startflag == 1) outflag=1;
}
function checkEnd(){
    if(startflag == 0) document.getElementById("#display").innerHTML="Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!";
    else if(startflag == 1 && crashflag == 0 && outflag ==0){
         $("#display").html("You win!");
        startflag=0;
        crashflag=0;
        outflag=0;
    }
    else if(startflag == 1 && crashflag == 1 && outflag ==0) $("#display").html("You lose the game!");
    else if(startflag == 1 && outflag ==1) $("#display").html("You have cheated yourself");
}
