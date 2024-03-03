import { Configuration, DefinePlugin } from "webpack";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/types";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

export function buildPlugins(options: BuildOptions): Configuration["plugins"] {
    const isProd = options.mode === "production";
    const isDev = options.mode === "development";

    const plugins: Configuration["plugins"] = [
        new HtmlWebpackPlugin({
            template: options.paths.html,
            favicon: path.resolve(options.paths.public, "favicon.ico"),
        }),
        new DefinePlugin({
            __PLATFORM__: JSON.stringify(options.platform),
        }),
    ];

    if (isProd) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: "css/[name].[contenthash:8].css",
                chunkFilename: "css/[name].[contenthash:8].css",
            }),
            options.analyzer && new BundleAnalyzerPlugin(),
            new CopyPlugin({
                patterns: [
                    { from: path.resolve(options.paths.public, 'locales'), to: path.resolve(options.paths.output, 'locales') },
                ],
            })
        );
    }

    if (isDev) {
        plugins.push(
            new ForkTsCheckerWebpackPlugin(),
            new ReactRefreshWebpackPlugin()
        );
    }

    return plugins;
}
