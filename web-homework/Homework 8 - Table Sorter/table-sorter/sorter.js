var temp3 = [];
window.onload = function(){
    check("todo");
    check("staff");
}
//根据id，把对应table th,td传入函数
function check(thing){
    var table = $("#" + thing)[0];
    var table_td = table.getElementsByTagName('td');
    var table_th = table.getElementsByTagName('th');
    check_click(table,table_th,table_td);
}
//遍历，检查是哪个表的哪个th被点击
function check_click(table,table_th,table_td){
    for(var j=0; j < table_th.length ;j++){
        (function(num){
            table_th[num].onclick =function() {
                change(table,table_th,table_td,num);
            }
        })(j);
    }
}
//改变被点击的th，并且排序
function change(table,table_th,table_td,num){
    if(table_th[num].className == "click_odd"){
        click_even(table_th[num],table,table_th,table_td,num);
    }
    else click_odd(table_th[num],table,table_th,table_td,num);
}
//偶数次点击
function click_even(thing,table,table_th,table_td,num){
    thing.className="click_even";
    $(thing).siblings().attr("class","no_click");
    var s_array=get_small_array_ds(num,table_td,table_th);
    get_array(thing,table,table_th,table_td,num);
    var array= temp3;
    var result=sort(s_array,array,num);
    show(result,table);
}
//奇数次点击
function click_odd(thing,table,table_th,table_td,num){
    thing.className="click_odd";
    $(thing).siblings().attr("class","no_click");
    var s_array=get_small_array_as(num,table_td,table_th);
    get_array(thing,table,table_th,table_td,num);
    var array= temp3;
    var result=sort(s_array,array,num);
    show(result,table);
}
//得到二维数组
function get_array(thing,table,table_th,table_td,num){
    temp3 = new Array();
    for(var i=0;i < table_td.length/table_th.length;i++){
        var temp1 = [];
        for(var j=0; j < table_th.length;j++){
            temp1.push(table_td[j+i*(table_td.length/table_th.length)].innerText);
        }
        temp3.push(temp1);
    }
}
//得到排序后的一位列数组，升序
function get_small_array_as(num,table_td,table_th){
    var array = new Array();
    for(var i=0;i<table_td.length/table_th.length; i++){
        array.push(table_td[num+i*(table_td.length/table_th.length)].innerText);
    }
    array.sort(function(a,b){
        if(a>b) return 1;
        if(a<b) return -1;
        if(a == b) return 0;
    })
    return array;
}
//得到排序后的一位列数组，降序
function get_small_array_ds(num,table_td,table_th){
     var array = new Array();
    for(var i=0;i<table_td.length/table_th.length; i++){
        array.push(table_td[num+i*(table_td.length/table_th.length)].innerText);
    }
    array.sort(function(a,b){
        if(a>b) return -1;
        if(a<b) return 1;
        if(a == b) return 0;
    })
    return array;
}
//根据排序后的一位列数组和二维数组比较来改变二维数组
function sort(s_array,array,num){
    for(var i=0 ; i< s_array.length ;i++){
        for(var j=0;j< s_array.length; j++){
            if(s_array[i] == array[j][num]){
                var temp= array[j];
                array[j]=array[i];
                array[i]=temp;
            }
        }
    }
    return array;
}
//在html中展示结果
function show(result,table){
    var i=0;
    var j=0;
    var trs = $(table).find("tr");
    for (i=1;i<trs.length;i++){
        var tds = $(trs[i]).find("td");
        for (j=0;j<tds.length;j++){
            $(tds[j]).html(result[i-1][j]);
        }
    }
}
