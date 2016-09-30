var lottery = function(choujiang) {
    var html = $('.lottery').html();
    var _lottery = $('.lottery .img');
    var _container = $('.lottery .wrapper');

    function texiao() {
        _container.addClass('active').addClass('hover');
        _lottery.off('touchend').off('touchstart');
        setTimeout(function() {
            _container.removeClass('active').addClass('current');
            _container.addClass('over');
            setTimeout(function() {
                var flip = $('.flip').one(EVENTTYPE.TAP, function() {
                    $(this).addClass('bingo');
                    flip.off(EVENTTYPE.TAP);
                });
            }, 1000);
        }, 1000);
    }
    _lottery.on(EVENTTYPE.TAP, _.partial(choujiang, texiao, html, lottery, choujiang));
    _lottery.on('touchstart', function() {
        _container.addClass('hover');
    }).on('touchend', function() {
        _container.removeClass('hover');
    });
}