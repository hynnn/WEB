代码：
var scr = document.createElement("script");
scr.src = "https://code.jquery.com/jquery-2.2.0.min.js";
document.body.appendChild(scr);
$=jQuery.noConflict();		//以上是为了在控制台可以使用jquery，不然一直报错
$.getScript("http://www.kryogenix.org/code/browser/sorttable/sorttable.js",  function() {$("table").each(function() {this.classList.add('sortable')}) });

网址是百度来的。
另外，还行需要在HTML的head中加入<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">，因为要把http请求转化为https请求，这样就不会再出现Mixed Content的错误。

网址：
1. https://hjudge.com/problem/1
2. https://leetcode-cn.com/problemset/2019-/
3. https://vmatrix.org.cn/course/134/assignment
4. https://leetcode.com/problemset/top-100-liked-questions/
5. https://sysu-swi.github.io/
