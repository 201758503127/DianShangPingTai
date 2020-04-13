define(['common'],function(common){
	//1.获取产品类型参数
	function getParams(){
		$.ajax({
			"xhrFields":{withCredentials:true},
			"crossDomain":true,
			"url":baseUrl+"mgr/param/findptype.do",
			success:function(rs){
				//插入数据 
				if(rs.status==0){
					//原位置清空
					$("#productType").html("");
					//添加数据
					var tpl = $("#param_item_tpl").html();
					var func = Handlebars.compile(tpl);
					var data= rs.data;
					var result = func(data);
					$("#productType").html(result);
					$("#productType").prepend("<option selected value='-1'>请选择产品类型</option>");
				}
			}
		});
	}
	//2.为产品下拉绑定事件
	function dropDownEvent(){
		//绑定事件
		$("#productType").change(function(){
			var val = $("#productType").val();
			if(val!=-1){
				//显示配件类型
				$("#parts-type-container").css({"display":"block"});
				//根据产品类型查询配件类型
				loadPartsType(val);
			}else{
				//隐藏配件类型
				$("#parts-type-container").css({"display":"none"});
			}
		});	
	}
	
	//3.保存商品信息
	function saveBtn(){
		//绑定click事件
		$("#btn-save").click(function(){
			//获取参数
			var goodsName = $("#goodsName").val();
			var productType = $("#productType").val();
			var partsType = $("#partsType").val();
			var goodsPrice = $("#goodsPrice").val();
			var goodsStock = $("#goodsStock").val();
			var images = $("#images").val();
			var detail = $("#preview").html();
			$.ajax({
				"xhrFields":{withCredentials:true},
				"crossDomain":true,
				"url":baseUrl+"mgr/product/saveproduct.do",
				type:"post",
				data:{"name":goodsName,"productId":productType,"partsId":partsType,"detail":detail,"price":goodsPrice,
					"stock":goodsStock,"subImages":images},
				success:function(rs){
					if(rs.status==0){
						//成功是跳转首页
						alert("新增商品成功！");
						$(window).attr("location","index.html");
					}else{
						//失败返回错误信息
						alert(rs.msg);
					}
				}
			});
		});
	}
	
	
	return {
		getParams:getParams,
		dropDownEvent:dropDownEvent,
		saveBtn:saveBtn
	};
	
	//根据产品类型加载配件类型
	function loadPartsType(productTypeId){
		$.ajax({
			"xhrFields":{withCredentials:true},
			"crossDomain":true,
			"url":baseUrl+"mgr/param/findpartstype.do",
			data:{"productTypeId":productTypeId},
			success:function(rs){
				//插入数据 
				if(rs.status==0){
					//原位置清空
					$("#partsType").html("");
					//添加数据
					var tpl = $("#param_item_tpl").html();
					var func = Handlebars.compile(tpl);
					var data= rs.data;
					var result = func(data);
					$("#partsType").html(result);
				}
			}
		});
	}
});