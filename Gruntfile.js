module.exports = function(grunt) {
    'use strict';

    var shelljs = require('shelljs');
    var  pkg     = require('./package.json');
    var  bower   = require('./bower.json');
    var config = {
        app: {
            applicationJS: ['fluReporter.js', 'core/*.js', 'detail/*.js', 'listing/*.js', 'splash/*.js','snippets/*.js'],
            js:'_site/javascripts',
            scss:'_scss',
            css:'_site/stylesheets',
            vendors:'_vendors'
        }
    };


    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take
    require('time-grunt')(grunt);

    // Init the config with the tasks
    grunt.initConfig(config);

    // Merge in modules
    grunt.file.recurse('./grunt/modules', function(abspath, rootdir, subdir, filename) {
        if ((/\.js$/).test(filename)) {
            var task = require('./' + abspath);

            if (typeof task === 'function') {
                task = task(grunt);
            }

            grunt.config.merge(task);
        }
    });

    // Load app tasks
    grunt.task.loadTasks('./grunt/tasks');

    // Default task
    grunt.registerTask('default', ['watch']);
};
