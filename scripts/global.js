/**
 * Created by Anti心 on 2017/1/5.
 */

//添加加载完成事件完成之后，触发的动作
function addLoadEvent(func) {
    var oldonload = window.onload;
    if(typeof  window.onload != "function"){
        window.onload = func;
    }else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}


//插入新节点在当前结点之后
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){
        parent.appendChild(newElement);
    }else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}


//可以重复添加class=“ ”值，
function addClass(element, value) {
    if(!element.className){
        element.className = value;
    }else {
        newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }
}


//如果当前url是匹配链接的，则显示高亮
//功能二，设置当前链接的id为小写，并添加。
function highlightPage() {
    if(!document.getElementsByTagName)   return false;
    if(!document.getElementById)     return false;

    var headers = document.getElementsByTagName("header");
    if(headers.length == 0)     return false;
    var navs = headers[0].getElementsByTagName("nav");
    if(navs.length == 0)    return false;

    var links = navs[0].getElementsByTagName("a");
    var linkurl;
    for(var i=0; i<links.length; i++){
        linkurl = links[i].getAttribute("href");
        if(window.location.href.indexOf(linkurl) != -1) {
            links[i].className = "here";
            var linkText = links[i].lastChild.nodeValue.toLowerCase();
            links[i].setAttribute("id", linkText);
        }
    }

}


