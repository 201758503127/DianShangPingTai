var baseUrl="http://10.10.45.100:8080/mall/";
define(function(){
	//获取url中的参数
	function getParam(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");//构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);//匹配目标参数
		if(r != null) return decodeURI(r[2]); return null;//返回参数值
	}
	//用户校验
	function userCalibration(){
		var url = window.location.href;
		//判断是否是登录页，如果是则不再请求登录用户信息
		if(url.indexOf("login.html")>=0){
			return;
		}
		//加载登录用户信息
		$.ajax({
			url:baseUrl+"user/getuserinfo.do",
			xhrFields:{withCredentials:true},
			crossDomain:true,
			success:function(user){
				if(user.status==0){
					//判断是否为管理员
					if(user.data.role==2){
						$("#user-info-container").html(user.data.account);
					}else{
						alert("无操作权限");
						$(window).attr("location","../dy2/index.html");
					}
				}else{
					//未登录直接跳转后台登录页面
					$(window).attr("location","login.html")
				}
			}
		});
	}
	
	return {
		getParam:getParam,
		userCalibration:userCalibration
	};
});