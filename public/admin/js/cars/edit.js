/**
 * Created by fangjunfeng on 16-3-8.
 */

function loadAreaOptions(areaId) {
    var $areaId = $('#areaId');
    $areaId.find('option:gt(0)').remove();
    $.getJSON('/admin/areas/list', function(items) {
        $.each(items, function(index, item) {
            var $option = $('<option></option>');
            $option.attr('value', item['_id']).text(item.name);
            if (areaId == item['_id']) {
                $option.prop('selected', true);
            }
            $areaId.append($option);
        });
    });
}

function loadCommunityOptions(areaId, communityId) {
    var $communityId = $('#communityId');
    $communityId.find('option:gt(0)').remove();
    if (!areaId) {
        return;
    }
    $.getJSON('/admin/communities/list', {areaId: areaId}, function(items) {
        $.each(items, function(index, item) {
            var $option = $('<option></option>');
            $option.attr('value', item['_id']).text(item.name);
            if (communityId == item['_id']) {
                $option.prop('selected', true);
            }
            $communityId.append($option);
        });
    });
}

function initCarForm(areaId, communityId) {
    var $areaId = $('#areaId');
    $areaId.change(function() {
        loadCommunityOptions($areaId.val(), '');
    });
    loadAreaOptions(areaId);
    loadCommunityOptions(areaId, communityId);
}