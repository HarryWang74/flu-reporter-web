module.exports = {
	sass: {
		dist: {
			options: {
				style: 'compressed',
				lineNumbers: false,
				precision:   10
			},

			files: {
				'<%= app.css %>/application.css':
				'<%= app.scss %>/application.scss'
			}
		}
	}
};
