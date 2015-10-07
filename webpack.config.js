var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        // 'webpack/hot/only-dev-server',
        './index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    // resolve: {
    //   alias: {
    //     'redux': path.join(__dirname, '..', '..', 'src')
    //   },
    //   extensions: ['', '.js']
    // },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel-loader'],
            exclude: [/node_modules/, /libs/],
            include: __dirname
        },{
            test: /\.json$/,
            loaders: ['json-loader']
        },{
            test: /\.css$/,
            loaders: ['css-loader']
        // },{
        //     test: /\.s?css$/,
        //     loader: "style!css!sass?module&localIdentName=[hash:base64:5]&-url"
        },{
            test: /\.html$/,
            loaders: ['html-loader']
        },{
            test: /\.md$/,
            loaders: ['markdown-loader']
        },{
            test: /\.txt$/,
            loaders: ['raw-loader']
        }]
    }
};
