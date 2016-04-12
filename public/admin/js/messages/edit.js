/**
 * Created by lsh on 2015/11/24 0024.
 */
$(function(){
    var type=$("#receiverType").val();
    var $recType=$("#recType");
    if(type==1){
        $recType.val("用户");
        $("option[value='2']").remove();
        $("option[value='3']").remove();
    }else{
        $recType.val("小区");
        $("option[value='1']").remove();
    }
})
/*$(function () {

    var receiverType = $("#recType").val();
    var recId = $("#recId").val();
    var url = "";
    if (receiverType == 2) {
        //查询小区信息
        url = "/api/communities/list";
    } else {
        //查询用户信息
        url = "/api/users/list";
    }
    $.ajax({
        type: "GET",
        url: url,
        success: function (obj) {
            var $select = $("#receiverId");
            $select.empty();
            json = eval(obj);
            $.each(json, function (index, item) {
                //循环获取数据
                var name = item.name || item.phone;
                var id = item._id;
                if (id == recId) {
                    var $option = $("<option value=" + id + " selected='selected'>" + name + "</option>");
                } else {
                    var $option = $("<option value=" + id + ">" + name + "</option>");
                }
                $select.append($option);
            });
        },
        error: function () {
            alert('失败!');
        }
    });

    $("#receiverType").change(function () {
        var receiverType = $(this).select().val();
        var url = "";
        if (receiverType == 1) {
            //查询用户信息
            url = "/api/users/list";
        } else {
            //查询小区信息
            url = "/api/communities/list";
        }
        $.ajax({
            type: "GET",
            url: url,
            success: function (obj) {
                var $select = $("#receiverId");
                $select.empty();
                var json = eval(obj);
                $.each(json, function (index, item) {
                    //循环获取数据
                    var name = item.name || item.phone;
                    var id = item._id;
                    var $option = $("<option value=" + id + ">" + name + "</option>");
                    $select.append($option);
                });
            },
            error: function () {
                alert('失败!');
            }
        });
    });
});*/

/*
function submitForm() {
    var receiverName = $("select[name='receiverId']  option:selected").html();
    var $input = $("<input type='hidden' name='receiverName' value=" + receiverName + ">");
    $("#userForm").append($input);
    $("#userForm").submit();
}*/
