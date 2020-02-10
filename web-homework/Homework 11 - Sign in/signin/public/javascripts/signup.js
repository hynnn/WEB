window.onload = function() {
    var information = document.getElementsByClassName('text');//form中的input
    var reset = document.getElementById('reset');//重置按钮
    reset.onclick = function(){
        for(var i=0; i<6;i++){
            reset_(information);
        }
    }
    for (var i = 0; i < information.length; i++) {
        information[i].onkeyup = function() {
            check(information);
            check_submit();
        }
        information[i].onmouseleave = function (){
            check(information);
            check_submit();
        }
    };
    // $("#submit").click(function(){
    //     console.log("eeeeeeeeeeee");
    //     if(check_submit()=="ee"){
    //         console.log(document.getElementById("name").text());
    //         $("#signup").attr('action', 'sign_up_list?username=' + $("#name").val());
    //         //document.signup.submit;
    //         //$("#signup").submit();

    //     }
    // });

}
//检查是否可以submit
function check_submit(){
    var information = document.getElementsByClassName('text');
    var temp=document.getElementsByClassName("normal");
    for(var i=0;i<information.length; i++){
        if(information[i].value == "") return;
    }
    if(temp.length==6){
        $("#submit").attr("disabled",false);
        return "ee";
    }
    else{
        $("#submit").attr("disabled",true);
    }
}
//清空6个输入
function reset_(information){
    var warn = document.getElementsByClassName("wrong");
    var temp = document.getElementsByClassName("normal");
    for(var j = 0; j < warn.length; j++) warn[j].className = "normal";
    for(var j = 0; j < temp.length; j++) temp[j].className = "normal";
    for (var i = 0; i < information.length; i++) information[i].value = "";
}
function check(thing){
    check_username(thing[0]);
    check_password(thing[1]);
    recheck_password(thing[1],thing[2]);
    check_id(thing[3]);
    check_tel(thing[4]);
    check_eml(thing[5]);
}
//检查密码
function check_password(thing){
    var value=thing.value;
    var temp=0;
    var warn = document.getElementById("password");
    if (value == "") {
        warn.className = "normal";
        return;
    }
    if(value.length<6 || value.length >12) {
        warn.className = "wrong";
        return;
    }
    for(var i=0; i < value.length ; i++){
        if(/[a-zA-Z0-9]/.test((value)[i]) == true || value[i] == '-' || value[i] == '_'){
            temp++;
        }
        else{
            warn.className = "wrong";
        }
    }
    if(temp == value.length) warn.className = "normal";
}
function recheck_password(thing1,thing2){
    var warn = document.getElementById("r_password");
    if(thing1.value != '' && thing2.value !=thing1.value) warn.className = "wrong";
    else warn.className = "normal";
}
//正则检查名字，ID，电话，邮箱
function check_username(thing){
    var value = thing.value;
    var warn = document.getElementById("name");
    if (value == "") {
        warn.className = "normal";
        return;
    }
    if (/\W/.test(value) || /[a-zA-Z]\w{5,17}/.test(value) == false || value.length > 18 || /[a-zA-Z]/.test((value)[0]) == false)
        warn.className =  "wrong";
    else warn.className = "normal";
}
function check_id(thing){
    var value = thing.value;
    var warn = document.getElementById("id");
    if (value == "") {
        warn.className = "normal";
        return;
    }
    if (/\D/.test(value) || (value)[0] == '0' || /\d{8}/.test(value) == false || value.length > 8)
        warn.className =  "wrong";
    else warn.className = "normal";
}
function check_tel(thing,warn){
    var value = thing.value;
    var warn = document.getElementById("tel");
    if (value == "") {
        warn.className = "normal";
        return;
    }
    if (/\D/.test(value) || (value)[0] == '0' || /\d{11}/.test(value) == false || value.length > 11)
        warn.className =  "wrong";
    else warn.className = "normal";
}
function check_eml(thing,warn){
    var value = thing.value;
    var warn = document.getElementById("eml");
    if (value == "") {
        warn.className = "normal";
        return;
    }
    if (/^[a-zA-Z_0-9\-]+@(([a-zA-Z_0-9\-])+\.)+[a-zA-Z]{2,4}$/.test(value) == false)
        warn.className =  "wrong";
    else warn.className = "normal";
}
