define(['jquery','common','handlebar'],function(jquery,common,Handlebars){
	//储存产品类型参数
	var paramData = new Array();
	//输入的搜索内容
	var conditon= common.getParam("name");
	//产品类型编号
	var productTypeId= common.getParam("parentId");
	//配件类型编号
	var partsTypeId = common.getParam("partsId");
	if(partsTypeId==null){
		partsTypeId='';
	}
	//1.加载  获取所有产品类型
	function ready(){
		$.ajax({
			url:baseUrl+"param/findallparams.do",
			xhrFields:{withCredentials:true},
			crossDomain:true,
			success:function(rs){
				//将json转化为数组，参数编号作为键，对象为值
				$.each(rs.data,function(index,value){
					paramData[value.id] = value;
				});
				//加载产品分类
				var tpl = $("#product_type_list_tpl").html();
				var func = Handlebars.compile(tpl);
				$("#productTypeContainer").html(func(rs.data));
				//设置选中产品分类
				$("#productTypeContainer li a").each(function(i,obj){
					//清空原有选中的
					$(obj).removeClass("selected");
					//添加选中
					if($(obj).attr("product-type-id")==productTypeId){
						$(obj).addClass("selected");
					}
				});
				//设置默认选中配件类型分类
				setPartsType(productTypeId,partsTypeId);
				//产品分类设置点击事件
				$("#productTypeContainer li a").click(function(){
					//清空选定
					$("#productTypeContainer li a").removeClass("selected");
					//设置选定
					$(this).addClass("selected");
					var ptid =$(this).attr("product-type-id");
					//查询配件商品
					setPartsType(ptid);
					//产品商品
					findProducts(ptid,'');
				});
			}
		});
		//2.查询数据
		findProducts(productTypeId,partsTypeId,conditon);
		//单击搜索
		$("#searchBtn").click(function(){
			var proName = $("#keyword").val();
			$(window).attr("location","product_search.html?name="+proName);
		});
		
	}
	
	//2.查询数据
	function findProducts(productTypeId,partsTypeId,conditon,pageNum,pageSize){
		//判断页码
		if(pageNum==undefined ||pageNum==''){
			pageNum=1;
		}
		//判断pagesize
		if(pageSize==undefined ||pageSize==''){
			pageSize=20;
		}
		//产品类型
		if(productTypeId==undefined ||productTypeId==''){
			productTypeId=0;
		}
		//配件类型
		if(partsTypeId==undefined ||partsTypeId==''){
			partsTypeId=0;
		}
		//搜索条件
		if(conditon==null){
			conditon="";
		}
		//向服务器发送请求查询数据
		$.ajax({
			url:baseUrl+"product/findproducts.do",
			xhrFields:{withCredentials:true},
			crossDomain:true,
			data:{'productTypeId':productTypeId,'partsId':partsTypeId,'name':conditon,'pageNum':pageNum,'pageSize':pageSize},
			success:function(rs){
					//设定图片地址
					for(var i=0;i<rs.data.data.length;i++){
						rs.data.data[i].iconUrl = baseUrl+rs.data.data[i].iconUrl;
					}
					//获取数据插入页面
					var tpl = $("#products_list_tpl").html();
					var func=Handlebars.compile(tpl);
					$(".probox").html(func(rs.data.data));
					//处理分页显示
					$(".btn_prev").attr("data-page",rs.data.prePage);
					$(".btn_next").attr("data-page",rs.data.nextPage);
					$(".page_num").attr("data-page-num",rs.data.pageNum);
					$(".page_num").html(rs.data.pageNum);
					$(".page_count").html("共"+rs.data.totalPage+"页");
					//绑定分页点击事件
					$(".btn_prev").click(function(){
						var num = $(".btn_prev").attr("data-page");
						findProducts(productTypeId,partsTypeId,conditon,num,pageSize);
					});
					$(".btn_next").click(function(){
						var num = $(".btn_next").attr("data-page");
						findProducts(productTypeId,partsTypeId,conditon,num,pageSize);
					});
				}	
			});
	}
	
	//3.查询配件商品
	function setPartsType(productTypeId,partsTypeId){
		//设置默认选中的配件类型分类
		var partsData = paramData[productTypeId];
		var tpl = $("#parts_type_list_tpl").html();
		var func = Handlebars.compile(tpl);
		$("#parts_type_container").html(func(partsData));
		//设置选中时配件类型分类
		$("#parts_type_container").find("a").each(function(i,obj){
			$(obj).removeClass("selected");
			if($(obj).attr("product-type-id")==partsTypeId){
				$(obj).addClass("selected");
			}
		});
		//删除最后一个分割线
		$("#parts_type_container .listline:last").remove();
		//点击事件查询数据
		$("#parts_type_container").find("a").click(function(){
			$("#parts_type_container").find("a").removeClass("selected");
			$(this).addClass("selected");
			var productTid = $(this).attr("product-type-id");
			var partsTid = $(this).attr("parts-type-id");
			findProducts(productTid,partsTid);
		});
	}
	
	return{
		ready:ready
	};
});