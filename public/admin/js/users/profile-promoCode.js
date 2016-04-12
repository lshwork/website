/**
 * Created by fangjunfeng on 15-12-12.
 */
$(function(){
    var typeTab=$("#typeTab").val();
    $("#type"+typeTab).attr('class','active');

    $('#startDate, #endDate').datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true
    });

    $("#addPromoCode").click(function(){
        var value=$("#value").val();
        var startDate=$("#startDate").val();
        var endDate=$("#endDate").val();
        var userId=$("#userId").val();
        $.ajax({
            url:'/admin/promoCodes/singlePost',
            data:{value:value,startDate:startDate,endDate:endDate,userId:userId},
            type:"POST",
            success:function(data){
               alert(data.success);
                window.location.reload();
            },
            error:function(){

            }
        });
    });
});