/**
 * Created by fangjunfeng on 16-3-10.
 */

$(function() {
    $('#agent').bootstrapSwitch({
        onText: '是',
        offText: '否',
        onColor: 'info'
    });

    var $sendBtn = $('#sendSmsCodeBtn');
    var $submitBtn = $('#couponForm button[type=submit]');
    var wait = 0, interval = 0;
    var clearClock = function() {
        wait = 0;
        window.clearInterval(interval);
        $sendBtn.text('获取验证码');
        $sendBtn.prop('disabled', false);
    };
    var clock = function() {
        wait--;
        if (wait == 0) {
            clearClock();
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
        var followedNum = $('#followedNum').val();
        var agent = $('#agent').prop('checked');
        var phone = $('#phone').val();
        var errors = [];
        if (agent && !followedNum) {
            errors.push({msg: '请输入推荐工号'});
        }
        if (!/^1[3|4|5|7|8]\d{9}$/.test(phone)) {
            errors.push({msg: '请输入正确的手机号码'});
        }
        if (errors.length > 0) {
            showErrors(errors);
            return;
        }
        $sendBtn.prop('disabled', true);
        wait = 60;
        $sendBtn.text('重新发送(' + wait + ')');
        interval = window.setInterval(clock, 1000);
        var params = {
            phone: phone
        };
        if (agent) {
            params.followedNum = followedNum;
            params.agent = 1;
        }
        $.post('/coupons/sendSmsCode/take', params, function(data) {
            if (data.errors) {
                clearClock();
                showErrors(data.errors);
                return;
            }
        });
    });

    $('#couponForm').submit(function(event) {
        event.preventDefault();
        $submitBtn.prop('disabled', true);
        var $form = $(this);
        $.post('/coupons/postTaking', $form.serialize(), function(data) {
            if (data.errors) {
                $submitBtn.prop('disabled', false);
                showErrors(data.errors);
                return;
            }
            window.location.href = '/coupons/finish?takingId=' + encodeURIComponent(data.takingId);
        });
    });
});