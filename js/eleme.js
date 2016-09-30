//config
var conf = {
    post_url: './h5/user/apply'
};
//module:验证码
function yanzhengma() {
    var phone = $('input[name="phone"]').val();
    if (isPhone(phone)) {
        $.ajax({
            type: 'POST',
            url:'./h5/sendPhoneCode',
            dataType: 'json',
            data: {
                phone: phone
            },
            success: function(data) {
                //console.log(data);
                if(data.code == 0){
                    $('.yanzhengma').off(EVENTTYPE.TAP, yanzhengma);
                    alert(data.message);
                }else{
                    alert('发送失败');
                }
            },
            error: function() {
                alert('发送验证码失败')
            }
        });

    } else {
        alert('请输入正确的手机号');
    }
}
$('.yanzhengma').on(EVENTTYPE.TAP, yanzhengma);
//module:校验规则
function isPhone(phone) {
    var pattern = /^1[3|4|5|7|8]\d{9}$/;
    return pattern.test(phone);
}

function isPhoneCode(phoneCode) {
    var pattern = /^\d{6}$/;
    return pattern.test(phoneCode);
}
// module:监听提交按钮
function $form_submit(container, submit, func) {
    $(container).find(submit).on(EVENTTYPE.TAP, func);
}
//module:表单监听事件
function form_listener() {
    var form = $(this).closest('form').get(0);
    form_check_data(form) && form_post_data(form_get_data(form), conf.post_url);
}
//module:收集数据
function form_get_data(form) {
    return _.reduce($(form).serializeArray(), function(s, x) {
        return s[x.name] = x.value, s;
    }, {});
}
//module:校验数据
function form_check_data(form) {
    var $form = $(form);
    var $name = $form.find('[name="name"]');
    var name = $name.val();
    var $phone = $form.find('[name="phone"]');
    var phone = $phone.val();
    var $city = $form.find('[name="city"]');
    var city = $city.val();
    var $brandid = $form.find('[name="brandid"]');
    var brandid = $brandid.val();
    var $seriesid = $form.find('[name="seriesid"]');
    var seriesid = $seriesid.val();
    var $phonecode = $form.find('[name="phonecode"]');
    var phonecode = $phonecode.val();

    function $alert($name, html) {
        $name.siblings('.msg').html(html);
        $name.closest('.item').addClass('error');
        if ($name.siblings('.msg').length == 0) {
            alert(html);
        }
        return false;
    }

    function $right($name) {
        $name.closest('.item').removeClass('error');
    }
    if (name.trim() == '') {
        return $alert($name, '姓名不能为空');
    } else {
        $right($name);
    }

    if (brandid == '0') {
        return $alert($brandid, '请选择品牌');
    } else {
        $right($brandid);
    }
    if (!seriesid) {
        return $alert($seriesid, '请选择车系');
    } else {
        $right($seriesid);
    }

    if (!isPhone(phone)) {
        return $alert($phone, '请输入正确的手机号');
    } else {
        $right($phone);
    }

    if (!isPhoneCode(phonecode)) {
        return $alert($phonecode, '请输入正确的验证码');
    } else {
        $right($phonecode);
    }
    return true;
}
//module:提交数据
function form_post_data(data, url) {
    $.ajax({
        type: 'POST',
        url: url,
        dataType: 'json',
        data: _.extend({}, data,{
            utmid: cookie.get('utmid')
        }),
        success: function(rs) {
            if (rs.code == 0) {
                ga('send', 'event', 'yuehui2_H5', 'yuehuibaoming',data.phone);
                setApplyCookies({
                    'rphone': data.phone,
                    'rtimes': $('#_ctimes').val()
                });
                $('.js-lingquchenggong').closest('.pop').popShow();
            } else {
                alert(rs.message);
            }
        },
        error: function(xhr, type) {
            alert('网络缓慢，请刷新页面后，重新提交！');
        }
    });
}
//main
! function(Swiper, $, echo, $event_submit) {
    //加载策略
    echo.init({
        offset: 100,
        throttle: 250,
        unload: false,
        callback: function(element, op) {

        }
    });
    //表单数据
    $form_submit('.form-eleme', '.submit', form_listener);
    //弹窗
    $('.pop').popInit(function(form) {
        $(this).find('.ok').on(EVENTTYPE.TAP, function() {
            $(this).closest('.pop').removeClass('active');
        });
    });
    //车系联动
    $ajax_chexi_liandong.call('.form-eleme', '[name="brandid"]', '[name="seriesid"]')
}(Swiper, $, echo, $event_submit);