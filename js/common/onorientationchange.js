! function() {
    var html = document.documentElement;

    function x() {
        switch (window.orientation) {

            　　
            case 0:
                html.setAttribute('orientation', 0);
                break;
            case -90:
                html.setAttribute('orientation', -90);
                break;
            case 90:
                html.setAttribute('orientation', 90);
                break;
            case 180:
                html.setAttribute('orientation', 180);
                break;
        }
    }
    window.onorientationchange = x;
    x();
}();