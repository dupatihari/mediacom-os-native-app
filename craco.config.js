const { whenDev, getLoaders, loaderByName } = require('@craco/craco')
const SingleSpaAppCracoPlugin = require('craco-plugin-single-spa-application')
const StylelintPlugin = require('stylelint-webpack-plugin')

const packageJson = require('./package.json')

const singleSpaAppPlugin = {
  plugin: SingleSpaAppCracoPlugin,
  options: {
    orgName: 'wpp',
    projectName: 'react-app-boilerplate',
    entry: 'src/index.tsx',
    orgPackagesAsExternal: false,
    reactPackagesAsExternal: false,
    minimize: whenDev(() => false, true),
    outputFilename: 'main.js',
  },
}

const stylelintPlugin = {
  plugin: StylelintPlugin,
  options: {
    configFile: '.stylelintrc.js',
    fix: false,
    context: 'src',
    files: '**/*.scss',
    failOnError: true,
    quiet: false,
  },
}

module.exports = {
  devServer: {
    port: 8500,
    open: ['https://wpp.wpp-stage.os-dev.io/local/8500/sjs/main'],
  },
  plugins: [
    singleSpaAppPlugin,
    stylelintPlugin,
    /*
      IMPORTANT: Override CRA modules classNames generation mechanism
      that leads to conflicts if several CRA based microapplications
      have same folder, file and classNames structure.
    */
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          getLoaders(webpackConfig, loaderByName('css-loader')).matches.forEach(({ loader }) => {
            const modules = loader.options.modules

            if (modules.getLocalIdent) {
              // Discard CRA implementation
              delete modules.getLocalIdent

              /*
                IMPORTANT: to guarantee classNames uniqueness provide hash salt.
                For example you can use project name.
              */
              modules.localIdentHashSalt = packageJson.name
              modules.localIdentName = whenDev(() => '[name]_[local]__[hash:base64:5]', '[hash:base64:5]')
            }
          })

          return webpackConfig
        },
      },
    },
  ],
}
