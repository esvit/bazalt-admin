define('components/bcUsers/backend/controllers/Message', [
    'components/bcUsers/backend/app',

    'components/bcUsers/factories/MessageResource'
], function (app) {
    'use strict';

    app.controller('bcUsers.Controllers.Message', ['$scope', '$location', 'bcUsers.Factories.Message', '$routeSegment',
        function ($scope, $location, MessageResource, $routeSegment) {

            if ($routeSegment.$routeParams.id) {
                MessageResource.get({ 'id': $routeSegment.$routeParams.id }, function (gift) {
                    $scope.message = gift;
                }, function () {
                });
            }

            $scope.saveMessage = function(message) {
                $scope.loading = true;
                console.info(message);
                message.$save(function() {
                    $scope.loading = false;
                    $location.url('/users/messages');
                });
            }

        }]);



});