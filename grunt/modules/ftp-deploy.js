module.exports = {
    'ftp-deploy': {
        build: {
            auth: {
                host: 'web428.webfaction.com',
                port: 21,
                authKey: 'key1'
            },
            src: '_site',
            dest: '/home/roamingronin/webapps/flureporter',
            // dest: '/home/roamingronin/webapps/deploytesting',
            exclusions: [
                '_site/**/.DS_Store', 
                '_site/**/Thumbs.db'
            ]
        }
    }
};