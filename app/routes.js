define('routes', [
    'angular',
    'app'
], function (angular, app) {
    'use strict';

    app.config(['$routeSegmentProvider', '$locationProvider', '$sceProvider', 'bzConfigProvider',
        function ($routeSegmentProvider, $locationProvider, $sceProvider, bzConfig) {
            $locationProvider
                .html5Mode(false)
                .hashPrefix('!');

            bzConfig.templatePrefix('');

            $routeSegmentProvider.options.autoLoadTemplates = true;

            $routeSegmentProvider
                .when('/', 'main')
                .when('/settings', 'settings')
                .when('/settings/general', 'settings.general')
                .when('/settings/languages', 'settings.languages')
                .when('/settings/notifications', 'settings.notifications')
                .when('/login', 'login');

            $routeSegmentProvider
                .segment('main', {
                    templateUrl: '/views/dashboard.html',
                    controller: 'Backend.Controllers.Dashboard'
                })
                .segment('login', {
                    templateUrl: '/views/login.html',
                    controller: 'Backend.Controllers.Login'
                })
                .segment('settings', {
                    templateUrl: '/views/settings.html',
                    controller: 'Backend.Controllers.Settings'
                })
                .within()
                .segment('general', {
                    templateUrl: '/views/settings/general.html'
                })
                .up().within().segment('languages', {
                    templateUrl: '/views/settings/languages.html'
                })
                .up().within().segment('notifications', {
                    templateUrl: '/views/settings/notifications.html'
                });

            $sceProvider.enabled(false);
        }]);

    app.run(['$rootScope', '$location', '$user', '$routeSegment', function ($rootScope, $location, $user, $routeSegment) {
        $rootScope.languages = {
            current: 'en',
            all: [
                {
                    id: 'en',
                    title: 'English',
                    ico: 'gb'
                },
                {
                    id: 'ru',
                    title: 'Русский',
                    ico: 'ru'
                }
            ]
        };
        $rootScope.$on('$routeChangeStart', function (e, next, current) {
            // check user login for route
            $user.onLoad(function(user) {
                if (!$user.data || $user.data.is_guest) {
                    $location.path('/login');
                    $rootScope.$broadcast('$user:loginRequired');
                }
            });
        });
        $rootScope.$routeSegment = $routeSegment;
    }]);

});