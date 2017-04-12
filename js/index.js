$(function(){
	// banner导航
	var bannerBox=$('.banner-box')[0];
	var banNav=$('.ban-nav',bannerBox)[0];
	var banavs=$('.banavs',banNav);

	for(var i=1;i<banavs.length;i++){
		hover(banavs[i],function(){
			var banHid=$('.ban-hid',this)[0];
			banHid.style.display='block';
		},function(){
			var banHid=$('.ban-hid',this)[0];
			banHid.style.display='none';
		})
	}

	// banner轮播
	var banner=$('.banner')[0];
	var banWhell=$('.banner-whell',banner)[0]
	var listimg=$('.listimg',banWhell)[0];
	var as=$('a',listimg);
	var tipsw=$('.whell',banWhell)[0];
	var lis=$('li',tipsw);
	
	
	var index=0;
	lis[0].style.backgroundColor='#fff';
	var t=setInterval(banmove,2000)
	function banmove(){
		index++;
		if(index==as.length){index=0}
		for(var i=0;i<as.length;i++){
			as[i].style.zIndex=0;
			lis[i].style.backgroundColor='';
		}
		as[index].style.zIndex=10;
		lis[index].style.backgroundColor='#fff';
	}
	banWhell.onmouseover=function(){
		clearInterval(t)
	}
	banWhell.onmouseout=function(){
		t=setInterval(banmove,2000)
	}
	

	//banner轮播图选项卡
	for(var j=0;j<as.length;j++){
		lis[j].index=j;
		lis[j].onmouseover=function(){
			for(var i=0;i<lis.length;i++){
				lis[i].style.backgroundColor='';
				as[i].style.zIndex=0;
			}
			lis[this.index].style.backgroundColor='#fff';
			as[this.index].style.zIndex=10;
			}
	}


	//精彩瞬间的轮播图(节点轮播)
	var petconBox=$('.petcon-box')[0];
	var petcon=$('.petcon',petconBox)[0];
	var peas=$('a',petcon);
	var pecimgs=$('.pecimg',petcon);
	
	//获取左后按钮
	var main1=$('main1')[0];
	var lunbtn=$('.lunbtn',main1)[0];
	var lunleft=$('.lunleft',lunbtn)[0]
	var lunright=$('.lunright',lunbtn)[0]
	var iw=200;
	petcon.style.width=pecimgs.length*iw+"px";
	var m=setInterval(jclunbo,2000)
	function jclunbo(){
		animate(petcon,{left:-iw},600,
			function(){petcon.appendChild(getFirst(petcon))
				petcon.style.left=0;

			}
		)
	}
	petconBox.onmouseover=function(){
		clearInterval(m)
	}
	petconBox.onmouseout=function(){
		m=setInterval(jclunbo,2000)
	}

	//右按钮
	lunright.onclick=function(){
		jclunbo();
	}

	//左按钮
	var f=true;
	lunleft.onclick=function(){
		// alert(1)
		if(!f){return};
     	f=false;
		petcon.insertBefore(getLast(petcon),getFirst(petcon));
        petcon.style.left=-iw+"px";
	 	animate(petcon,{left:0},600,function(){
	 		  f=true;
 	 	})
	}


	//拖拽
	var piaofu=$('.piaofu')[0];
	var dragbox=$('.dragbox')[0];
	//确定拖动运动的范围,父元素的宽高
	// var cw=document.documentElement. clientWidth;
	// var ch=document.documentElement. clientHeight;
	// dragbox.style.width=cw+'px';
	// dragbox.style.height=ch+'px';
	drag(piaofu,{dir:'a',slide:false})

	//滚轮监测 距离屏幕高150px
	window.onscroll=function(){
			var scroll=document.body.scrollTop||document.documentElement.scrollTop;
			if(scroll>0){
				animate(piaofu,{top:scroll+150},500)
			}
	}
	var close=$('.close',dragbox)[0]
	close.onclick=function(){
		piaofu.style.display='none'	
	}
	
	//主体内容 基地风采 小轮播(无缝轮播)
	var mainBg=$('.main-bg')[0];
	var mainBox=$('.main-box',mainBg)[0]
	var mainRight=$('.main-right',mainBox)[0];
	var mainRtwo=$('.main-rtwo',mainRight)[0];
	//获取显示大盒子
	var mainRtimg=$('.main-rtimg',mainRtwo)[0];

	var jdimgs=$('img',mainRtimg)
	//获取图片的宽度
	var iw=parseInt(getStyle(jdimgs[0],'width'))
	//放图片的盒子
	var mrimgbox=$('.mrimgbox',mainRtimg)[0];
	var jdlis=$('li',mainRtwo);


	var s=setInterval(jdfcwhell,3000)
	function jdfcwhell(){
		animate(mrimgbox,{left:-220},function(){
			animate(mrimgbox,{left:0})
		})
	}
	mrimgbox.onmouseover=function(){
		clearInterval(s)
	}
	mrimgbox.onmouseout=function(){
		s=setInterval(jdfcwhell,3000)
	}

	/*
	//两个下标
	var index=0;
	var next=0;
	jdimgs[0].style.left=0;
	var t=setInterval(jdwhell,2000)
		function jdwhell(){
		next++;
		if(next==jdimgs.length){next=0}
			jdimgs[next].style.left=iw+'px';
			animate(jdimgs[index],{left:-iw})
			animate(jdimgs[next],{left:0})
			index=next;
	}
	mainRtimg.onmouseover=function(){
		clearInterval(t)
	}
	mainRtimg.onmouseout=function(){
		t=setInterval(jdwhell,2000)
	}

	for(i=0;i<jdlis.length;i++){
		jdlis[i].index=i;
		jdlis[i].onmouseover=function(){
			if(index==this.index){
				return;
			}
			animate(jdimgs[index],{left:-iw})
			animate(jdimgs[this.index],{left:0})
			index=this.index;
		}
	}*/

})