define(['common'],function(common){
	//1.获取订单编号
	var orderNo = common.getParam("orderNo");
	//2.获取订单详情
	function getOrderDetail(){
		$.ajax({
			"xhrFields":{withCredentials:true},
			"crossDomain":true,
			"url":baseUrl+"mgr/order/getdetail.do",
			data:{"orderNo":orderNo},
			type:"get",
			success:function(rs){
				//判断查询是否成功
				if(rs.status==0){
					//订单信息
					$("#orderNo-container").html(rs.data.orderNo);
					$("#created-container").html(rs.data.created);
					$("#deliveryName-container").html(rs.data.deliveryName);
					$("#statusDesc-container").html(rs.data.statusDesc);
					$("#typeDesc-container").html(rs.data.typeDesc);
					$("#amount-container").html(rs.data.amount);
					//商品列表
					initTable(rs.data.orderItems);
				}else{
					//失败弹出错误信息
					alert(rs.msg);
				}
			}
		});
	}
	
	return{
		getOrderDetail:getOrderDetail,
	};
});

//商品列表
function initTable(data){
	//找到位置引用datatable
	$("#order-item").dataTable({
		"autoWidth":false,		//禁止自动计算宽度
		"paging":false,			//分页
		"ordering" : false,		//排序
		"info":	false,			//统计信息
		"searching":false,		//取消搜索
		"aPaginationType": "full_numbers",
		"data":data,
		"columns":[
			{"data":"goodsName"},
			{"data":"curPrice"},
			{"data":"quantity"},
			{"data":"totalPrice"}
		],
		"oLanguage"		:{
			"oProcessing":"正在加载数据……",
			"sLengthMenu":"每页显示_MENU_条记录",
			"sZeroRecords":"抱歉，没有找到",
			"sInfo":"从_START_到_END_/共_TOTAL_条记录",
			"sInfoEmpty":"没有数据",
			"sInfoFiltered":"(从_MAX_条数据中检索)",
			"sZeroRecords":"没有检索到数据",
			"sSearch":"模糊查询",
			"oPaginate":{
				"sFirst":"首页",
				"sPrevious":"前一页",
				"sNext":"后一页",
				"sLast":"尾页"
			}	
		}
	});
}