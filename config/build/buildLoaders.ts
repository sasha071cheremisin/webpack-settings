import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { buildBabelLoader } from "./babel/buildBabelLoader";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
    const isDev = options.mode === "development";

    const svgLoader = {
        test: /\.svg$/i,
        use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    };

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
    };

    const tsLoader = {
        test: /\.tsx?$/,
        loader: "ts-loader",
        // ускоряет этап сборки - transpileOnly
        // use: [
        //   {
        //     loader: 'ts-loader',
        //     options: {
        //       transpileOnly: true
        //     }
        //   }
        // ],
        exclude: /node_modules/,
    };

    const babelLoader = buildBabelLoader(options);

    const cssLoaderWithModule = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev
                    ? "[path][name]__[local]"
                    : "[hash:base64:8]",
            },
        },
    };

    const cssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            cssLoaderWithModule,
            // Compiles Sass to CSS
            "sass-loader",
        ],
    };

    return [
        svgLoader,
        assetLoader,
        cssLoader,
        //tsLoader,
        babelLoader,
    ];
}
