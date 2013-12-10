define('controllers/SidebarMenu', [
    'app'
], function(app) {
    'use strict';

    app.controller('Backend.Controllers.SidebarMenu', ['$scope', '$translate', function($scope, $translate) {

        $scope.items = [
            {
                'text': 'Страницы',
                'link': '#!/pages',
                'icon': 'file-alt',
                'items': [{
                    'text': 'Страницы',
                    'link': '#!/pages'
                },{
                    'text': 'Категории',
                    'link': '#!/pages/categories'
                }]
            },
            {
                'text': 'Меню',
                'link': '#!/menu',
                'icon': 'reorder'
            },
            {
                'text': 'Пользователи',
                'link': '#!/users',
                'icon': 'user',
                'items': [{
                    'text': 'Пользователи',
                    'link': '#!/users'
                },{
                    'text': 'Подарки',
                    'link': '#!/users/gifts'
                },{
                    'text': 'Сообщения',
                    'link': '#!/users/messages'
                }]
            },
            /*{
                'text': 'Sites',
                'link': '#!/sites',
                'icon': 'globe'
            },*/
            {
                'text': 'Подарки',
                'link': '#!/gifts',
                'icon': 'gift'
            },
            {
                'text': 'Файлы',
                'link': '#!/files',
                'icon': 'file'
            }
        ];
    }]);
});