/**
 * Created by fangjunfeng on 15-12-8.
 */
function deleteAppointment(id) {
    var params = {"id": id, "deleted": true};
    if(confirm('你确定删除吗?')){
        $.ajax({
            type: "POST",
            url: "/admin/appointments/delete",
            data: params,
            success: function () {
                window.location.reload();
            },
            error: function () {
                alert('预约单废除失败!');
            }
        });
    }
}

function updateAppointmentState(id, state) {
    var params = {id: id, state: state};
    $.post('/admin/appointments/updateState', params, function(data) {
        window.location.reload();
    }).fail(function() {
        alert('操作失败!');
    });
}

$(function(){

});