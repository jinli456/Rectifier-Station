/*兼容性 
	IE6-8不支持类名获取
*/
function getClass(classname,range){
	if(range.getElementsByClassName){
		// alert('支持')
		return range.getElementsByClassName(classname)
	}else{
		// alert('不支持')
		var all=range.getElementsByTagName('*')
		var a=[];
		for(var i=0;i<all.length;i++){
			
			if (checkClass(all[i].className,classname)) {
				a.push(all[i])
			}
		}
		return a;
	}
	
}
function checkClass(tagClass,aClass){
	var a= tagClass.split(' ')
	for(var i=0;i<a.length;i++){
		if(a[i]==aClass){
			return true;
		}
		
	}
	return false;
}


function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return window.getComputedStyle(obj,null)[attr];
	}

}

/*兼容性
	操作内容 IE6-8不支持textContent

	1.innerHTML 用来设置或获取
	2.innerText 用来设置或获取(IE)
	  textContent用来设置或获取

*/
function text(obj,val){
	//判断内容是否为空 是空值设置
	if(val==undefined){
		//判断浏览器是否支持这个方法
		if(obj.textContent!=undefined){
			alert('textContent' )
			return obj.textContent;
		}else{
			alert('innerText')
			return obj.innerText;
		}
		//不是空值 把val赋值给它
	}else{
		if(obj.textContent!=undefined){
			 obj.textContent=val;
		}else{
			 obj.innerText=val;
		}
	}
}



/*  1.获取页面元素
		$('#box')	id
		$('.box')	classname
		$('div')	tagname
	2.页面加载
		$(function(){})
*/
function $(selector,range){
	if(typeof selector=='string'){
		// alert('获取')
		var range=range||document;
		if(selector.charAt(0)=='#'){
			return document.getElementById(selector.substr(1))
		}
		else if(selector.charAt(0)=='.'){
			return getClass(selector.substr(1),range)
		}else if(/^[a-zA-Z][a-zA-Z1-6]{0,9}$/.test(selector)){
			return range.getElementsByTagName(selector)
		}else if(/^<[a-zA-Z][a-zA-Z1-6]{0,9}>$/.test(selector)){
			return document.createElement(selector.slice(1,-1))
		}
	}else if(typeof selector=='function'){
		// alert('页面加载')
		// window.onload=selector;
		on(window,'load',selector)
	}

}


/*
	获取所有子节点
*/

function getChilds(obj){
	var childs=obj.childNodes;
	var newArr=[];
	for(var i=0;i<childs.length;i++){
		//判断不要的元素 取反
		if(!(childs[i].nodeType==8||(childs[i].nodeType==3&&trim(childs[i].nodeValue)==''))){
			newArr[newArr.length]=childs[i];
		}
	}
	return newArr;
}



function trim(str){
	return str.replace(/^\s+|\s+$/g,"");

}

function getFirst(obj){
	return getChilds(obj)[0]
}

function getLast(obj){
	var childs=getChilds(obj)
	return childs[childs.length-1]
}
function getIndex(obj,index){
	return getChilds(obj)[index];
}

/* 获取下一个兄弟元素*/
function getNext(obj){
	var next=obj.nextSibling;
	if(!next){
		return false;
	}
	while(next.nodeType==8||(next.nodeType==3&&trim(next.nodeValue)=='')){
		
		next=next.nextSibling;
		if(!next){
			return false;
		}
	}

	return next;
}

/* 获取上一个兄弟元素*/
function getUp(obj){
	var up=obj.previousSibling;
	if(!up){
		return false;
	}
	while(up.nodeType==8||(up.nodeType==3&&trim(up.nodeValue)=='')){
		
		up=up.previousSibling;
		if(!up){
			return false;
		}
	}

	return up;
}

//要插入的对象
function insertBefore(obj1,obj2){
	var parent=obj2.parentNode;
	 parent.insertBefore(obj1,obj2)
}
//之前的对象
function insertAfter(obj,endobj){
	var parent=endobj.parentNode;
	var next=getNext(endobj)
	if(next){
		parent.insertBefore(obj,next)
	}else{
		parent.appendChild(obj)
	}
}


/*
	事件绑定 兼容	
*/

function on(obj,ev,callback){
	if(obj.addEventListener){
		obj.addEventListener(ev,callback)
	}else{
		// obj.fffnnn= function(){
		// 	callback.call(obj)
		// }
		obj.attachEvent('on'+ev,callback)
	}
}

/*
	事件删除  this问题
*/
function off(obj,ev,callback){
	if(obj.removeEventListener){
		obj.removeEventListener(ev,callback)
	}else{
		obj.detachEvent('on'+ev,callback)
	}
}




// 拖拽
function drag(obj,options){
	return new d(obj,options);
}


function d(obj,options){
			//刚开始 this空对象	
							//方向 dir:'a'||'x'||'y' 默认a   
							//边界 slide:true||false  默认false 三元表达式
	this.options=options||{};
	// console.log(this.options)
	this.options.dir=options.dir||'a';
	this.options.slide=options.slide==undefined?false:options.slide;


	this.o=obj;
			//this={o:box}
			//this.o=box

	this.x=0;
	this.y=0;
	this.lenX=0;
	this.lenY=0;
	//找具有定位属性的前辈元素
	this.parent=this.o.offsetParent
	// console.log(this.parent)

	// 获取box的宽高和具有定位属性的父元素的宽高 在事件外面获取,减少获取次数
		this.bw=this.o.offsetHeight;
		this.bh=this.o.offsetWidth;
		this.heziw=this.parent.offsetWidth;
		this.hezih=this.parent.offsetHeight;
		this.down();
}
d.prototype.down=function(){
	//this={o:box,x:0;y:0;lenX:0;lenY:0}
					//this拖拽的对象  把要操作的对象保存在that中
	var that=this;
		
	this.o.onmousedown=function(e){
		//this=box
		// that={o:box,x:0;y:0;lenX:34;lenY:45}
		var ev=e||window.event;
		var cx=ev.clientX;
		var cy=ev.clientY;
		var ox=this.offsetLeft;
		var oy=this.offsetTop;
		that.lenX=cx-ox;
		that.lenY=cy-oy;

		that.move();
		that.up();
		//阻止浏览器默认动作
		if(ev.preventDefault){
			ev.preventDefault();
		}else{
			ev.returnValue = false;
		}
	}
}
d.prototype.move=function(){
	var that=this;
	//that={options: Object, o:div.box, x:0, y: 0, lenX:356}
	
	document.onmousemove=function(e){
		//this=document
		ev=e||window.event;
		var cx=ev.clientX;
		var cy=ev.clientY;
		that.x=cx-that.lenX;
		that.y=cy-that.lenY;

		//边界
		
		if(that.options.slide==true){
			if(that.x<0){
				that.x=0;
			}
			if(that.y<0){
				that.y=0;
			}
			if(that.x>that.heziw-that.bw){
				that.x=that.heziw-that.bw;
			}
			if(that.y>that.hezih-that.bh){
				that.y=that.hezih-that.bh;
			}
		}
		

		//方向
		if(that.options.dir=='x'){
			that.o.style.left=that.x+'px';
		}else if(that.options.dir=='y'){
			that.o.style.top=that.y+'px';
		}else if(that.options.dir=='a'){
			that.o.style.left=that.x+'px';
			that.o.style.top=that.y+'px';
		}
		
		

	}

}
d.prototype.up=function(){
	document.onmouseup=function(){
		document.onmousemove=null;
		document.onmouseup=null;
	}
}