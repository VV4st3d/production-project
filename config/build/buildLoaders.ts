import webpack from "webpack";
import {BuildOptions} from "./types/config";
import {buildCssLoader} from "./loaders/buildCssLoader";
import {buildBabelLoader} from "./loaders/buildBabelLoader";

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const {isDev} = options
    const svgLoader =
        {
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        }


    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff|woff2)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    }

    const cssLoader = buildCssLoader(options)
    const codeBabelLoader = buildBabelLoader({...options, isTsx: false})
    const tsxCodeBabelLoader = buildBabelLoader({...options, isTsx: true})

//если не используем тайпскрит - нужен babel-loader
    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }
    // порядок лоадеров важен, например тс лоадер обрабаывает tsx файлы раньше чем babelLoader и вся цепочка ломается
    return [
        fileLoader,
        svgLoader,
        codeBabelLoader,
        tsxCodeBabelLoader,
        // typescriptLoader,
        cssLoader
    ]
}
