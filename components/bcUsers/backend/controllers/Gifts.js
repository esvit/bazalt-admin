define('components/bcUsers/backend/controllers/Gifts', [
    'components/bcUsers/backend/app',

    'components/bcUsers/factories/GiftResource'
], function (app) {
    'use strict';

    app.controller('bcUsers.Controllers.Gifts', ['$scope', '$location', 'bcUsers.Factories.Gift', 'ngTableParams',
        function ($scope, $location, GiftResource, ngTableParams) {

            var tableParams = {
                page: 1,
                count: 10,
                counts: []
            };
            $scope.tableParams = new ngTableParams(
                angular.extend(tableParams, $location.search()),
                {
                    getData: function ($defer, params) {
                        var urlParams = angular.copy(params.url());

                        $location.search(urlParams);

                        GiftResource.get(params.url(), function (result) {
                            $scope.tableParams.total(result.pager.total);
                            $defer.resolve($scope.users = result.data);
                        });
                    }
                });

            $scope.togglePublished = function (item) {
                var u = new GiftResource(item);
                $scope.loading = true;
                u.$save(function() {
                    $scope.loading = false;
                });
            };

            $scope.deleteUser = function (user) {
                user.$deleting = true;
                var u = new baUserResource(user);
                u.$delete(function() {
                    user.$deleting = false;
                    user.is_deleted = 1;
                });
            };
            $scope.restoreUser = function (user) {
                user.$deleting = true;
                var u = new baUserResource(user);
                u.is_deleted = 0;
                u.$save(function() {
                    user.$deleting = false;
                    user.is_deleted = 0;
                });
            };
        }]);


});