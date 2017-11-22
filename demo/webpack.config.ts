import { CheckerPlugin } from 'awesome-typescript-loader';
import * as extractTextPlugin from 'extract-text-webpack-plugin';
import * as hwp from 'html-webpack-plugin';
import * as path from 'path';
import { Configuration, HotModuleReplacementPlugin } from 'webpack';

const Root = (...paths: string[]) => path.join(__dirname, ...paths);

const isDev = process.env.NODE_ENV === 'dev';

const Base: Configuration = {
    entry: {
        app: Root('./src/app.tsx'),
    },

    output: {
        path: Root('build'),
        filename: '[name].js',
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        modules: ['node_modules', 'src'],
    },

    module: {
        rules: [
            {
                test: /.tsx?$/,
                use: ['awesome-typescript-loader'],
            },

            {
                test: /\.html$/,
                loader: 'html-loader',
            },

            {
                test: /.scss$/,
                use: extractTextPlugin.extract({
                    fallback: [
                        {
                            loader: 'style-loader',
                        },
                    ],
                    use: [
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'sass-loader',
                        },
                    ],
                }),
            },
        ],
    },

    plugins: [
        new HotModuleReplacementPlugin(),
        new CheckerPlugin(),

        new hwp({
            title: 'hops',
            filename: 'index.html',
            template: Root('./src/index.html'),
        }),

        new extractTextPlugin('style.css'),
    ],

    devtool: isDev ? 'cheap-module-source-map' : 'source-map',

    devServer: {
        contentBase: Root('dist'),
        historyApiFallback: true,
        host: '0.0.0.0',
        hot: true,
        port: 8010,
    },

};

export default [Base];
