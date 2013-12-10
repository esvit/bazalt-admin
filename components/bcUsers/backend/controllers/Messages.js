define('components/bcUsers/backend/controllers/Messages', [
    'components/bcUsers/backend/app',

    'components/bcUsers/factories/MessageResource'
], function (app) {
    'use strict';

    app.controller('bcUsers.Controllers.Messages', ['$scope', '$location', 'bcUsers.Factories.Message', 'ngTableParams',
        function ($scope, $location, MessageResource, ngTableParams) {

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

                        MessageResource.get(params.url(), function (result) {
                            $scope.tableParams.total(result.pager.total);
                            $defer.resolve($scope.users = result.data);
                        });
                    }
                });

            $scope.togglePublished = function (item) {
                var u = new MessageResource(item);
                $scope.loading = true;
                u.$save(function() {
                    $scope.loading = false;
                });
            };

            $scope.deleteUser = function (user) {
                user.$deleting = true;
                var u = new MessageResource(user);
                u.$delete(function() {
                    user.$deleting = false;
                    user.is_deleted = 1;
                });
            };
            $scope.restoreUser = function (user) {
                user.$deleting = true;
                var u = new MessageResource(user);
                u.is_deleted = 0;
                u.$save(function() {
                    user.$deleting = false;
                    user.is_deleted = 0;
                });
            };
        }]);


});