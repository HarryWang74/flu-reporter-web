module.exports = {
	uglify: {
		options: {
			sourceMap: true,
			beautify:  false,
			mangle:    true
		},

		dist: {
			files: [{
				expand: true,
				cwd: '<%= app.js%>',
				src:    '{,*/}*.js',
				dest: '<%= app.js %>'
			}]
		}
	}
};
