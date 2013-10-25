define('controllers/Main', [
    'app',

    'bootstrap/modal'
], function(app) {
    'use strict';

    app.controller('Backend.Controllers.Main', ['$scope', '$rootScope', 'bcPages.Factories.Page', 'bzLanguage',
        function($scope, $rootScope, PageResource, bzLanguage) {
        $scope.loginRequest = false;
        /**
         * On 'event:loginRequest' send credentials to the server.
         */
        $rootScope.$on('$user:loginRequired', function() {
            $scope.loginRequest = true;

            $('#loginForm').modal('show');
        });
        $rootScope.$on('$user:loginSuccess', function() {
            $('#loginForm').modal('hide');
        });

        // switch languages
        $scope.keydown = function($event) {
            var num = parseInt(String.fromCharCode($event.keyCode));
            if ($event.altKey && $event.ctrlKey && !$event.shiftKey && (num >= 1 && num <= 9)) {
                num--;
                if ($rootScope.languages.all.length >= num) {
                    $rootScope.languages.current = $rootScope.languages.all[num].id;
                    bzLanguage.language($rootScope.languages.all[num].id);
                }
            }
        }
    }]);
});