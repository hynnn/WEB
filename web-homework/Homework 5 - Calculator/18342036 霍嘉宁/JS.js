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
     var str = document.getElementById("result").value;
     var str_ = str.substring(0,document.getElementById("result").value.length-1);
     document.getElementById("result").value=str_;
}

function equal(){
    flag = 1;
    if(document.getElementById("result").value == "")
        return ;
    try{
        var temp = document.getElementById("result").value;
        var val = eval(temp).toFixed(8);
        var re = parseFloat(val);
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