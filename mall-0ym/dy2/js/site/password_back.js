define(['jquery'],function(jquery){
	var flag = true;//"下一步"按钮标志，true：输入用户名  ，false：输入问题
	var userId; //用户Id
	var asw;//答案
	var account;//用户名
	//1.控制显示隐藏
	$("#giveQuestion").css({display:"none"});
	//2.用户名输入框失去焦点为空检查
	$("#userName").blur(function(){
		if($("#userName").val()==null || $("#userName").val()==""){
			alert("请先输入用户名！");
			return;
		}
	});
	//答案框失去焦点时为空检查
	$("#answer").blur(function(){
		if($("#answer").val()==null || $("#answer").val()==""){
			alert("请输入答案！");
			return;
		}
	});
	//新密码失去焦点为空验证
	$("#newPwd").blur(function(){
		newPwdValidate();
	});
	//确认密码失去焦点为空验证
	$("#surePwd").blur(function(){
		surePwdValidate();
	});
	
	//验证密码的非空,长度和组成
	function validatePwd(labelId,showName){
		var pwd = $("#"+labelId).val();
		if(pwd == null ||pwd == ""){
			return "请输入"+showName+"!";
		}
		if(pwd.length<6||pwd.length>12){
			return "密码长度为6-12位！";
		}
		var reg = /^[0-9a-zA-Z]+$/;
		if(!reg.test(pwd)){
			return "密码只能为数字和英文！";
		}
		return null;
	}
	
	//新密码验证
	function newPwdValidate(){
		var ms =validatePwd("newPwd","新密码");
		if(ms==null){
			//成功将错误信息隐藏
			$("#newPwd+div").css("display","none");
			return true;
		}
		//失败展示
		$("#newPwd+div").css("display","block");
		$("#newPwd+div").html(ms);
		return false;
	}
	//确认密码验证
	function surePwdValidate(){
		//验证密码是否一致
		var surePwd= $("#surePwd").val();
		var newPwd =$("#newPwd").val();
		if(newPwd!=surePwd){
			$("#surePwd+div").css("display","block");
			$("#surePwd+div").html("两次密码不一致！");
			return false;
		}
		//验证是否为空
		var ms =validatePwd("surePwd","确认密码");
		$("#surePwd+div").css("display","none");
		if(ms!=null){
			$("#surePwd+div").css("display","block");
			$("#surePwd+div").html(ms);
			return false;
		}
		$("#surePwd+div").css("display","none");
		return true;
	}
	
	//3.为下一步按钮绑定事件
	$("#nextOpt").click(function(){
		//判断是输入用户名还是输入问题答案
		if(flag){
			//用户名为空判断
			if($("#userName").val()==null||$("#userName").val()==""){
				alert("请先输入用户名！");
				return;
			}
			//验证用户名是否正确，展示输入问题部分
			$.ajax({
				url:baseUrl+"user/getUserByAccount.do",
				xhrFields:{withCredentials:true},
				crossDomain:true,
				type:"post",
				data:{account:$("#userName").val()},
				success:function(data){
					if(data.status==0){
						//当方法成功时 数据加入页面  将参数附上数据
						$("#question").html(data.data.question);
						userId=data.data.id;
						asw=data.data.asw;
						//显示问题
						$("#giveQuestion").css({display:"block"});
						//设置标志 
						flag=false;
					}else{
						//失败返回错误信息
						alert(data.msg);
					}		
				}
			});
		}else{
			//答案提交
			$.ajax({
				url:baseUrl+"user/checkuserasw.do",
				xhrFields:{withCredentials:true},
				crossDomain:true,
				type:"post",
				data:{account:$("#userName").val(),question:$("#question").text(),asw:$("#answer").val()},
				success:function(data){
					if(data.status==0){
						//展示重置密码问题 隐藏验证身份
						$("#validateUser").css({display:"none"});
						$("#changePwd").css({display:"block"});
						$("#changePwd").find("div").first().css("background-image","url(images/common/wangjimima1.png)");
						$("#changePwd p:eq(1)").css("color","#fff");
						//清空用户名及答案
						$("#userName").val("");
						$("#answer").val("");
					}else{
						alert(data.msg);
					}
				}
			});
		}
	});
	
	//重置密码
	$("#submitBtn").click(function(){
		//验证
		if(!newPwdValidate()){
			return;
		}
		if(!surePwdValidate){
			return;
		}
		//向后台提交重置密码
		$.ajax({
			url:baseUrl+"user/resetpassword.do",
			xhrFields:{withCredentials:true},
			crossDomain:true,
			type:"post",
			data:{"userId":userId,"newpwd":$("#newPwd").val()},
			success:function(data){
				if(data.status==0){
					//提示成功 跳转登录页面
					alert(data.msg);
					$(window).attr("location","login.html");
				}
			}
		});
	});

});