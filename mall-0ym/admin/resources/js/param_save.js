define(['common','handlebars-v4.0.11'],function(common,Handlebars){
	//1.获得产品类型参数
	function getParams(){
		$.ajax({
			"xhrFields":{withCredentials:true},
			"crossDomain":true,
			"url":baseUrl+"mgr/param/findpathparam.do",
			success:function(rs){
				if(rs.status==0){
					//清空数据
					$("#parent").html("");
					//预加载模板添加数据
					var tpl = $("#param_item_tpl").html();
					var func = Handlebars.compile(tpl);
					var data = rs.data;
					var result = func(data);
					$("#parent").html(result);
					$("#parent").prepend("<option selected value='0'>请选择父类型</option>");
				}
			}
		});
	}
	//2.保存
	function saveBtn(){
		$("#btn-save").click(function(){
			var parentId = $("#parent").val();
			var name = $("#paramName").val();
			$.ajax({
				"xhrFields":{withCredentials:true},
				"crossDomain":true,
				"url":baseUrl+"mgr/param/saveparam.do",
				data:{"name":name,"parent_id":parentId},
				type:"post",
				success:function(rs){
					if(rs.status==0){
						//跳转页面
						$(window).attr("location","param_list.html");
					}else{
						alert(rs.msg);
					}
				}
			});

		});
	}
	
	return {
		getParams:getParams,
		saveBtn:saveBtn
	};
});

