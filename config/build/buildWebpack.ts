import webpack from "webpack";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types/types";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
    const isDev = options.mode === "development";
    
    return {
        mode: options.mode ?? "development",
        entry: options.paths.entry,
        output: {
            path: options.paths.output,
            filename: "[name].[contenthash].js",
            clean: true,
        },
        module: {
            rules: buildLoaders(options)
        },
        resolve: buildResolvers(options),
        plugins: buildPlugins(options),
        devtool: isDev ? "inline-source-map" : false,
        devServer: isDev
            ? buildDevServer(options)
            : undefined,
    }
}