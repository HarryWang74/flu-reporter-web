module.exports = {
    concat_sourcemap: {
        options: {
          // Task-specific options go here. 
        },
        your_target: {
            files: {
                '<%= app.css %>/vendors.css': [ 
                    '<%= app.vendors %>/bootstrap/css/bootstrap.min.css', 
                    '<%= app.vendors %>/font-awesome/css/font-awesome.min.css'
                ],
                '<%= app.js %>/application.js': '<%= app.applicationJS %>',
                '<%= app.js %>/vendors.min.js':  [
                    '<%= app.vendors %>/angular/angular.min.js',
                    '<%= app.vendors %>/angular-route/angular-route.min.js',
                    '<%= app.vendors %>/angular-animate/angular-animate.min.js',
                    '<%= app.vendors %>/angular-bootstrap/ui-bootstrap-tpls.min.js',
                    '<%= app.vendors %>/gsap/src/minified/TweenLite.min.js',
                    '<%= app.vendors %>/jquery/dist/jquery.min.js',
                    '<%= app.vendors %>/bootstrap/js/bootstrap.min.js'
                ]
            }
        }
    }
}