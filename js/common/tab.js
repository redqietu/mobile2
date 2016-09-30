$.fn.tab = function(f, t, fn) {
    var that = this;
    this.on(EVENTTYPE.TAP, f, function() {
        $(that).find(f).removeClass('active');
        $(this).addClass('active');
        fn.call(this, this);
    });
    return this;
};