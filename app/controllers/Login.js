define('controllers/Login', [
    'app',

    'bootstrap/modal'
], function(app) {
    'use strict';

    app.controller('Backend.Controllers.Login', ['$scope', '$user', '$location', function($scope, $user, $location) {
        $scope.login = function(user) {
            $scope.loading = true;
            $user.login(user, function() {
                $scope.errors = false;
                $scope.loading = false;
                $location.path('/');
            }, function(res){
                $scope.loading = false;
                if (res.status == 400) {
                    $scope.errors = res.data;
                }
            });
        };
    }]);
});