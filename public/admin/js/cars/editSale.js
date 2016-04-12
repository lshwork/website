/**
 * Created by fangjunfeng on 16-3-17.
 */

$(function() {
    $('#contactDate, #hitDate, #finishDate').datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true
    });
    $(".chooseSeller").click(function(){
        var sellerId=$("input[type='radio'][name='sellerId']:checked").val();
        var sellerName=$("input[type='radio'][name='sellerId']:checked").attr("alt");
        $("#seller").val(sellerId);
        $("#sellerName").text(sellerName);
    });
    $("#searchSeller").click(function(){
        $.ajax({
            type:"GET",
            data:$("#search_form").serialize(),
            url:"/admin/cars/searchSellers",
            success:function(data){
                $(".seller").remove();
                data.sellers.forEach(function(s){
                    var tr= "<tr class='seller'><td><input type='radio' name='sellerId' value='"+ s._id+"' alt='"+ s.name+"' ></td><td>"+ s.area.name+"</td>" +
                        "<td>"+ s.num+"</td> <td>"+ s.name+"</td></tr>";
                    $(".sellerTable").append(tr);
                });
            },
            error:function(){
                alert("失败")
            }
        });
    });
});