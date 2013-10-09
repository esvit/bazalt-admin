define('controllers/SidebarMenu', [
    'app'
], function(app) {
    'use strict';

    app.controller('Backend.Controllers.SidebarMenu', ['$scope', '$translate', function($scope, $translate) {

        $scope.items = [
            {
                'text': $translate('Dashboard'),
                'link': '#!/',
                'icon': 'dashboard'
            },
            {
                'text': 'Pages',
                'link': '#!/pages',
                'icon': 'file-alt',
                'items': [{
                    'text': 'Pages',
                    'link': '#!/pages'
                },{
                    'text': 'Categories',
                    'link': '#!/pages/categories'
                }]
            },
            {
                'text': 'Menu',
                'link': '#!/menu',
                'icon': 'reorder'
            },
            {
                'text': 'Users',
                'link': '#!/users',
                'icon': 'user'
            },
            {
                'text': 'Files',
                'link': '#!/files',
                'icon': 'file'
            }
        ];
    }]);
});