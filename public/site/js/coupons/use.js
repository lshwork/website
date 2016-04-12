/**
 * Created by fangjunfeng on 16-3-11.
 */

$(function(){
    var $sendBtn = $('#sendSmsCodeBtn');
    var $submitBtn = $('#couponForm button[type=submit]');
    var wait = 0, interval = 0;
    var clock = function() {
        wait--;
        if (wait == 0) {
            window.clearInterval(interval);
            $sendBtn.text('获取验证码');
            $sendBtn.prop('disabled', false);
            return;
        }
        $sendBtn.text('重新发送(' + wait + ')');
    };
    var showErrors = function(errors) {
        var msgs = $.map(errors, function(error, index) {
            return '<div>' + error.msg + '</div>';
        });
        $('#errorsModal .modal-body').html(msgs.join(''));
        $('#errorsModal').modal('show');
    };
    $sendBtn.click(function() {
        $sendBtn.prop('disabled', true);
        wait = 60;
        $sendBtn.text('重新发送(' + wait + ')');
        interval = window.setInterval(clock, 1000);
        var params = {
            phone: $('#phone').val()
        };
        $.post('/coupons/sendSmsCode/use', params, function(data) {
            if (data.errors) {
                $sendBtn.prop('disabled', false);
                showErrors(data.errors);
                return;
            }
        });
    });

    $('#couponForm').submit(function(event) {
        event.preventDefault();
        $submitBtn.prop('disabled', true);
        var $form = $(this);
        $.post('/coupons/postUsing', $form.serialize(), function(data) {
            if (data.errors) {
                $submitBtn.prop('disabled', false);
                showErrors(data.errors);
                return;
            }
            window.location.href = '/coupons/takings?phone=' + encodeURIComponent(data.phone);
        });
    });
});