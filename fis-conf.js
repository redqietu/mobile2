fis.media('build').match('*', {
    domain: 'http://zt.m.emao.com/201607/Q2bps'
}).match('::package', {
    postpackager: fis.plugin('loader', {
        allInOne: true
    })
}).match('*.js', {
    // fis-optimizer-uglify-js 插件进行压缩，已内置
    optimizer: fis.plugin('uglify-js')
}).match('*.css', {
    // fis-optimizer-clean-css 插件进行压缩，已内置
    optimizer: fis.plugin('clean-css')
}).match('*.png', {
    // fis-optimizer-png-compressor 插件进行压缩，已内置
    optimizer: fis.plugin('png-compressor')
}).match('*', {
    deploy: fis.plugin('local-deliver', {
        to: '../output'
    })
});