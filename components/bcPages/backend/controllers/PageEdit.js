define('components/bcPages/backend/controllers/PageEdit', [
    'angular',

    'components/bcPages/app',

    'speakingurl'
], function (angular, app, getSlug) {
    'use strict';

    app.directive('bzVideoLink', ['$http', function($http) {
        return {
            require: 'ngModel',
            link: function(scope, ele, attrs, c) {
                scope.$watch(attrs.ngModel, function(value) {
                    value = value || '';
                    var youtubeRegexp = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
                        isYoutube = value.match(youtubeRegexp) ? RegExp.$1 : false,
                        vimeoRegexp = /^https?:\/\/(?:www\.)?vimeo\.com\/\d{8}(?=\b|\/)/,
                        isVimeo = value.match(vimeoRegexp);
                    c.$setValidity('url', isYoutube || isVimeo);
                });
            }
        }
    }]);
    app.controller('bcPages.Controllers.PageEdit',
        ['$scope', '$filter', '$timeout', '$location', '$routeSegment', 'bcPages.Factories.Page',
            'bcPages.Factories.Category', 'bcPages.Factories.Tag',
            function ($scope, $filter, $timeout, $location, $routeSegment, PageResource, CategoryResource, TagsResource) {
                $scope.loading = {
                    categories: false,
                    page: false
                };
                $scope.item = new PageResource({
                    title: {},
                    body: {},
                    images: [],
                    tags: [],
                    videos: [{$new: true, url: ''}]
                });
                if ($routeSegment.$routeParams.id) {
                    $scope.loading.page = true;
                    PageResource.get({ 'id': $routeSegment.$routeParams.id }, function (page) {
                        page.videos.push({$new: true, url: ''});
                        $scope.loading.page = false;
                        // set new data
                        $timeout(function() {
                        $scope.item = page;
                        }, 100);
                    });
                } else {
                }


                $scope.checkForNameDelete = function($index) {
                    var videos = $scope.article.videos;
                    if (videos[$index].val === '') {
                        var el = $index === 0 ? videos[0] : videos[$index + 1];
                        $scope.article.videos.splice($index, 1);
                        $('.last-input').focus();
                    } else if (videos[$index].$new) {
                        videos[$index].$new = false;
                        $scope.article.videos.push({
                            $new: true
                        });
                    }
                };

                $scope.loading.categories = true;
                CategoryResource.get(function (data) {
                    $scope.loading.categories = false;

                    var items = [];

                    function walk(item, level) {
                        // 2 space per level
                        if (level > 0) { // without root item
                            item.prefix = new Array((level - 1) * 2 + 1).join(String.fromCharCode(160));
                            if (level > 1) { // only for childrens
                                item.prefix += '» ';
                            }
                            items.push(item);
                        }
                        for (var i = 0; i < item.children.length; i++) {
                            walk(item.children[i], level + 1);
                        }
                    }

                    walk(data, 0);
                    $scope.categories = items;
                });

                $scope.saveItem = function (item) {
                    $scope.loading.page = true;
                    $scope.loading.categories = true;
                    item.$save(function () {
                        $location.path('/pages');
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

                $scope.tagsOptions = {
                    tokenSeparators: [','],
                    tags: true,
                    formatResult: function (item) {
                        if (!item.id) {
                            return '<strong>' + item.title + '</strong>';
                        }
                        return item.title;
                    },
                    formatSelection: function (item) {
                        return item.title;
                    },
                    query: function (query) {
                        TagsResource.get({ 'q': query.term }, function (result) {
                            query.callback({ results: result.data });
                        });
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    },
                    createSearchChoice: function(term, data) {
                        if ($(data).filter(function () {
                            return this.title.toLowerCase().localeCompare(term.toLowerCase()) === 0;
                        }).length === 0) {
                            return {
                                id: term,
                                title: term,
                                url: getSlug(term),
                                isNew: true
                            };
                        }
                        return null;
                    }
                };
            }]);

});