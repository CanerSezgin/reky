const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, "../server/dist"),
    configureWebpack: {
        devServer: {
            clientLogLevel: 'info',
            watchOptions: {
                poll: true
            }
        }
    }
}