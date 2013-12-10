define('components/bcUsers/backend/module', [
    'components/bcUsers/backend/app',

    'components/bcUsers/config',

    'components/bcUsers/backend/controllers/Main',
    'components/bcUsers/backend/controllers/Message',
    'components/bcUsers/backend/controllers/Messages',
    'components/bcUsers/backend/controllers/Gifts',
    'components/bcUsers/backend/controllers/GiftsTr',
    'components/bcUsers/backend/controllers/GiftTr',
    'components/bcUsers/backend/controllers/Gift',
    'components/bcUsers/backend/controllers/UserEdit'
], function(app) {
    'use strict';

    app.config(['$routeSegmentProvider', 'bzConfigProvider',
        function ($routeSegmentProvider, bzConfig) {

        $routeSegmentProvider
            .when('/users', 'users')
            .when('/users/gifts', 'usersGifts')
            .when('/users/messages', 'usersMessages')
            .when('/users/messages/:id', 'usersMessage')
            .when('/users/gifts/:id', 'usersGift')
            .when('/gifts/', 'gifts')
            .when('/gifts/:id', 'gift')
            .when('/users/:id', 'usersEdit');

        $routeSegmentProvider
            .segment('gifts', {
                templateUrl: bzConfig.templateUrl('/components/bcUsers/backend/views/tr-gifts.html'),
                controller: 'bcUsers.Controllers.GiftsTr'
            })
            .segment('gift', {
                templateUrl: bzConfig.templateUrl('/components/bcUsers/backend/views/tr-gift.html'),
                controller: 'bcUsers.Controllers.GiftTr'
            })
            .segment('users', {
                templateUrl: bzConfig.templateUrl('/components/bcUsers/backend/views/users.html'),
                controller: 'bcUsers.Controllers.Main'
            })
            .segment('usersGifts', {
                templateUrl: bzConfig.templateUrl('/components/bcUsers/backend/views/gifts.html'),
                controller: 'bcUsers.Controllers.Gifts'
            })
            .segment('usersMessages', {
                templateUrl: bzConfig.templateUrl('/components/bcUsers/backend/views/messages.html'),
                controller: 'bcUsers.Controllers.Messages'
            })
            .segment('usersMessage', {
                templateUrl: bzConfig.templateUrl('/components/bcUsers/backend/views/message.html'),
                controller: 'bcUsers.Controllers.Message'
            })
            .segment('usersGift', {
                templateUrl: bzConfig.templateUrl('/components/bcUsers/backend/views/gift.html'),
                controller: 'bcUsers.Controllers.Gift'
            })
            .segment('usersEdit', {
                templateUrl: bzConfig.templateUrl('/components/bcUsers/backend/views/edit.html'),
                dependencies: ['id'],
                controller: 'bcUsers.Controllers.UserEdit'
            });
    }]);
});