const path = require('path')

const resolve = dir => path.join(__dirname, dir)

module.exports = {
    configureWebpack:{
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    devServer: {
        proxy: `${process.env.VUE_APP_BASE_API}/api`
    }
}