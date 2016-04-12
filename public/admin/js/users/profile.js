/**
 * Created by lsh on 15-12-01.
 */
function deleteAppointment(id,type) {
    var params = {"id": id, "deleted": true};
    if(confirm('你确定删除吗?')){
        $.ajax({
            type: "POST",
            url: "/admin/appointments/delete",
            data: params,
            success: function () {
                var index= window.location.href.indexOf('selectType');
                var url= window.location.href;
                if(index!=-1){
                    url=window.location.href.substr(0,index-1);
                }
                window.location.href=url+"?selectType="+type;
            },
            error: function () {
                alert('预约废除失败!');
            }
        });
    }
}
function deleteMessage(id,type) {
    var params = {"id": id, "deleted": true};
    if (confirm('你确定删除吗?')) {
        $.ajax({
            type: "POST",
            url: "/admin/messages/delete",
            data: params,
            success: function () {
                var index= window.location.href.indexOf('selectType');
                var url= window.location.href;
                if(index!=-1){
                    url=window.location.href.substr(0,index-1);
                }
                window.location.href=url+"?selectType="+type;
            },
            error: function () {
                alert('消息废除失败!');
            }
        });
    }
}

/*function chooseType(selectType){
    var type="#dryClean";
    if(selectType==1){
        type="#dryClean";
    }else if(selectType==2){
        type="#housekeeping";
    }else if(selectType==3){
        type="#pension";
    }else if(selectType==4){
        type="#finance";
    }else if(selectType==5){
        type="#insurance";
    }else if(selectType==6){
        type="#loan";
    }else if(selectType==7){
        type="#groupBuying";
    }else if(selectType==8){
        type="#message";
    }else if(selectType==9){
        type="#settings";
    }
    return type;
}*/

$(function(){
    /*var selectType=$("#selectType11").val();
    var type=chooseType(selectType);
    $(".tab-pane").attr('class','tab-pane');
    $("a[data-toggle='tab']").parent().attr('class','');
    $("a[href="+type+"]").parent().attr('class','active');
    $(type).attr('class','active tab-pane');
    $("a[data-toggle='tab']").parent().click(function(){
        $(type).attr('class','tab-pane');
        $("#selectType").val($(this).val());
        var s= window.location.href.indexOf('selectType');
        var a=window.location.href.substr(0,s);
        window.location.href=a+"selectType="+$(this).val();
    });*/

    $("#areaId").change(function () {
        var areaId = $(this).select().val();
        $.ajax({
            type: "GET",
            url: "/admin/communities/list?areaId="+areaId,
            success: function (obj) {
                var $select = $("#communityId");
                $select.empty();
                var json = eval(obj);
                $.each(json, function (index, item) {
                    //循环获取数据
                    var name = item.name;
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
    $('#birthday').datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true
    });
});
