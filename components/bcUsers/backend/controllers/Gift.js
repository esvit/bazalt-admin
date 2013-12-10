define([
    'angular',
    'components/bcUsers/backend/app',

    'components/bcUsers/factories/GiftResource'
], function (angular, app) {
    'use strict';

        app.controller('bcUsers.Controllers.Gift',
            ['$scope', '$filter', 'bzConfig', '$location', '$routeSegment', 'bcUsers.Factories.Gift', '$fileUploader', '$parse',
                function ($scope, $filter, bzConfig, $location, $routeSegment, GiftResource, $fileUploader, $parse) {
                    $scope.loading = {
                        categories: false,
                        page: false
                    };
                    if ($routeSegment.$routeParams.id) {
                        $scope.loading.page = true;
                        GiftResource.get({ 'id': $routeSegment.$routeParams.id }, function (page) {
                            $scope.loading.page = false;
                            // set new data
                            $scope.item = page;
                        });
                    } else {
                        $scope.item = new GiftResource({
                            title: {},
                            body: {},
                            images: []
                        });
                    }

                    var uploader = $fileUploader.create({
                        scope: $scope,                          // to automatically update the html. Default: $rootScope
                        url: bzConfig.resource('/auth/users/gifts/').replace('\\:', ':')
                    });

                    uploader.bind('afteraddingfile', function (event, item) {
                        item.upload();
                    });

                    uploader.bind('success', function (event, xhr, item) {
                        var response = $parse(xhr.response)();
                        $scope.item.image = response;
                    });

                    $scope.saveItem = function (item) {
                        $scope.loading.page = true;
                        $scope.loading.categories = true;
                        item.$save(function () {
                            $location.path('/users/gifts');
                        }, function (res) {
                            $scope.loading.page = false;
                            $scope.loading.categories = false;
                            if (res.status == 400) {
                                $scope.itemEdit.invalidForm(res.data);
                                $timeout(function () {
                                    var el = $('.has-error:first');
                                    $.scrollTo(el);
                                }, 100);
                            }
                        });
                    };
                }]);


});