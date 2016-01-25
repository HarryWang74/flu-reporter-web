module.exports = {
	clean: {
		dist: {
			files: [{
				dot: true,
				src: [
					'_site/<%= app.applicationJS %>'
				]
			}]
		}
	}
};
