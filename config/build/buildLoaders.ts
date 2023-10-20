import webpack from "webpack";
import {BuildOptions} from "./types/config";
import {buildCssLoader} from "./loaders/buildCssLoader";

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const {isDev} = options
    const svgLoader =
        {
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        }

    const babelLoader = {
        test: /\.(js|jsx|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: ['@babel/preset-env'],
                "plugins": [
                    [
                        "i18next-extract",
                        {
                            locales: ['ru', 'en'],
                            keyAsDefaultValue: true
                        }
                    ],
                    // […] your other plugins […]
                ]
            }
        }
    }

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff|woff2)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    }

    //если не используем тайпскрит - нужен babel-loader
    const cssLoader = buildCssLoader(options)

    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }
    // порядок лоадеров важен, например тс лоадер обрабаывает tsx файлы раньше чем babelLoader и вся цепочка ломается
    return [
        fileLoader,
        svgLoader,
        babelLoader,
        typescriptLoader,
        cssLoader
    ]
}
