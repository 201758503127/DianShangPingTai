define(['common'],function(common){
	//父级id
	var parentId =common.getParam("parentId");
	//自身id
	var pid=common.getParam("paramId");
	//自身名字
	var paramname=common.getParam("paramName");
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
					var num = result.indexOf('value="'+parentId+'"');
					if(parentId==0){
						//父级类型不显示
						$("#parent").prepend("<option selected value='0'></option>");
					}else{
						//显示父级类型
						var flg = "selected";
						var first= result.substring(0,num);
						var third = result.substring(num);
						var newstr = first+flg+third;
						$("#parent").html(newstr);
					}
					
				}
			}
		});
		$("#paramName").val(paramname);
	}
	
	//2.保存
	function saveUpdate(){
		$("#update-save").click(function(){
			var name = $("#paramName").val();
			$.ajax({
				"xhrFields":{withCredentials:true},
				"crossDomain":true,
				"url":baseUrl+"mgr/param/updateparam.do",
				data:{"name":name,"parent_id":parentId,"id":pid},
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
		saveUpdate:saveUpdate
	};
});