//动态幻灯片
//setTimeout()是递归函数内调用，仅一次重复时间
//setInterval()是循环使用，在函数外调用
function moveElement(elementID, final_x, final_y, interval) {
    if(!document.getElementById)    return false;
    if(!document.getElementById(elementID))     return false;

    var elem = document.getElementById(elementID);
    //判断其是否设置过定时值
    if(elem.movement){
        clearTimeout(elem.movement);
    }
    if(!elem.style.top){
        elem.style.top = "0px";
    }
    if(!elem.style.left){
        elem.style.left = "0px";
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if(xpos==final_x && ypos==final_y){
        return true;
    }
    if(xpos < final_x){
        var dist = Math.ceil((final_x-xpos)/10);
        xpos += dist;
    }
    if(xpos > final_x){
        var dist = Math.ceil((xpos - final_x)/10);
        xpos -= dist;
    }
    if(ypos < final_y){
        var dist = Math.ceil((final_y - ypos)/10);
        ypos += dist;
    }
    if(ypos > final_y){
        var dist = Math.ceil((ypos - final_y)/10);
        ypos -= dist;
    }

    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    var repeat = moveElement(elementID, final_x, final_y, interval);
    elem.movement = setTimeout(repeat, interval);
}


//在index.html介绍信息intro节点之后，加上一个幻灯片
function prepareSlideshow() {
    if(!document.getElementsByTagName)      return false;
    if(!document.getElementById)        return false;
    if(!document.getElementById("intro"))       return false;

    var intro = document.getElementById("intro");
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id", "slideshow");
    insertAfter(slideshow, intro);
    var preview = document.createElement("img");
    preview.setAttribute("src", "images/slideshow.gif");
    preview.setAttribute("alt", "a glimpse of what awaits you!");
    preview.setAttribute("id", "preview");
    slideshow.appendChild(preview);
    var frame = document.createElement("img");
    frame.setAttribute("src", "images/frame.gif");
    frame.setAttribute("alt", " ");
    frame.setAttribute("id", "frame");
    slideshow.appendChild(frame);

    var links = document.getElementsByTagName("a");
    for(var i=0; i<links.length; i++){
        links[i].onmouseover = function () {
            var href = this.getAttribute("href");
            if(href.indexOf("index.html") != -1){
                moveElement("preview", 0, 0, 5);
            }
            if(href.indexOf("about.html") != -1){
                moveElement("preview", -150, 0, 5);
            }
            if(href.indexOf("photos.html") != -1){
                moveElement("preview", -300, 0, 5);
            }
            if(href.indexOf("live.html") != -1){
                moveElement("preview", -450, 0, 5);
            }
            if(href.indexOf("contact.html") != -1){
                moveElement("preview", -600, 0, 5);
            }
        }
    }
}


//about.html,
//只显示一部分的内容；
function showSection(id) {
    var sections = document.getElementsByTagName("section");
    for(var i=0; i<sections.length; i++){
        if(sections[i].getAttribute("id") != id){
            // sections[i].setAttribute("display", "none");
            sections[i].style.display = "none";
        }else {
            // sections[i].setAttribute("display", "block");
            sections[i].style.display = "block";
        }
    }
}


//点击事件触发
function prepareInternalnav() {
    if(!document.getElementsByTagName)      return false;
    if(!document.getElementById)    return false;

    var articles = document.getElementsByTagName("article");
    if(articles.length == 0)    return false;
    var navs = articles[0].getElementsByTagName("nav");
    if(navs.length == 0)    return false;
    var links = navs[0].getElementsByTagName("a");
    for(var i=0; i<links.length; i++){
        var sectionId = links[i].getAttribute("href").split("#")[1];
        links[i].destination = sectionId;               //给每一个链接增加一个属性，用于点击事件的触发
        links[i].onclick = function () {
            showSection(this.destination);
            return false;               //这句话是禁止链接跳转，但不影响点击事件的触发
        }
    }
}


//photos,
//参数为<a>链接，显示图片和说明文字
function showPic(whickpic) {
    if(!document.getElementById("description"))     return false;
    var description = document.getElementById("description");
    var text = whickpic.getAttribute("title");
    description.firstChild.nodeValue = text;

    if(!document.getElementById("placeholder"))     return false;
    var placeholder = document.getElementById("placeholder");
    var source = whickpic.getAttribute("href");
    placeholder.setAttribute("src", source);
}


//创建图片展示区占位符
function preparePlaceholder() {
    if(!document.getElementById)      return false;
    if(!document.createElement)     return false;       //创建元素结点
    if(!document.createTextNode)    return false;       //创建文本节点
    if(!document.getElementById("imagegallery"))    return false;

    var placeholder = document.createElement("img");
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute("src", "images/placeholder.gif");
    placeholder.setAttribute("alt", "my image gallery");
    var description = document.createElement("p");
    description.setAttribute("id", "description");
    var desctext = document.createTextNode("Choose an image");
    description.appendChild(desctext);

    //添加在<id = imagegallery>节点之后
    var imagegallery = document.getElementById("imagegallery");
    insertAfter(description, imagegallery);
    insertAfter(placeholder, description);
}


//设置点击事件触发图片库
function prepareGallery() {
    if(!document.getElementsByTagName)      return false;
    if(!document.getElementById)        return false;
    if(!document.getElementById("imagegallery"))    return false;

    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    for(var i=0; i<links.length; i++){
        links[i].onclick = function () {
            showPic(this);
            return false;               //这句话是禁止链接跳转，但不影响点击事件的触发
        }
    }
}


//live.html,
//表格，隔行显示高亮
function stripeTables() {
    if(!document.getElementsByTagName)       return false;

    var tables = document.getElementsByTagName("table");
    for(var i=0; i<tables.length; i++){
        var odd = false;
        var rows = tables[i].getElementsByTagName("tr");
        for(var j=0; j<rows.length; j++){
            if(odd == true){
                addClass(rows[j], "odd");
                odd = false;
            }else {
                odd = true;
            }
        }
    }
}


//鼠标事件显示高亮
function highlightRows() {
    if(!document.getElementsByTagName)      return false;

    var rows = document.getElementsByTagName("tr");
    for(var i=0; i<rows.length; i++){
        rows[i].oldClassName = rows[i].className;           //className是固有属性，oldClassName是自定义的
        rows[i].onmouseover = function () {
            addClass(this, "highlight");
        }
        rows[i].onmouseout = function () {
            this.className = this.oldClassName;
        }
    }
}


function displayAbbreviations() {
    if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
    var abbreviations = document.getElementsByTagName("abbr");
    if (abbreviations.length < 1) return false;
    var defs = new Array();
    for (var i=0; i<abbreviations.length; i++) {
        var current_abbr = abbreviations[i];
        if (current_abbr.childNodes.length < 1) continue;
        var definition = current_abbr.getAttribute("title");
        var key = current_abbr.lastChild.nodeValue;
        defs[key] = definition;
    }
    var dlist = document.createElement("dl");
    for (key in defs) {
        var definition = defs[key];
        var dtitle = document.createElement("dt");
        var dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        var ddesc = document.createElement("dd");
        var ddesc_text = document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }
    if (dlist.childNodes.length < 1) return false;
    var header = document.createElement("h3");
    var header_text = document.createTextNode("Abbreviations");
    header.appendChild(header_text);
    var articles = document.getElementsByTagName("article");
    if (articles.length == 0) return false;
    articles[0].appendChild(header);
    articles[0].appendChild(dlist);
}


//contact.html
//如果lable文本被单击，for关联的字段获取焦点
function focusLabels() {
    if(!document.getElementsByTagName)      return false;

    var lables = document.getElementsByTagName("label")
    for(var i=0; i<lables.length; i++){
        if(!lables[i].getAttribute("for"))  continue;       //如果for属性不含有字段，则跳过循环
        lables[i].onclick = function () {
            var id = this.getAttribute("for");
            if(!document.getElementById(id))    return false;
            var element = document.getElementById(id);
            element.focus();
        }
    }
}


//重置输入框的值，目的是向下兼容浏览器
function resetFields(whichform) {
    if(!Modernizr.input.placeholder)    return;          //引入的js外包，用于检查浏览器的placeholder是否有效
    for(var i=0; i<whichform.elements.length; i++){
        var element = whichform.elements[i];
        if(element.type == "submit")    continue;       //如果是提交按钮，就跳出循环
        var check = element.placeholder || element.getAttribute("placeholder");
        if(!check)     continue;           //如果字段placeholder存储为空，就没必要继续执行

        element.onfocus = function () {
            var text = this.placeholder || this.getAttribute("placeholder");
            if(this.value == text){         //如果当前值为placeholder的value
                this.value = "";
                this.className = "";
            }
        }
        element.onblur = function () {
            if(this.value == ""){
                this.className = "placeholder";
                this.value = this.placeholder || this.getAttribute("placeholder");
            }
        }
        element.onblur();         //这里要立即调用，目的是初始化输入框；
    }
}


//验证是否输入了内容，没有则返回false
function isFilled(field) {
    if(field.value.replace(" ", "").length == 0)    return false;
    var placeholder = field.placeholder || field.getAttribute("placeholder");
    return (field.value != placeholder);
}


//验证是否符合邮箱输入格式，没有则返回false
function isEmail(field) {
    var value = field.value;
    return (value.indexOf("@") != -1 && value.indexOf(".") != -1);
}


//检验含有required属性的输入框是否满足条件
//若是不满足条件，则返回false.即禁止submit提交
function validateForm(whichform) {
    for(var i=0; i<whichform.elements.length; i++){
        var element = whichform.elements[i];
        if(element.getAttribute("required") == "required"){
            if(!isFilled(element)){
                alert("please fill in the " +element.name+ " field");
                return false;
            }
        }

        //对于邮箱，需要多检查一下格式
        if(element.type == "email"){
            if(!isEmail(element)){
                alert("The " +element.name+ " field must be a vaild email address.");
                return false;
            }
        }
    }
    return true;
}


//Ajax,可以异步特点
//拦截提交请求，不打开新页面，自己显示感谢结果。
//本函数，用于申请出一个http请求
function getHTTPObject() {
    //仅仅因为IE，的原因多出的过程
    if(typeof XMLHttpRequest == "undefined"){
        XMLHttpRequest = function () {
            try{    return new ActiveXObject("Msxml2.XMLHTTP.6.0");  }
                catch(e){}
            try{    return new ActiveXObject("Msxml2.XMLHTTP.3.0");  }
                catch(e){}
            try{    return new ActiveXObject("Msxml2.XMLHTTP");  }
                catch(e){}
            return false;
        }
    }
    return new XMLHttpRequest();
}


//接受一个DOM元素为参数，删除所有的子节点，并添加加载图像
function displayAjaxLoading(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
    var content = document.createElement("img");
    content.setAttribute("src", "images/loading.gif");
    content.setAttribute("alt", "Loading...");
    element.appendChild(content);
}


//
function submitFormWithAjax(whichform, thetarget) {
    var request = getHTTPObject();
    if(!request){ return false; }
    displayAjaxLoading(thetarget);

    //收集表单所有的字段名,和字段名存储的值
    var dataParts = [];
    var element;
    for(var i=0; i<whichform.elements.length; i++){
        element = whichform.elements[i];
        dataParts[i] = element.name +"="+ encodeURIComponent(element.value);
    }

    //收集到数据之后，将数组中的项用和号(&)联结起来
    var data = dataParts.join("&");
    //向原始表单action属性，发送POST请求
    request.open("post", whichform.getAttribute("action"), true);
    //在请求中添加application/x-www-form-urlencoded头部
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200 || request.status == 0) {
                var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
                if (matches.length > 0) {
                    thetarget.innerHTML = matches[1];
                } else {
                    thetarget.innerHTML = '<p>Oops, there was an error. Sorry.</p>';
                }
            } else {
                thetarget.innerHTML = '<p>' + request.statusText + '</p>';
            }
        }
    };
    request.send(data);
    return true;
}


//循环遍历文档中所有的form对象
//再添加一个submit时，验证用户输入信息格式是否正确的
function prepareForms() {
    for(var i=0; i<document.forms.length; i++){
        var thisform = document.forms[i];
        resetFields(thisform);
        thisform.onsubmit = function () {
            if(!validateForm(this))     return false;
            var article = document.getElementsByTagName('article')[0];
            if(submitFormWithAjax(this, article)){
                return false;
            }
            return true;
        }
    }
}


addLoadEvent(highlightPage());
addLoadEvent(prepareSlideshow());
addLoadEvent(prepareInternalnav());
addLoadEvent(preparePlaceholder());
addLoadEvent(prepareGallery());
addLoadEvent(stripeTables());
addLoadEvent(highlightRows());
addLoadEvent(displayAbbreviations());
addLoadEvent(focusLabels());
addLoadEvent(prepareForms());
