define(['jquery','common','handlebar'],function(jquery,common,Handlebars){
	var status= 0;//订单状态
	var pageNum =1;//当前页
	var pageSize = 5;//一页的数量
	function ready(){
		//点击全部订单 待付款 待收货 事件
		$(".nav_item").live("click",function(){
			//获得标签位置拿到状态
			status = $(this).attr("data-status");
			//清除选中样式
			$(".nav_item").removeClass("on");
			//添加点击标签的选中样式
			$(this).addClass("on");
			//获取订单信息
			pageNum =1;
			getOrders(status,pageNum,pageSize);
		});
		
		//绑定分页点击事件
		$(".btn_prev").click(function(){
			//获取上一页的页码
			pageNum =$(".btn_prev").attr("data-page");
			getOrders(status,pageNum,pageSize);
		});
		$(".btn_next").click(function(){
			//获取下一页的页码
			pageNum =$(".btn_next").attr("data-page");
			getOrders(status,pageNum,pageSize);
		});
		
		//确认收货
		$(".confirm_receipt").live("click",function(){
			//获取订单号
			var orderNo = $(this).attr("data-orderno");
			//向服务器发送请求
			$.ajax({
				url:baseUrl+"order/confirmreceipt.do",
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
		
		//获取订单列表
		getOrders(1,1,5,function(){
			getOrders(3,1,5,function(){
				getOrders(0,1,5,null);
			})
		})
	}
	//单击搜索
	$("#searchBtn").click(function(){
		var proName = $("#keyword").val();
		$(window).attr("location","product_search.html?name="+proName);
	});
	
	//获得订单列表
	function getOrders(status,pageNum,pageSize,callBack){
		$.ajax({
			url:baseUrl+"order/getlist.do",
			xhrFields:{withCredentials:true},
			crossDomain:true,
			data:{'status':status,'pageNum':pageNum,'pageSize':pageSize},
			success:function(rs){
				//方法成功时
				if(rs.status==0){
					//内容嵌入
					$("#order-list-container").html();
					var tpl= $("#order-item-tpl").html();
					var func = Handlebars.compile(tpl);
					var result=func(rs.data.data);
					$("#order-list-container").html(result);
					//处理分页显示
					$(".btn_prev").attr("data-page",rs.data.prePage);
					$(".btn_next").attr("data-page",rs.data.nextPage);
					$(".page_num").attr("data-page-num",rs.data.pageNum);
					$(".page_num").html(rs.data.pageNum);
					$(".page_count").html("共"+rs.data.totalPage+"页");
					//各种状态的订单数量显示
					//全部订单
					if(status==0){
						$("#all_num").html("("+rs.data.totalRecord+")");
						//修改立即付款按钮（除未付款状态）
						$(".pay_order"+3).html("查看订单");
						$(".pay_order"+4).html("查看订单");
						$(".pay_order"+6).html("查看订单");
					}
					//待付款
					if(status==1){
						$("#no_pay_num").html("("+rs.data.totalRecord+")");
					}
					//待收货
					if(status==3){
						$("#unshipped_num").html("("+rs.data.totalRecord+")");
						//清除立即付款，显示确认收货
						$(".pay_order"+3).remove();
						$(".confirm_receipt").attr("style","display:block");
					}
				}	
				//回调函数
				if(callBack) callBack();
			}
		});
	}
	
	return{
		ready:ready
	};
});