/**
 * Created by lsh on 2015/11/27 0027.
 */
function updateGoodsRefundState(id, state) {
    var params = {id: id, state: state};
    $.post('/admin/goodsRefunds/updateState', params, function(data) {
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
    $.post('/admin/goodsRefunds/refund', params, function(data) {
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
    /*$.get('/download', function(data) {
       alert(123)
    }).fail(function() {
        alert('失败');
    });*/
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
    $(".search").click(function(){
        var phone=$("#phone").val();
        var sn=$("#sn").val();
        var dateRange=$("#dateRange").val();
        var state=$("#state").val();
        var communityName=$("#communityName").val();
        var breakfastName=$("#breakfastName").val();
        var breakfastDate=$("#breakfastDate").val();
        var url="/admin/goodsOrders?";
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
    });

    $('#dateRange').daterangepicker({timePicker: true, timePickerIncrement: 30, format: 'YYYY-MM-DD HH:mm:ss'});
    $('#breakfastDate').datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true
    });
});