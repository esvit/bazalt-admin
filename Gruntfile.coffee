path = require 'path'
fs = require 'fs'
url = require 'url'

# Rewrite for angular, if file doesn't exist show index.html
urlRewrite = (rootDir, indexFile) ->
    indexFile = indexFile || "index.html"
    return (req, res, next) ->
        path = url.parse(req.url).pathname
         
        fs.readFile './' + rootDir + path, (err, buf) ->
            return next() unless err
             
            fs.readFile './' + rootDir + '/' + indexFile, (error, buffer) ->
                return next(error) if error
                 
                resp =
                    headers:
                        'Content-Type': 'text/html'
                        'Content-Length': buffer.length
                    body: buffer

                res.writeHead 200, resp.headers
                res.end resp.body

module.exports = (grunt) ->
    grunt.initConfig

        copy:
            theme:
                files: [{
                    expand: true
                    src: ['assets/**', '!assets/less/**', 'bazalt.js']
                    dest: 'build/'
                }]

        less:
            dev:
                src: 'assets/less/theme.less'
                dest: 'assets/css/theme.css'
            theme:
                src: 'assets/less/theme.less'
                dest: './build/assets/css/theme.css'

        watch:
            css:
                files: 'assets/**/*.less'
                tasks: ['less:dev', 'beep']
                options:
                    livereload: true
            html:
                files: 'views/**/*.html'
                tasks: 'beep'
                options:
                    livereload: true

        connect:
            development:
                options:
                    port: 8000
                    base: 'src'
                    middleware: (connect, options) -> [
                        urlRewrite 'src'
                        connect.static options.base
                        connect.directory options.base
                    ]

        requirejs:
            admin:
                options:
                    baseUrl: './app'
                    optimize: 'none'
                    preserveLicenseComments: false
                    useStrict: true
                    wrap:
                        start: "(function() {"
                        end: "require(['main']) }());"
                    mainConfigFile: 'main.js'
                    name: 'main'
                    include: ['requirejs']
                    exclude: ['./views.js']
                    out: 'build/js/main.min.js'

        uglify:
            frontend:
                src: ['build/js/main.min.js']
                dest: 'build/js/main.min.js'

            options:
                compress: false
                mangle: false
                preserveComments: false
                beautify:
                    ascii_only: true
                sourceMappingURL: (fileName) ->
                    fileName.replace(/^build\/js\//, '')
                    .replace(/\.js$/, '.map')
                sourceMap: (fileName) ->
                    fileName.replace(/\.js$/, '.map')

        replace:
            admin:
                src: 'build/index.html'
                overwrite: true
                replacements: [{
                    from: /<script src="(.*)require.js"><\/script>/gm
                    to: ''
                }, {
                    from: '<script src="main.js"></script>'
                    to: '<script src="js/main.min.js"></script>'
                }]

        htmlmin:
            backend:
                files:
                    'build/index.html': 'index.html'
                options:
                    removeComments: true
                    removeRedundantAttributes: true
                    useShortDoctype: true
                    removeOptionalTags: true
                    collapseWhitespace: true

        ngTemplateCache:
            views:
                files:
                    './build/views.js': ['./views/**/*.html', './bazalt/components/**/*.html', './bazalt/modules/**/*.html']
                options:
                    trim: '.'
                    module: 'app'

    grunt.loadNpmTasks 'grunt-contrib-htmlmin'
    grunt.loadNpmTasks 'grunt-contrib-copy'
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-contrib-requirejs'
    grunt.loadNpmTasks 'grunt-contrib-less'
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-contrib-connect'
    grunt.loadNpmTasks 'grunt-text-replace'
    grunt.loadNpmTasks 'grunt-hustler'

    grunt.registerTask 'dev', [
        'copy:frontend'
        'connect'
        'watch'
    ]

    grunt.registerTask 'default', [
        'ngTemplateCache'
        'less:theme'
        'copy:theme'
        'requirejs'
        'uglify'
        'htmlmin'
        'replace'
    ]
