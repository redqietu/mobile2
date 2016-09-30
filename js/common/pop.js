$.fn.popInit = function() {
    window.GLOBALPOP = window.GLOBALPOP || this;
    var args = arguments;
    this.each(function(i, x) {
        var content = $(x).on(EVENTTYPE.TAP, '.close', function() {
            $(x).closest('.pop').removeClass('active');
        });
        content.find('.pop-content').each(function(i, x) {
            // var swiper = new Swiper(x, {
            //     scrollbar: '.swiper-scrollbar',
            //     direction: 'vertical',
            //     slidesPerView: 'auto',
            //     mousewheelControl: true,
            //     scrollbarDraggable: true,
            //     freeMode: true,
            //     scrollbarHide: false,
            // });
        });
        _.each(args, function(fn, i) {
            fn.call(x);
        });
    });
    return this;
};
$.fn.popShow = function() {
    window.GLOBALPOP.removeClass('active');
    $(this).addClass('active');
    $(this).find('.item').show();
    return this;
};