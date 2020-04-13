define(['jquery','handlebar'],function(jquery,Handlebars){
	//加载当前用户的地址信息
	function getUserAddrInfo(){
		$.ajax({
			url:baseUrl+"addr/findaddrs.do",
			xhrFields:{withCredentials:true},
			crossDomain:true,
			success:function(rs){
				if(rs.status==0){
					//预编译模板 将信息添加到页面
					$("#addr-item-container").html();
					var tpl= $("#addr-item-tpl").html();
					var func= Handlebars.compile(tpl);
					//地址只要前三条
					var arr= [];
					if(rs.data.length>3){
						arr=[rs.data[0],rs.data[1],rs.data[3]];
					}else{
						arr=rs.data;
					}
					var result = func(arr);
					$("#addr-item-container").html(result);
					//设置默认收货地址
					$(".moren_tip").each(function(i,obj){
						var df=$(obj).attr("data-default");
						if(df=='true'){
							var addrId = $(obj).attr("data-id");
							$("#submit").attr("data-id",addrId);
						}
					});
				}else{
					alert(rs.msg);
				}
			}
		});
	}
	
	//删除地址
	function delAddress(){
		$("#del").live("click",function(){
			var id = $(this).attr("data-id");
			$.ajax({
				url:baseUrl+"addr/deladdr.do",
				xhrFields:{withCredentials:true},
				crossDomain:true,
				data:{"id":id},
				success:function(rs){
					if(rs.status==0){
						//删除成功从新获取数据
						getUserAddrInfo();
					}else{
						alert(rs.msg);
					}
				}
			});
		});
	}
	
	//设置默认地址
	function defaultAddress(){
		$("#default").live("click",function(){
			var id = $(this).attr("data-id");
			$.ajax({
				url:baseUrl+"addr/setdefault.do",
				xhrFields:{withCredentials:true},
				crossDomain:true,
				data:{"id":id},
				type:'post',
				success:function(rs){
					//判断方法是否成功
					if(rs.status==0){
						getUserAddrInfo();
					}else{
						alert(rs.msg);
					}
				}
			});
		});
	}
	return{
		getUserAddrInfo:getUserAddrInfo,
		delAddress:delAddress,
		defaultAddress:defaultAddress
	};
});