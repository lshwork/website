/**
 * Created by fangjunfeng on 16-3-2.
 */

$(function () {
    var $areaId = $('#areaId');
    var $communityId = $('#communityId');
    $areaId.change(function() {
        $communityId.find('option').remove();
        var areaId = $areaId.val();
        $.getJSON('/communities/listByAreaId', {areaId: areaId}, function(items) {
            $.each(items, function(index, item) {
                var $option = $('<option></option>');
                $option.attr('value', item['_id']).text(item.name);
                $communityId.append($option);
            });
        });
    });

    var showErrors = function(errors) {
        var $submitBtn = $('#areaForm button[type=submit]');
        $submitBtn.prop('disabled', false);
        var msgs = $.map(errors, function(error, index) {
            return '<div>' + error.msg + '</div>';
        });
        $('#errorsModal .modal-body').html(msgs.join(''));
        $('#errorsModal').modal('show');
    };
    var showWarning = function(warning) {
        var $submitBtn = $('#areaForm button[type=submit]');
        $submitBtn.prop('disabled', false);
        $('#warningModal .modal-body').html('<div>' + warning.msg + '</div>');
        $('#warningModal').modal('show');
    };

    var postForm = function() {
        var $form = $('#areaForm');
        $.post('/cars/post', $form.serialize(), function(data) {
            if (data.errors) {
                return showErrors(data.errors);
            }
            location.href = data.redirect;
        });
    };

    $('#areaForm').submit(function(event) {
        event.preventDefault();
        var $submitBtn = $('#areaForm button[type=submit]');
        $submitBtn.prop('disabled', true);
        var $form = $(this);
        $.post('/cars/validate', $form.serialize(), function(data) {
            if (data.errors) {
                return showErrors(data.errors);
            }
            if (data.warning) {
                return showWarning(data.warning);
            }
            postForm();
        });
    });

    $('#warningConfirm').click(function(event) {
        $('#warningModal').modal('hide');
        postForm();
    });
});
