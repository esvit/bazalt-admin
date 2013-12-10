define('components/bcUsers/factories/GiftTrResource', [
    'components/bcUsers/app'
], function(app) {

    app.factory('bcUsers.Factories.GiftTr', ['$resource', 'bzConfig',
        function ($resource, bzConfig) {
        return $resource(bzConfig.resource('/auth/users/tr/:id'), { 'id': '@item_id', 'user_id': '@user_id' }, {
            'prepare': { 'method': 'PUT' }
        });
    }]);

});