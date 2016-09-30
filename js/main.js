! function(Swiper, $, echo, $ajax_yuehuirexiaoche, $ajax_chexi_liandong, $event_submit, lottery, choujiang) {
    //加载策略
    echo.init({
        offset: 100,
        throttle: 250,
        unload: false,
        callback: function(element, op) {

        }
    });
    //焦点图
    var swiper = new Swiper('#xinwen', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30,
        lazyLoading: true,
        effect: 'coverflow',
        lazyLoadingInPrevNext: true,
        lazyLoadingInPrevNextAmount: 2,
    });
    var swiper = new Swiper('#lipin', {
        slidesPerView: 2,
        spaceBetween: 0,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        lazyLoading: true,
        lazyLoadingInPrevNext: true,
        lazyLoadingInPrevNextAmount: 2,
    });
    var swiper = new Swiper('#zhongjiangmingdan', {
        slidesPerView: 2,
        spaceBetween: 0,
        autoplay: 2500,
        loop: true,
    });


    //约惠热销车轮换图
    $('.js-section2').tab('.city-nav li', void 0, function(li) {
        var loc = $(this).find('[data-val]').attr('data-val');
        $ajax_yuehuirexiaoche(loc, 0);
    }).tab('.logos li,.adwrapper', void 0, function(li) {
        var brandId = $(this).attr('data-val');
        var loc = $('.js-section2 .city-nav li.active').find('[data-val]').attr('data-val');
        $ajax_yuehuirexiaoche(loc, brandId);
    });

    //表单
    //弹出
    $('.pop').popInit(function() {
        $ajax_chexi_liandong.call(this, '#dbrandid', '#dseriesid');
    });
    //立即报名
    $('.js-lijibaoming').lijibaoming();

    //form.shouji最下面的表单
    $ajax_chexi_liandong.call($('form.shouji').get(0), '#brandID', '#chexiID');

    //表单提交数据
    $event_submit('form.shouji', '.submit');
    $event_submit('.js-baoming form', '.submit');
    //立即约惠报名

    $('.yimaojia').lijibaoming();
    //查看规则
    $('.js-chakanguize').on(EVENTTYPE.TAP, function() {
        $('.js-lipinguize').popShow();
    });
    lottery(choujiang);
    //报名成功弹出框
    $('.js-baomingchenggong').on(EVENTTYPE.TAP, '.queren', function() {
        window.location.hash = 'choujiangla';
        $('.js-baomingchenggong').removeClass('active');
    });
}(Swiper, $, echo, $ajax_yuehuirexiaoche, $ajax_chexi_liandong, $event_submit, lottery, choujiang);