//入口函数
$(function(){
    //表单验证检测
    var form=$("#form");
    var validator= $("#form").data('bootstrapValidator');
    form.bootstrapValidator({
        //显示验证中的图标样式
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
        username:{
            validators: {
                notEmpty: {
                    message: '用户名不能为空'
                },
                callback:{
                    message:'用户名不存在'
                }
            }
        },
            password:{
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    callback:{
                        message:'密码错误'
                    },
                 stringLength: {
                     min: 6,
                         max: 12,
                         message: '用户名长度必须在6到12位之间'
                 },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '用户名由数字字母下划线和.组成'
                    }
                }
            }
        }
    });
    //
    $("#form").on('success.form.bv', function (e) {
        //表单验证成功之后 阻止浏览器默认跳转
        e.preventDefault();
        //然后使用很吊的Ajax来进行提交form
        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            data:form.serialize(),
            dataType:'json',
            success:function (data) {
                if(data.success){
                    //如果登录成功
                    location.href="index.html";
                }else{
                    //如果登录不成功 首先将登陆按钮变为可用
                    $("#form").data('bootstrapValidator').disableSubmitButtons(false);
                    console.log(data);
                    if(data.error===1000) {
                        $("#form").data('bootstrapValidator').updateStatus("username", "INVALID", "callback");
                    }else if(data.error===1001){
                        $("#form").data('bootstrapValidator').updateStatus("password","INVALID","callback");
                    }

                }
            }
        });

    });
   //reset按钮不仅要重置文本内容 而且还要重置form检测时的样式
    $("[type=reset]").on("click",function(){
        //重置所有验证
        $("#form").data('bootstrapValidator').resetForm();
    });






});