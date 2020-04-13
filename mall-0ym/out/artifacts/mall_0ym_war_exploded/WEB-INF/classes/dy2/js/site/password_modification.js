define(['jquery','common'],function(jquery,common){
	function ready(){
		//当前密码失去焦点非空验证
		$("#now_password").blur(function(){
			var pwd = $("#now_password").val();
			//判断是否显示错误信息
			if(pwd == null || pwd==""){
				$("#now_password+div").css("display","block");
				$("#now_password+div").html("当前密码不能为空");
			}else{
				$("#now_password+div").css("display","none");
			}
		});
		//新密码的非空验证，长度，组成字符验证
		$("#new_password").blur(function(){
			//方法验证非空，长度，组成
			var result = validatePwd("new_password");
			//判断结果 显示错误信息
			if(result!=null){
				$("#new_password+div").css("display","block");
				$("#new_password+div").html(result);
				return;
			}
			$("#new_password+div").css("display","none");

		});
		
		//确认密码非空验证，长度 ，组成    两次密码是否一致
		$("#password_confirmation").blur(function(){
			var result = validatePwd("password_confirmation");
			//判断结果 显示错误信息
			if(result!=null){
				$("#password_confirmation+div").css("display","block");
				$("#password_confirmation+div").html(result);
				return;
			}
			//判断两次密码是否一致
			if($("#password_confirmation").val()!=$("#new_password").val()){
				$("#password_confirmation+div").css("display","block");
				$("#password_confirmation+div").html("两次密码不一致！");
				return;
			}
			$("#password_confirmation+div").css("display","none");
		});
		
		//保存按钮事件
		$("#btnSave").click(function(){
			$.ajax({
				url:baseUrl+"user/updatepassword.do",
				xhrFields:{withCredentials:true},
				crossDomain:true,
				type:"post",
				data:{"oldpwd":$("#now_password").val(),"newpwd":$("#password_confirmation").val()},
				success:function(data){
					//弹出提示信息
					alert(data.msg);
					//判断是否成功 成功则跳转登录页面
					if(data.status==0){
						$(window).attr("location","login.html");
					}	
				}
			});
		});
	
	}
	
	//验证密码的非空长度和组成
	function validatePwd(labelId){
		//获取密码
		var pwd = $("#"+labelId).val();
		//非空判断
		if(pwd==null||pwd==""){
			return "密码不能为空！";
		}
		//长度判断
		if(pwd.length<6||pwd.length>12){
			return "密码长度为6到12位！";
		}
		//组成判断
		var reg =/^[0-9a-zA-Z]+$/; //正则
		if(!reg.test(pwd)){
			return "密码只能为数字和英文！";
		}
		return null;
	}
	
	return{
		ready:ready
	};
});