var flag = 0;
function command(num){
    if(flag == 1){
        clearall();
        flag = 0;
    }
    document.getElementById("result").value += num;
}
//delete last one char
function del(){
     var str = document.getElementById("result").value.substring(0,document.getElementById("result").value.length-1);
     document.getElementById("result").value=str;
}
function equal(){
    flag = 1;
    if(document.getElementById("result").value == "")
        return ;
    try{
        var re = parseFloat(eval(document.getElementById("result").value).toFixed(8));
        if(re == "Infinity"){
            alert("The divisor can't be zero !");
            re = document.getElementById("result").value;
        }
        document.getElementById("result").value=re;
    }catch(exception){
        alert(exception);
    }
}
//clear all
function clearall(){
    document.getElementById("result").value = "";
}