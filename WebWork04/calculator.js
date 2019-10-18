/*This Function contains how to command ordinary number and singular dots.*/
function command(num_in){
    document.getElementById("result").value+=num_in;
}
function clear_display(){
    document.getElementById("result").value="";
}
function backspace(){
    var str=document.getElementById("result").value.substring(0,document.getElementById("result").value.length-1);
    document.getElementById("result").value=str;
}

function result(){
    if(document.getElementById("result").value==""){
        return;
    }
    var i = 0;
    for(i = 0;i<(document.getElementById("result").value).length;i++){
        if((document.getElementById("result").value).charAt(i)=='+'||
        (document.getElementById("result").value).charAt(i)=='-'||
        (document.getElementById("result").value).charAt(i)=='*'||
        (document.getElementById("result").value).charAt(i)=='/'){
            if((document.getElementById("result").value).charAt(i+1)=='+'||
           (document.getElementById("result").value).charAt(i+1)=='-'||
            (document.getElementById("result").value).charAt(i+1)=='*'||
            (document.getElementById("result").value).charAt(i+1)=='/'){
                alert("Unexpected Operation: doubly(or more) operator!");
                return;
            }
            
        }

        
    }
    try{
        var re = parseFloat(eval(document.getElementById("result").value).toFixed(8));
        if(re=="Infinity"){
            alert("The divisor can't be zero !");
            re=document.getElementById("result").value;
        }
        document.getElementById("result").value=re;
    }catch(exception){
        alert(exception);
    }
}