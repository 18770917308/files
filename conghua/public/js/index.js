;$(function(){
	//主函数
	function main(){
		var index1=index2=1;//index1：轮播index index2：产品图
		$(".banner-img").eq(0).css("display","block");
		//导航悬浮位置
		if (window.attachEvent) { //ie8下兼容写法 注意onscroll 而不是scroll
	                window.attachEvent('onscroll',function(){
					var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
					if(scrollTop>38){
						$(".top-nav").css("top","0");
					}else{
						$(".top-nav").css("top","38px");
					}
				})
            } else if (window.addEventListener) { 
	                window.addEventListener('scroll',function(){
					var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
					if(scrollTop>38){
						$(".top-nav").css("top","0");
					}else{
						$(".top-nav").css("top","38px");
					}
				});  
            }
		//导航项悬浮显示二级菜单
		$(".nav-item").hover(function(){
			$(this).children(".child-item").addClass("active");
		},function(){
			$(this).children(".child-item").removeClass("active");
		});
		//banner轮播
		function bannerSlide(){
			var imgs = $(".banner-img"),
				imgLen = imgs.length;
				imgs.eq(index1).css("display","block").siblings("li").css("display","none");
				$(".pagination-item").eq(index1).addClass("active").siblings().removeClass("active");
				index1++;
				if(index1==imgLen){
					index1=0;
				}
		}
		var timer1 = setInterval(bannerSlide,2000);
		//轮播进度按钮
		$(".pagination-item").click(function(){
			var pIndex1 = $(this).index();
			if(index1==$(".banner-img").length-1){
				index1 = 0;
			}else{
				index1++;
			}
			clearInterval(timer1);
			$(".banner-img").eq(pIndex1).css("display","block").siblings().css("display","none");
			timer1 = setInterval(bannerSlide,2000);
			$(this).addClass("active").siblings().removeClass("active");
		});
		//video播放控制
		 var $myVideo = $("#video").get(0);
		$(".play-icon").click(function(e){
			e.stopPropagation();
			$myVideo.play();
		});
		$(".factory-video").click(function(){
			$myVideo.pause();
		});
		$myVideo.onplaying = function(){
			$(".play-icon").hide();
		};
		$myVideo.onpause = function(){
			$(".play-icon").show();
		};
		//图的滑动
		/*
		*type: 1 工厂next 2 工厂prev 3产品next 4产品prev
		* slides: 滑块父级
		* slideItem：滑块
		* initPosi：slides初始位置 如left：42
		* width:包裹滑块的容器宽度
		 */
		function slides(type,slides,slideItem,initPosi,width){//
			var $slides = slides,
				len = Math.ceil(slideItem.length/4),//获取滑块数目
				curr = $slides.css("left").replace("px","")*1.00;//获取当前ul的位置
				slideSpeed = 500;
				if(!$slides.is(":animated") && len>1){//动画中 && 数量只有一屏
					if(type==1 || type==3){//next-btn
						if(curr==-(len-1)*width+initPosi){//滑到最后一块
							$slides.animate({left:initPosi+"px"},slideSpeed);
						}else{	
							$slides.animate({left:(curr-width)+"px"},slideSpeed)
						}
					}else if(type==2 || type==4){//prev-btn
						if(curr==initPosi || curr == len*width-initPosi){//第一块或者是最后一块
							$slides.animate({left:(-(len-1)*width+initPosi)+"px"},slideSpeed);
						}else{	
							$slides.animate({left:(curr+width)+"px"},slideSpeed)
						}
					}else{
						console.log("传参有误！")
					}
				}
		}
		$(".next-btn").click(function(){
			slides(1,$(".factory-slide"),$(".slide-item"),42,1200);
		});
		$(".prev-btn").click(function(){
			slides(2,$(".factory-slide"),$(".slide-item"),42,1200);
		});
		//荣誉证书自动滑
		var hIndex = 2;
		function honorSlide(){
			var len = Math.ceil($(".honor-certificate-item").length/3),
				$honor = $(".honor-certificate-list"),
				curr = $honor.css("top").replace("px","")*1.00;
			if(curr==0){
				//$honor.css("top",-(len-1)*312+"px")
				$honor.animate({top:-(len-1)*312+"px"},700);
			}else{
				//$honor.css("top",-hIndex*312+"px");
				$honor.animate({top:-hIndex*312+"px"},700);
			}
			if(hIndex==0){
				hIndex=2
			}else{
				hIndex--;
			}
		}
		setInterval(honorSlide,3000);
		//产品中心二级菜单
		$(".product-kind-list").hover(function(e){
			e.stopPropagation();
			$(this).children(".product-list").addClass("active")
		},function(e){
			e.stopPropagation();
			$(this).children(".product-list").removeClass("active")
		});
		//产品图轮播
		function pSlide(){
			var imgs = $(".product-img-big"),
				imgLen = imgs.length;
			imgs.eq(index2).addClass("active").siblings("i").removeClass("active");
			index2++;
			if(index2==imgLen){
					index2=0;
			}
		};
		var timer2 = setInterval(pSlide,1500);
		$(".product-prev").click(function(){
			slides(4,$(".product-img-slide"),$(".product-slide-item"),12,860);
		});
		$(".product-next").click(function(){
			slides(3,$(".product-img-slide"),$(".product-slide-item"),12,860);
		});
		$(".product-slide-item").click(function(){
			index2 = $(this).index();
			$(".product-img-big").eq($(this).index()).addClass("active").siblings("i").removeClass("active");
		});
		//预约表单提交
		$(".reservation-btn").click(function(){
			var formVal = [
				$("#f-name").val(),
				$("#f-addr").val(),
				$("#f-msg").val()
			],
				errorLen = 0;
			for(var i = 0; i<formVal.length; i++){
				if(!formVal[i] || formVal[i]==""){
					errorLen++;
					$(".sub-tips").eq(i).addClass("active");
				}else{
					$(".sub-tips").eq(i).removeClass("active");
				}
			}
			if(errorLen==0){//没有错误提示
				$(".reservation-form").submit();
			}
			
		})
		
	} 
	main();
	

})