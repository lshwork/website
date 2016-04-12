/**
 * Created by lsh on 2015/11/27 0027.
 */
function updateGoodsOrderState(id, state) {
    var params = {id: id, state: state};
    $.post('/admin/goodsOrders/updateState', params, function(data) {
        window.location.reload();
    }).fail(function() {
        alert('失败');
    });
}

function shipments(id){
    var params = {id: id};
    $.post('/admin/goodsOrders/shipments', params, function(data) {
        if(data.success){
            window.location.reload();
        }else{
            alert(data.message);
        }
    }).fail(function() {
        alert('失败');
    });
}

function refund(id){
    var params = {id: id};
    $.post('/admin/goodsOrders/refund', params, function(data) {
        if(data.success){
            window.location.reload();
        }else{
            alert(data.message);
        }
    }).fail(function() {
        alert('失败');
    });
}

function downloadExcel(){
    var phone=$("#phone").val();
    var sn=$("#sn").val();
    var dateRange=$("#dateRange").val();
    var state=$("#state").val();
    var communityName=$("#communityName").val();
    var breakfastName=$("#breakfastName").val();
    var breakfastDate=$("#breakfastDate").val();
    var url="/admin/goodsOrders/exportExcel?";
    if(phone){
        url+="&phone="+phone;
    }
    if(sn){
        url+="&sn="+sn;
    }
    if(dateRange){
        url+="&dateRange="+dateRange;
    }
    if(state){
        url+="&state="+state;
    }
    if(communityName){
        url+="&communityName="+communityName;
    }
    if(breakfastName){
        url+="&breakfastName="+breakfastName;
    }
    if(breakfastDate){
        url+="&breakfastDate="+breakfastDate;
    }
    window.location=url;
};

$(function(){

    $('#dateRange').daterangepicker({timePicker: true, timePickerIncrement: 30, format: 'YYYY-MM-DD HH:mm:ss'});
    $('#breakfastDate').datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true
    });
});