module.exports = {
    watch: {
        options: {
            livereload: true,
            atBegin:    true
        },

        css: {
            files: '<%= app.scss %>/**/*.scss',
            tasks: ['sass']
        },

        js: {
            files: '<%= app.applicationJS %>',
            tasks: ['jshint', 'concat_sourcemap']
        }
    }
};
