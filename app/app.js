define('app', [
    'angular', 'angular-animate', 'angular-route', 'angular-route-segment', 'bz-switch', 'ngTable',

    'modules/bzConfig/module',
    'modules/bzLanguage/module',
    'modules/bzMenu/module',
    'modules/bzLoading/module',
    'modules/bzConfirm/module',
    'modules/bzUploader/module',

    'components/bcPages/backend/module',
    'components/bcMenu/backend/module',
    'components/bcFiles/backend/module',
    'components/bcSites/backend/module',
    'components/bcUsers/backend/module'
], function (angular) {
    'use strict';

    var modules = ['ngAnimate', 'ngRoute', 'route-segment', 'view-segment', 'bzSwitch', 'ngTable'];

    // modules
    modules.push('bzConfig');
    modules.push('bzLanguage');
    modules.push('bzMenu');
    modules.push('bzLoading');
    modules.push('bzConfirm');
    modules.push('bzUploader');
    //modules.push('bzWidgets');

    // components
    modules.push('Components.bcPages.Backend');
    modules.push('Components.bcMenu.Backend');
    modules.push('Components.bcFiles.Backend');
    modules.push('Components.bcUsers.Backend');
    modules.push('Components.bcSites.Backend');

    return angular.module('app', modules);
});