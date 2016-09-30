$.fn.lijibaoming = function() {
    var $baoming = $('.js-baoming')
    $(this).on(EVENTTYPE.TAP, '.submit', function() {
        var data = $(this).closest('.item').find('.goucheyixiang');
        var chexi = data.attr('data-chexi');
        var pinpai = data.attr('data-pinpai');
        var location = $('.js-city-nav').find('.active .location').attr('data-location');
        $baoming.popShow();
        $baoming.find('.js-location').val(location);
        $baoming.find('.js-pinpai').val(pinpai);
        setTimeout(function() {

            $baoming.find('.js-pinpai').trigger('change');
            $baoming.find('.js-chexi').attr('data-cur', chexi);
        }, 0);
    });
};