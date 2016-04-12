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
});