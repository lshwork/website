/**
 * Created by fangjunfeng on 16-3-16.
 */

$(function() {
    $('#enabled').bootstrapSwitch({
        onText: '正常',
        offText: '暂停',
        onColor: 'info'
    });
});

function loadAreaOptions(area) {
    var $area = $('#area');
    $area.find('option:gt(0)').remove();
    $.getJSON('/admin/areas/list', function(items) {
        $.each(items, function(index, item) {
            var $option = $('<option></option>');
            $option.attr('value', item['_id']).text(item.name);
            if (area == item['_id']) {
                $option.prop('selected', true);
            }
            $area.append($option);
        });
    });
}

function initSellerForm(area) {
    loadAreaOptions(area);
}
