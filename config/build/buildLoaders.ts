import webpack from "webpack";
import {BuildOptions} from "./types/config";
import {buildCssLoader} from "./loaders/buildCssLoader";
import {buildBabelLoader} from "./loaders/buildBabelLoader";

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const {isDev} = options
    const svgLoader =
        {
            test: /\.svg$/,
            use: [{
                loader: '@svgr/webpack',
                options:{
                    icon: true,
                    svgoConfig:{
                        plugins:[
                            {
                                name:'convertColors',
                                params:{
                                    currentColor: true
                                }
                            }
                        ]
                    }
                }
            }],
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
