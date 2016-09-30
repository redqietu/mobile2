(function() {
    var dpr, rem, scale, width;
    var html = document.documentElement;
    var base = html.getAttribute('data-base') || 750;
    var meta = document.querySelector('meta[name="viewport"]');
    dpr = window.devicePixelRatio || 1;
    scale = 1 / dpr;

    // 设置viewport，进行缩放，达到高清效果
    meta.setAttribute('content', 'width=device-width,initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');


    width = html.getBoundingClientRect().width;

    rem = width / base * 100;

    // 设置data-dpr以及font-size属性，留作的css hack之用
    html.setAttribute('data-dpr', dpr);
    html.setAttribute('style', "font-size:" + rem + 'px');


    window.dpr = dpr;
    window.rem = rem;

})();