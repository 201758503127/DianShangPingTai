define(['jquery','handlebar','common'],function(jquery,Handlebars,common){
	//1.获取订单编号
	var orderNo = common.getParam("orderNo");
	//2.获取订单详情
	function getDetail(){
		$.ajax({
			url:baseUrl+"order/getdetail.do",
			xhrFields:{withCredentials:true},
			crossDomain:true,
			data:{"orderNo":orderNo},
			success:function(rs){
				//判断方法是否正确
				if(rs.status==0){
					//订单信息
					$("#ordernum-container").html(rs.data.orderNo);
					$("#order-created-container").html(rs.data.created);
					$("#order-price-container").html(rs.data.amount);
					$("#order-status-container").html(rs.data.statusDesc);
					$("#order-ptype-container").html(rs.data.typeDesc);
					$("#order-paytime-container").html(rs.data.paymentTime);
					//拼接地址信息
					var address = rs.data.address.province+" "
					 	+rs.data.address.city+" "
					 	+rs.data.address.addr+" "
					 	+rs.data.address.zip+" "
					 	+rs.data.address.name+" "
					 	+rs.data.address.mobile+" ";
					$("#address-container").html(address);
					//商品订单列表
					$("#item-container").html();
					var tpl = $("#product-item-tpl").html();
					var func = Handlebars.compile(tpl);
					var result = func(rs.data.orderItems);
					$("#item-container").html(result);
					//支付 取消 确认收货按钮显示判断
					if(rs.data.status!=1){
						$("#order_pay").remove();
						$("#order_cancel").remove();
					}
				}else{
					alert(rs.msg);
				}
			}
		});
	}
	
	//点击取消订单按钮
	function orderCancel(){
		//取消按钮挂单击事件
		$("#order_cancel").click(function(){
			$.ajax({
				url:baseUrl+"order/cancelorder.do",
				xhrFields:{withCredentials:true},
				crossDomain:true,
				data:{'orderNo':orderNo},
				success:function(rs){
					//判断方法是否成功
					if(rs.status==0){
						alert(rs.msg);
						$(window).attr("location","order_list.html");
					}else{
						alert(rs.msg);
					}
				}
			});
			
		});
	}
	
	//单击搜索
	$("#searchBtn").click(function(){
		var proName = $("#keyword").val();
		$(window).attr("location","product_search.html?name="+proName);
	});
	
	return{
		getDetail:getDetail,
		orderCancel:orderCancel
	};
});