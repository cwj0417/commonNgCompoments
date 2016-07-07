angular.module('config', [])
    .constant('isIE', function() {
        var ieVersion, isIE, ua;
        return ua = window.navigator.userAgent.toLowerCase(),
            isIE = !1,
            ieVersion = null,
            ua.match(/(msie|MSIE)/) || ua.match(/(t|T)rident/) ? (isIE = !0, ieVersion = ua.match(/((msie|MSIE)\s|rv:)([\d\.]+)/)[3], ieVersion = parseInt(ieVersion)) : isIE = !1, {
                isIE: isIE,
                ieVersion: ieVersion
            }
    })
    .constant("hasFlash", function() {
        var e, error, fo, hasFlash;
        hasFlash = !1;
        try {
            fo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),
                fo && (hasFlash = !0)
        } catch (error) {
            e = error,
                navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"] && navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin && (hasFlash = !0)
        }
        return hasFlash
    })
    .constant("platform", function() {
        var bot_ua, isAndroid, isBot, isiOS, isiPad, isiPhone, isiPod, os, osv, platform, ua, v;
        return ua = window.navigator.userAgent.toLowerCase(),
            bot_ua = ["applebot", "baiduspider", "bingbot", "bingpreview", "developers.google.com", "embedly", "googlebot", "gigabot", "hatena::useragent", "ia_archiver", "linkedinbot", "madridbot", "msnbot", "rogerbot", "outbrain", "slackbot", "showyoubot", "yahoo! slurp", "Y!J-", "yandex", "yeti", "yodaobot", "facebookexternalhit", "twitterbot"],
            isBot = RegExp("" + bot_ua.join("|")).test(ua),
            isiPhone = /iphone/.test(ua),
            isiPod = /ipod/.test(ua),
            isiPad = /ipad/.test(ua),
            isiOS = isiPhone || isiPod || isiPad,
            isAndroid = /android/i.test(ua),
            isiOS || isiPad ? (os = "ios", v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/), osv = parseFloat([v[1], v[2], v[3] || "0"].join("."))) : isAndroid ? (os = "android", osv = parseFloat(ua.slice(ua.indexOf("android") + 8))) : (os = "other", osv = ""),
            platform = {},
            platform.tablet = isiPad || isAndroid && !/mobile/.test(ua),
            platform.mobile = (isiOS || isAndroid) && !platform.tablet,
            platform.pc = !platform.mobile && !platform.tablet,
            platform.os = os,
            platform.osv = osv,
            platform.bot = isBot,
            platform
    })
    .config(["$provide", "$locationProvider", "$logProvider", "isIE", "platform", "cfpLoadingBarProvider", "$httpProvider", "CacheFactoryProvider", "growlNotificationsProvider", "$sceDelegateProvider", "$compileProvider", "$analyticsProvider", function($provide, $locationProvider, $logProvider, isIE, platform, cfpLoadingBarProvider, $httpProvider, CacheFactoryProvider, growlNotificationsProvider, $sceDelegateProvider, $compileProvider, $analyticsProvider) {
        var _ie;
        return $provide.decorator("$uiViewScroll", function() {
                return function(uiViewElement) {
                    return angular.element("body.pc #layout header").removeClass("fix").css({
                            bottom: ""
                        }),
                        angular.element("body.pc #layout .view-container").removeClass("fix").css({
                            width: "",
                            bottom: ""
                        }),
                        window.scrollTo(0, 0)
                }
            }),
            _ie = isIE(),
            "undefined" == typeof window.history || _ie.isIE && _ie.ieVersion <= 9 ? ($locationProvider.html5Mode(!1), $locationProvider.hashPrefix("!")) : $locationProvider.html5Mode(!0),
            $logProvider.debugEnabled(!0),
            $httpProvider.defaults.withCredentials = !0,
            $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;application/json;charset=utf-8",
            $httpProvider.interceptors.push(["$q", "$rootScope", "$location", "$injector", function($q, $rootScope, $location, $injector) {
                return {
                    request: function(config) {
                        var apiHost, user;
                        return apiHost = $injector.get("apiHost"),
                            config.url.match(new RegExp(apiHost)) && (config.headers["X-Requested-With"] = "XMLHttpRequest", angular.isDefined($rootScope.User) && $rootScope.User.loggedIn() && (user = $rootScope.User.get(), config.headers["X-Hibiki-User-Id"] = user.id, config.headers["X-Hibiki-Access-Token"] = user.access_token)),
                            config || $q.when(config)
                    },
                    response: function(response) {
                        var $http, $timeout, access_token_expires;
                        return access_token_expires = response.headers("X-Hibiki-Access-Token-Expires"), !response.config.cached && angular.isDefined($rootScope.User) && $rootScope.User.loggedIn() && access_token_expires && $rootScope.User.set({
                                expired_at: access_token_expires
                            }),
                            $http = $injector.get("$http"),
                            $timeout = $injector.get("$timeout"),
                            $rootScope = $injector.get("$rootScope"),
                            $http.pendingRequests.length < 1 && $timeout(function() {
                                return $http.pendingRequests.length < 1 ? $rootScope.htmlReady() : void 0
                            }, 700),
                            response || $q.when(response)
                    },
                    responseError: function(rejection) {
                        var status;
                        return status = rejection.status,
                            $q.reject(rejection)
                    }
                }
            }]),
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|intent|jphibikiradio):/),
            $sceDelegateProvider.resourceUrlWhitelist(["self", "https://hibikiradiovms.blob.core.windows.net/static/**", "https://s3-ap-northeast-1.amazonaws.com/hibiki-terms/**", "jphibikiradio://**"])
    }])
    .run(["$templateCache", function($templateCache) {
        $templateCache.put('app/tpl/tpl.html', '<common-config></common-config>')
    }])
