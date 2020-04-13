define(['jquery_SuperSlide','common','handlebar'],function(jquery_SuperSlide,common,Handlebars){
	//1.加载产品分类
	function getParam(){
		$.ajax({
			url:baseUrl+"param/findallparams.do",
			xhrFields:{withCredentials:true},
			crossDomain:true,
			success:function(rs){
				//创建对象 预编译插件
				var tpl = $("#param_tpl").html();
				var func =Handlebars.compile(tpl);
				//获取数据
				var data = rs.data;
				var result = func(data);
				//插入页面
				$("#paramContainer").html(result);
			}
		});
	}
	//2.加载热销商品
	function getHotProduct(){
		$.ajax({
			url:baseUrl+"product/findhotproducts.do",
			xhrFields:{withCredentials:true},
			crossDomain:true,
			success:function(rs){
				//创建对象 预编译
				var tpl =$("#hot_tpl").html();
				var func =Handlebars.compile(tpl);
				//获取数据 处理数据（图片）
				var data = new Array();
				for(var i=0;i<rs.data.length;i++){
					rs.data[i].iconUrl=baseUrl+rs.data[i].iconUrl;
					data[i]=rs.data[i];
					if(i>=4){
						//前台只展示5条
						break;
					}
				}
				//添加数据插入页面 css样式修改
				var result= func(data);
				$("#hotContainer").html(result);
				//为最后一个li添加样式
				$("#hotContainer>li:last-child").add("right_border");
			}
		});
	}
	//3.加载楼层信息
	function getFloors(){
		$.ajax({
			url:baseUrl+"product/findfloors.do",
			xhrFields:{withCredentials:true},
			crossDomain:true,
			success:function(rs){
				//判断是否成功
				if(rs.status==1){
					return;
				}
				//1楼数据      获取数据（修改图片路径） 插件预编译  插入页面
				var data1 = rs.data.oneFloor;
				for(var i=0;i<data1.length;i++){
					data1[i].iconUrl=baseUrl+data1[i].iconUrl;
				}
				var func =Handlebars.compile($("#floor_odd_top").html());
				$("#floor_one_m").html();
				$("#floor_one_m").append(func(data1));
				//2楼数据
				var data2 = rs.data.twoFloor;
				for(var i=0;i<data2.length;i++){
					data2[i].iconUrl=baseUrl+data2[i].iconUrl;
				}
				$("#floor_two_m").html();
				$("#floor_two_m").append(func(data2));
				//3楼数据
				var data3 = rs.data.threeFloor;
				for(var i=0;i<data3.length;i++){
					data3[i].iconUrl=baseUrl+data3[i].iconUrl;
				}
				$("#floor_three_m").html();
				$("#floor_three_m").append(func(data3));
				//4楼数据
				var data4 = rs.data.fourFloor;
				for(var i=0;i<data4.length;i++){
					data4[i].iconUrl=baseUrl+data4[i].iconUrl;
				}
				$("#floor_four_m").html();
				$("#floor_four_m").append(func(data4));
			}
		});
	}
	
	//4.首页轮播
	$(".slide_box").slide({mainCell:".bd ul" ,effect:"leftLoop",autoPlay:true});
	//5.产品分类
	$(".iten").live({
		mouseenter:function(){
			//获取对象
			var children_div = $(this).children("div");
			var t_this = $(this);
			//显示子分类
			t_this.find('.item_hd').css({border:'none'});
			t_this.prev().find('.item_hd').css({border:'none'});
			children_div.show();
			$(this).addClass("selected");
		},
		mouseleave:function(){
			//获取对象
			var children_div = $(this).children("div");
			//隐藏子分类
			$(this).find('.item_hd').css({'border-bottom':'1px dotted white'});
			$(this).prev().find('.item_hd').css({'border-bottom':'1px dotted white'});
			children_div.hide();
			$(this).removeClass("selected");
		}
	});
	//单击搜索
	$("#searchBtn").click(function(){
		var proName = $("#keyword").val();
		$(window).attr("location","product_search.html?name="+proName);
	});
	
	return{
		getParam:getParam,
		getHotProduct:getHotProduct,
		getFloors:getFloors
	};
});