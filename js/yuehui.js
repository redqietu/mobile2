var REMOTE = {};
REMOTE.BAOMING = 'http://yuehui.m.emao.com/user/apply';
REMOTE.CHOUJIANG = 'http://yuehui.m.emao.com/user/lottery';
//约惠热销车导航ajax动态刷新
function $ajax_yuehuirexiaoche(loc, brandId) {
    $.ajax({
        type: 'GET',
        url: '/api/getHomeWapDataInfo/' + loc + '/' + brandId + '/',
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'cb',
        cache: true,
        success: function(data) {
            //console.log(data);
            if (data.code == 0) {
                if (brandId == 0) {
                    $('.win').html(data.data);
                } else {
                    $('.win .list-page').html(data.data);
                }
            } else {
                if (brandId == 0) {
                    $('.win').html(data.msg);
                } else {
                    $('.win .list-page').html(data.msg);
                }
            }
            echo.init();
            //echo.render();
        },
        error: function(xhr, type) {
            alert('网络缓慢，请刷新页面！');
            // 即使加载出错，也得重置
        }
    });
}
//设置报名cookie信息
function setApplyCookies(dict) {
    cookie.set(dict, {
        expires: 30
    });
}
//车系联动
function $ajax_chexi_liandong(fromSelect, toSelect) {
    var $wrapper = $(this);
    $wrapper.on('change', fromSelect, function() {
        var chexiId = $(this).val();
        var $to = $wrapper.find(toSelect);
        if (chexiId == '0') {
            $to.html('<option>没有车型数据</option>');
            return;
        }

        $.ajax({
            url: 'http://yuehui.emao.com/api/getseriesinfo/' + chexiId,
            type: 'GET',
            dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback: 'chexi_jsonpCallback',
            success: function(data) {
                if (data.code == 0) {
                    var html = '';
                    // 车型
                    $.each(data.data, function(key, item) {
                        html += '<option value="' + item.id + '">' + item.serieName + '</option>';
                    });
                    $to.html(html);
                    $to.val($to.attr('data-cur'));
                } else {
                    $to.html('<option>没有车型数据</option>');
                }
            }
        });
    })
}
//提交数据
//post数据
//拦截ajax，自动添加_token，times,resouce
! function() {
    var ajax = $.ajax;

    var token = $('#_token').val();
    var times = $('#_ctimes').val();
    cookie.defaults.path = "/";
    cookie.defaults.domain = ".emao.com";
    setApplyCookies({
        'rtimes': times
    });
    $.ajax = function(opts) {
        opts = opts || {};
        var data = opts.data || {};
        var _data = _.extend({}, data, {
            times: times,
            _token: token,
            source: 2
        });
        opts.data = _data;
        return ajax(opts);
    }
}();

function postFormData(_data, form, shuju) {
    $.ajax({
        type: 'POST',
        url: REMOTE.BAOMING,
        dataType: 'json',
        data: _.extend({}, _data, {
            utmid: cookie.get('utmid')
        }),
        success: function(data) {
            //console.log(data);
            if (data.code == 0) {
                ga('send', 'event', 'yuehui2_wap', shuju, _data.phone);
                //$('.shade-box').hide();
                //$('.pop-wrap').hide();
                setApplyCookies({
                    'rphone': _data.phone,
                    'rtimes': $('#_ctimes').val()
                });
                $('.js-baomingchenggong').popShow().find('.tuchu').html(data.data);
                // alert('报名成功!感谢您的参与.');
                if (form == $('form.shouji').get(0)) {
                    window.location.search.slice(1).split('&').forEach(function(x) {
                        if (x == 'from=game') {
                            window.location.href = 'http://yuehui.emao.com/hg/bdmld/';
                        }
                    });
                } else {
                    // window.location.search += '&random=' + new Date().getTime();
                    // window.location.href = window.location.href;
                }

            } else {
                alert(data.message);
            }
        },
        error: function(xhr, type) {
            alert('网络缓慢，请刷新页面后，重新提交！');
            // 即使加载出错，也得重置
        }
    });
}
//得到数据
function getFormData(form) {
    return _.reduce($(form).serializeArray(), function(s, x) {
        return s[x.name] = x.value, s;
    }, {});
}
//监听提交事件
function $event_submit(form, submit) {
    $(form).on(EVENTTYPE.TAP, submit, function() {
        var shuju = $(this).attr('data-from');
        checkData(form) && postFormData(getFormData($(this).closest('form').get(0)), $(form).get(0), shuju);
    });
}

function isPhone(phone) {
    var pattern = /^1[3|4|5|7|8]\d{9}$/;
    return pattern.test(phone);
}
//校验数据
function checkData(form) {
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
    var $sex = $form.find('[name="sex"]');
    var sex = $sex.val();
    if (name.trim() == '') {
        $name.siblings('.msg').html('姓名不能为空').closest('.item').addClass('error');
        return false;
    } else {
        $name.closest('.item').removeClass('error');
    }

    if (!isPhone(phone)) {
        $phone.siblings('.msg').html('请输入正确的手机号').closest('.item').addClass('error');
        return false;
    } else {
        $phone.closest('.item').removeClass('error');
    }

    if (brandid == '0') {
        $brandid.siblings('.msg').html('请选择品牌').closest('.item').addClass('error');
        return false;
    } else {
        $brandid.closest('.item').removeClass('error');
    }

    if (!seriesid) {
        $seriesid.siblings('.msg').html('请选择车系').closest('.item').addClass('error');
        return false;
    } else {
        $seriesid.closest('.item').removeClass('error');
    }
    return true;
}
//抽奖
function choujiang(texiao, html, lottery, choujiang) {
    var that = this;
    if (cookie.get('rphone')) {
        $.ajax({
            type: 'POST',
            url: REMOTE.CHOUJIANG,
            dataType: 'json',
            data: {
                phone: cookie.get('rphone')
            },
            success: function(data) {
                if (data.code == 0 || data.code == 1) {
                    // if (1) {
                    var container = $(that).closest('.beijing');
                    var prize = container.find('.img' + (data.data.number || 8) + ' .front').get(0).style.backgroundImage;
                    // var prize = container.find('.img' + 1 + ' .front').get(0).style.backgroundImage;
                    texiao();
                    container.find('.img').off();
                    setTimeout(function() {
                        container.find('.back').css({
                            'backgroundImage': prize + '!important'
                        });
                    }, 0);
                    container.one(EVENTTYPE.TAP, '.flip', function() {
                        $(this).addClass('bingo');
                        setTimeout(function() {
                            var pop = $('.js-huojiangxinxi').popShow();
                            pop.find('.tuchu').html(data.data.prize);
                            $('.lottery').html(html);
                            lottery(choujiang);
                            if (data.code == 1) {
                                pop.find('.title').html('')
                            }
                            pop.find('.queren').one(EVENTTYPE.TAP, function() {
                                $(this).closest('.pop').removeClass('active');
                            })
                        }, 1000);
                    })
                } else {
                    alert(data.message);
                }
            },
            error: function(xhr, type) {
                alert('网络缓慢，请刷新页面后，重新提交！');
                // 即使加载出错，也得重置
            }
        });
    } else {
        $('.js-baoming').popShow();
        // $('.js-baoming').find('.item').eq(1).hide();
        // $('.js-baoming').find('.item').eq(2).hide();
    }
}