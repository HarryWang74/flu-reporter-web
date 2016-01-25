module.exports = {
    ngAnnotate: {
        options: {
            singleQuotes: true
        },
        app: {
             files: [
                {
                    expand: true,
                    src: [
                        '<%= app.applicationJS %>'
                    ]
                },
            ],
        }
    }
}