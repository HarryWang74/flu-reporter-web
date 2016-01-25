module.exports = {
    jshint: {
        options: {
            reporter: require('jshint-stylish'),
            newcap: false,
            ignores: [
                // 'app/assets/javascripts/legacy/{,*/}*.js',
            ]
        },

        dist: {
            src: [
               '<%= app.applicationJS %>'
            ]
        }
    }
};
