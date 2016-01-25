module.exports = {
    concat: {
        options: {
            sourceMap : true
        },

        vendorCSS: {
            dest: '<%= app.css %>/vendors.css',
            src: [
                '<%= app.vendors %>/bootstrap/css/bootstrap.min.css',
                '<%= app.vendors %>/font-awesome/css/font-awesome.min.css'
            ]
        },

        vendorJS: {
            dest: '<%= app.js %>/vendors.min.js',
            src: [
                '<%= app.vendors %>/angular/angular.min.js',
                '<%= app.vendors %>/jquery/dist/jquery.min.js',
                '<%= app.vendors %>/angular-route/angular-route.min.js',
                '<%= app.vendors %>/angular-animate/angular-animate.min.js',
                '<%= app.vendors %>/bootstrap/js/bootstrap.min.js'
            ]
        },

        applicationJS: {
            dest: '<%= app.js %>/application.js',
            src: [
                '<%= app.applicationJS %>'
            ]
        }
    }
};
