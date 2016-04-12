/**
 * Created by fangjunfeng on 15-12-12.
 */
$(function(){
    var typeTab=$("#typeTab").val();
    $("#type"+typeTab).attr('class','active');

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
    $('#orderDate').datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true
    });
});
function updateAppointmentState(id, state) {
    var params = {id: id, state: state};
    $.post('/admin/appointments/updateState', params, function(data) {
        window.location.reload();
    }).fail(function() {
        alert('操作失败!');
    });
}