define('components/bcUsers/backend/controllers/GiftTr', [
    'components/bcUsers/backend/app',

    'components/bcUsers/factories/GiftTrResource'
], function (app) {
    'use strict';

    app.controller('bcUsers.Controllers.GiftTr', ['$scope', '$location', 'bcUsers.Factories.GiftTr', '$routeSegment',
        function ($scope, $location, GiftResource, $routeSegment) {

            if ($routeSegment.$routeParams.id) {
                GiftResource.get({ 'id': $routeSegment.$routeParams.id }, function (gift) {
                    $scope.gift = gift;
                }, function () {
                });
            }

            $scope.$watch('gift.status', function(val){
                if (val) {
                    $scope.gift.$save();
                }
            });

        }]);


});