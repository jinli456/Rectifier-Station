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
})