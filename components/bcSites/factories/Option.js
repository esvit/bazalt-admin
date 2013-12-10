define('components/bcSites/factories/Option', [
    'components/bcSites/app'
], function(app) {
    'use strict';

    app.factory('bcSites.Factories.Option', ['$resource', 'bzConfig', function ($resource, bzConfig) {
        return $resource(bzConfig.resource('/sites/options'), {}, {
            'saveOptions': { 'method': 'POST' }
        });
    }]);

});