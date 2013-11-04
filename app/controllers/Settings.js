define('controllers/Settings', [
    'app'
], function(app) {
    'use strict';

    app.controller('Backend.Controllers.Settings', ['$scope', 'bcSites.Factories.Option',  function($scope, OptionResource) {

        $scope.$watch('$site.options', function() {
            if (angular.isArray($scope.$site.options)) {
                $scope.$site.options = {};
            }
        });
        $scope.saveSettings = function(options){
            $scope.loading = true;
            $scope.saved = false;
            var o = new OptionResource(options);
            o.$saveOptions(function() {
                $scope.loading = false;
                $scope.saved = true;
            });
        }
    }]);
});