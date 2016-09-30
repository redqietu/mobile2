! function() {
    var device = function() { //copy others
        var device,
            find,
            userAgent;
        device = {};

        userAgent = window.navigator.userAgent.toLowerCase();

        device.ios = function() {
            return device.iphone() || device.ipod() || device.ipad();
        };

        device.iphone = function() {
            return !device.windows() && find('iphone');
        };

        device.ipod = function() {
            return find('ipod');
        };

        device.ipad = function() {
            return find('ipad');
        };

        device.android = function() {
            return !device.windows() && find('android');
        };

        device.androidPhone = function() {
            return device.android() && find('mobile');
        };

        device.androidTablet = function() {
            return device.android() && !find('mobile');
        };

        device.blackberry = function() {
            return find('blackberry') || find('bb10') || find('rim');
        };

        device.blackberryPhone = function() {
            return device.blackberry() && !find('tablet');
        };

        device.blackberryTablet = function() {
            return device.blackberry() && find('tablet');
        };

        device.windows = function() {
            return find('windows');
        };

        device.windowsPhone = function() {
            return device.windows() && find('phone');
        };

        device.windowsTablet = function() {
            return device.windows() && (find('touch') && !device.windowsPhone());
        };

        device.fxos = function() {
            return (find('(mobile;') || find('(tablet;')) && find('; rv:');
        };

        device.fxosPhone = function() {
            return device.fxos() && find('mobile');
        };

        device.fxosTablet = function() {
            return device.fxos() && find('tablet');
        };

        device.meego = function() {
            return find('meego');
        };

        device.cordova = function() {
            return window.cordova && location.protocol === 'file:';
        };

        device.nodeWebkit = function() {
            return typeof window.process === 'object';
        };

        device.mobile = function() {
            return device.androidPhone() || device.iphone() || device.ipod() || device.windowsPhone() || device.blackberryPhone() || device.fxosPhone() || device.meego();
        };

        device.tablet = function() {
            return device.ipad() || device.androidTablet() || device.blackberryTablet() || device.windowsTablet() || device.fxosTablet();
        };

        device.desktop = function() {
            return !device.tablet() && !device.mobile();
        };

        device.television = function() {
            var i, tvString;

            television = [
                "googletv",
                "viera",
                "smarttv",
                "internet.tv",
                "netcast",
                "nettv",
                "appletv",
                "boxee",
                "kylo",
                "roku",
                "dlnadoc",
                "roku",
                "pov_tv",
                "hbbtv",
                "ce-html"
            ];

            i = 0;
            while (i < television.length) {
                if (find(television[i])) {
                    return true;
                }
                i++;
            }
            return false;
        };

        device.portrait = function() {
            return (window.innerHeight / window.innerWidth) > 1;
        };

        device.landscape = function() {
            return (window.innerHeight / window.innerWidth) < 1;
        };
        find = function(needle) {
            return userAgent.indexOf(needle) !== -1;
        };
        return device;
    }();

    var html = document.documentElement;
    EVENTTYPE = {};
    if (device.mobile()) {
        html.setAttribute('class', (html.getAttribute('class') || '' + ' mobile').trim());
        EVENTTYPE.TAP = 'tap';
    }
    if (device.desktop()) {
        html.setAttribute('class', (html.getAttribute('class') || '' + ' desktop').trim());
        html.style.fontSize = '100px';
        EVENTTYPE.TAP = 'click';
    }
    if (device.tablet()) {
        html.setAttribute('class', (html.getAttribute('class') || '' + ' tablet').trim());
        EVENTTYPE.TAP = 'tap';
    }

}();