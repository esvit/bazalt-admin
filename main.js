requirejs.config({
    baseUrl: '/app',
    packages: [{
        name: 'bazalt',
        location: '../bazalt/src/',
        main: 'main'
    }, {
        name: 'modules',
        location: '../bazalt/src/modules'
    }, {
        name: 'components',
        location: '../bazalt/src/components'
    }],
    paths: {
        'requirejs': '../bower_components/requirejs/require',

        // jquery
        'jquery': '../bower_components/jquery/jquery',
        'jquery-ui': '../bower_components/jquery-ui/ui',

        'bootstrap': '../bower_components/bootstrap/js',

        'angular': '../bower_components/angular/angular',
        'angular-resource': '../bower_components/angular-resource/angular-resource',
        'angular-route': '../bower_components/angular-route/angular-route',
        'angular-animate': '../bower_components/angular-animate/angular-animate',
        'angular-cookies': '../bower_components/angular-cookies/angular-cookies',
        'angular-route-segment': '../bower_components/angular-route-segment/build/angular-route-segment',
        'angular-file-upload': '../bower_components/angular-file-upload/angular-file-upload',

        'speakingurl': '../bower_components/speakingurl/speakingurl.min',

        // angular modules
        'angular-ui-select2': '../bower_components/angular-ui-select2/src/select2',
        'ng-ckeditor': '../bower_components/ng-ckeditor/ng-ckeditor.src',
        'ng-editable-tree': '../bower_components/ng-editable-tree/ng-editable-tree',
        'ngTable': '../bower_components/ng-table/ng-table.src',
        'ngFinder': '../bower_components/ng-finder/ng-finder.src',

        // etc
        'ckeditor': '../bower_components/ckeditor/ckeditor',
        'select2': '../bower_components/select2/select2'
    },
    shim: {
        'angular': { exports: 'angular', deps: ['jquery'] },
        'angular-resource': { deps: ['angular'] },
        'angular-route': { deps: ['angular'] },
        'angular-animate': { deps: ['angular'] },
        'angular-cookies': { deps: ['angular'] },
        'ngSocial': { deps: ['angular'] },
        'angular-route-segment': { deps: ['angular'] },
        'angular-smoothscroll': { deps: ['angular'] },
        'angular-file-upload': { deps: ['angular'] },
        'angular-ui-select2': { deps: ['angular', 'select2'] },

        'ng-ckeditor': { deps: ['ckeditor'] },
        'ng-editable-tree': { deps: ['angular', 'jquery-ui/jquery.ui.draggable', 'jquery-ui/jquery.ui.droppable', 'jquery-ui/jquery.ui.sortable'] },
        'ngTable': { deps: ['jquery', 'angular'] },
        'ngFinder': { deps: ['elfinder', 'angular'] },
        'jquery-galleria': { deps: ['jquery'] },
        'elfinder': { deps: ['jquery-ui/jquery.ui.draggable', 'jquery-ui/jquery.ui.droppable', 'jquery-ui/jquery.ui.selectable'] },

        // Bootstrap
        'bootstrap/modal': { deps: ['bootstrap/transition'] },
        'bootstrap-datepicker-locale/bootstrap-datepicker.ru': { deps: ['bootstrap-datepicker'] },

        // jquery ui for sortable
        'jquery-ui/jquery.ui.core': { deps: ['jquery'] },
        'jquery-ui/jquery.ui.widget': { deps: ['jquery-ui/jquery.ui.core'] },
        'jquery-ui/jquery.ui.mouse': { deps: ['jquery-ui/jquery.ui.widget'] },
        'jquery-ui/jquery.ui.draggable': { deps: ['jquery-ui/jquery.ui.mouse'] },
        'jquery-ui/jquery.ui.droppable': { deps: ['jquery-ui/jquery.ui.mouse'] },
        'jquery-ui/jquery.ui.selectable': { deps: ['jquery-ui/jquery.ui.mouse'] },
        'jquery-ui/jquery.ui.sortable': { deps: ['jquery-ui/jquery.ui.mouse'] }
    },
    priority: [
        'jquery', 'angular'
    ],
    urlArgs: 'v=1.1'
});

require(['main']);