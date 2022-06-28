const workboxVersion = '5.1.3';

importScripts(`https://storage.googleapis.com/workbox-cdn/releases/${workboxVersion}/workbox-sw.js`);

workbox.core.setCacheNameDetails({
    prefix: "your name"
});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

// 注册成功后要立即缓存的资源列表
// 具体缓存列表在gulpfile.js中配置，见下文
workbox.precaching.precacheAndRoute([{"revision":"e6043411d258b7094f5442b358346a93","url":"./404.html"},{"revision":"f4d0bf7a9958e84af9498ded20c6e6eb","url":"./index.html"},{"revision":"d88b63a0b350b4838f3398a38f0520e8","url":"./js/main.js"},{"revision":"9413b1df55a33a053ce5ee7d197a0596","url":"./css/index.css"}],{
    directoryIndex: null
});

// 清空过期缓存
workbox.precaching.cleanupOutdatedCaches();

// 图片资源（可选，不需要就注释掉）
workbox.routing.registerRoute(
    /\.(?:png|jpg|jpeg|gif|bmp|webp|svg|ico)$/,
    new workbox.strategies.CacheFirst({
        cacheName: "images",
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 1000,
                maxAgeSeconds: 60 * 60 * 24 * 30
            }),
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200]
            })
        ]
    })
);

// 字体文件（可选，不需要就注释掉）
workbox.routing.registerRoute(
    /\.(?:eot|ttf|woff|woff2)$/,
    new workbox.strategies.CacheFirst({
        cacheName: "fonts",
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 1000,
                maxAgeSeconds: 60 * 60 * 24 * 30
            }),
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200]
            })
        ]
    })
);

// 谷歌字体（可选，不需要就注释掉）
//workbox.routing.registerRoute(
//    /^https:\/\/fonts\.googleapis\.com/,
//    new workbox.strategies.StaleWhileRevalidate({
//        cacheName: "google-fonts-stylesheets"
//    })
//);
//workbox.routing.registerRoute(
//    /^https:\/\/fonts\.gstatic\.com/,
//    new workbox.strategies.CacheFirst({
//        cacheName: 'google-fonts-webfonts',
//        plugins: [
//            new workbox.expiration.ExpirationPlugin({
//                maxEntries: 1000,
//                maxAgeSeconds: 60 * 60 * 24 * 30
//            }),
//            new workbox.cacheableResponse.CacheableResponsePlugin({
//                statuses: [0, 200]
//            })
//        ]
//    })
//);

// jsdelivr的CDN资源（可选，不需要就注释掉）
workbox.routing.registerRoute(
    /^https:\/\/fastly\.jsdelivr\.net/,
    new workbox.strategies.CacheFirst({
        cacheName: "static-libs",
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 1000,
                maxAgeSeconds: 60 * 60 * 24 * 30
            }),
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200]
            })
        ]
    })
);

workbox.googleAnalytics.initialize();