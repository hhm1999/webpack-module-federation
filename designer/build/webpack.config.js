const { resolve, join } = require('path');
const ExternalTemplateRemotesPlugin = require("./ExternalTemplateRemotesPlugin");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;
const { VueLoaderPlugin } = require('vue-loader');
const port = 3002;
const isProd = process.env.NODE_ENV === 'production';

const cssConfig = [
    isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
    {
        loader: 'css-loader',
        options: {
            sourceMap: !isProd
        }
    }
];

const config = {
    entry: {
        index: './src/index.js' // 入口文件
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: isProd ? 'javascript/[name].[contenthash:5].js' : '[name].js', // [name] 是entry的key
        // publicPath: isProd ? './' : '/'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: cssConfig
            },
            {
                test: /\.less$/,
                use:["style-loader", "css-loader", "less-loader"]
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            loaders: {
                                css: cssConfig
                            },
                            preserveWhitespace: false // 不要留空白
                        }
                    }
                ],
                include: [resolve(__dirname, '../src')]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: !isProd
                        }
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: { // 配置html中图片编译
                        minimize: true,
                        attributes: false
                    }
                }]
            }
        ]
    },
    resolve: { // 配置路径别名
        extensions: ['.js', '.vue', '.styl']
    },
    plugins: [
        new VueLoaderPlugin(), // vue加载器
        new HtmlWebpackPlugin({
            template: join(__dirname, '../src/index.html'), // 引入模版
            filename: 'index.html',
            minify: { // 对index.html压缩
                collapseWhitespace: isProd, // 去掉index.html的空格
                removeAttributeQuotes: isProd // 去掉引号
            },
            hash: true, // 去掉上次浏览器的缓存（使浏览器每次获取到的是最新的html）
            inlineSource: '.(js|css)'
        }),
        new MiniCssExtractPlugin({ // 分离css
            filename: 'stylesheets/[name].[contenthash:5].css'
        }),
        new ModuleFederationPlugin({
          name: "designer",
          remotes: {
            // component: "component@http://localhost:3001/remoteEntry.js",
            component: "component@[window.libraryRemoteEntryUrl]",
          },
          shared: {
          }
        }),
        new ExternalTemplateRemotesPlugin()
    ]
};

if (isProd) {
    config.plugins.push(
        new CleanWebpackPlugin({
            verbose: true, // 打印被删除的文件
            protectWebpackAssets: false, // 允许删除cleanOnceBeforeBuildPatterns中的文件
            cleanOnceBeforeBuildPatterns: ['**/*', resolve(__dirname, 'dist')]
        }),
        new MiniCssExtractPlugin({ // 分离css
            filename: 'stylesheets/[name].[contenthash:5].css'
        })
    );
    config.optimization = { // 抽离第三方插件
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial'
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true
          }
        }
      },
    };
} else {
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
    );
    config.devtool = 'eval-source-map'; // 如果只用source-map开发环境出现错误定位源文件，生产环境会生成map文件
    config.devServer = {
        contentBase: join(__dirname, 'dist'), // 将 dist 目录下的文件，作为可访问文件。
        compress: true, // 开启Gzip压缩
        host: 'localhost', // 设置服务器的ip地址，默认localhost
        port, // 端口号
        open: false, // 自动打开浏览器
        hot: true,
        noInfo: true,
        overlay: { // 当出现编译器错误或警告时，就在网页上显示一层黑色的背景层和错误信息
            errors: true
        },
        disableHostCheck: true //  不检查主机
    };
}

module.exports = config;