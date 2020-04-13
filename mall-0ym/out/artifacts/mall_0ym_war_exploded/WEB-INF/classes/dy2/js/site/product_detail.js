define(['jquery','common'],function(jquery,common){
	//读取传递过来的商品编号
	var pid = common.getParam("pid");
	//1.获取商品数据
	function ready(){
		$.ajax({
			url:baseUrl+"product/getdetail.do",
			xhrFields:{withCredentials:true},
			crossDomain:true,
			data:{'productId':pid},
			success:function(result){
				//数据加载成功时
				if(result.status == 0){
					//产品名称
					$("#product_name_container").html(result.data.name);
					//将产品id作为属性添加到product_name_container中
					$("#product_name_container").attr("data-id",result.data.id);
					//产品价格
					$("#productPriceContainer").html(result.data.price);
					//主图
					$("#productMainImage").attr("src",baseUrl+result.data.iconUrl);
					$("#productMainImage").addClass(".product_picture_img");
					//详情
					$("#detailContainer").html(result.data.detail);
					//规格参数
					$("#specParamContainer").html(result.data.specParam);
					//产品库存
					$("#product_num").attr("data-stock",result.data.stock);
					$("#stock_container").html("库存："+result.data.stock);
					//商品子图
					var subimages =result.data.subImages;
					subimages = subimages.substring(0,subimages.length);
					//切割
					var images = subimages.split(",");
					var small_item ="";
					for(var i=0;i<images.length;i++){
						small_item+="<li><img src=\'";
						images[i]=baseUrl+images[i];
						small_item+=images[i];
						small_item+="\'></li>";
					}
					//将子图插入页面
					$("#piclist_container").html();
					$("#piclist_container").append(small_item);
				}else{
					//数据加载失败
				}
			}
		});
	}
	
	//购买数量增加
	$(".product_plus_1").click(function(){
		//获取库存
		var stock = $("#product_num").attr("data-stock");
		var num = $("#product_num").val();
		//点击增加
		num = parseInt(num)+1;
		if(num >=stock){
			num =stock;
		}
		$("#product_num").val(num);
	});
	
	//购买减少
	$(".product_minus_2").click(function(){
		//获取库存
		var stock = $("#product_num").attr("data-stock");
		var num = $("#product_num").val();
		//点击减少
		num = parseInt(num)-1;
		if(num <=0){
			num =0;
		}
		$("#product_num").val(num);
	});
	
	//加入购物车
	$("#addCart").click(function(){
		//验证数量是否符合规范
		var count = $("#product_num").val();
		if(count <=0){
			alert("请填写正确购买数量，切不能小于1！");
			return;
		}
		//请求服务器 加入购物车
		$.ajax({
			url:baseUrl+"cart/savecart.do",
			xhrFields:{withCredentials:true},
			crossDomain:true,
			data:{'productId':pid,'count':count},
			type:"post",
			success:function(rs){
				//判断方法是否成功
				if(rs.status==0){
					//弹出提示消息
					alert(rs.msg);
				}else{
					alert(rs.msg);
				}
			}
		});
	});
	//商品小图切换大图
	$(".product_picture_table_main ul li img").live("click",function(){
		//去掉其他图片的选中样式
		$(".product_picture_table_main ul li img").removeClass("product_picture_selected");
		$(this).addClass("product_picture_selected");
		//将小图放置到主图位置
		var imgSrc =$(this).attr("src");
		$(".product_picture_img").attr("src",imgSrc);	
	});
	
	//Tab页切换
	$(".product_tab_bar li").click(function(){
		$(".product_tab_bar li").removeClass("product_tab_selected");
		$(this).addClass("product_tab_selected");
		//获取点击tab页的index
		var index = $(this).attr("data-index");
		$(".product_tab_contents li").css("display","none");
		$(".product_tab_contents").find("li").eq(index).css("display","block");
	});
	
	//搜索商品
	$("#searchBtn").click(function(){
		var proName = $("#keyword").val();
		$(window).attr("location","product_search.html?name="+proName);
	});
	return{
		ready:ready
	};
});
