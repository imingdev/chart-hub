const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports.resolve = (_dir) => path.join(__dirname, '../..', _dir);

// 打包目录
exports.dist = exports.resolve('dist');

// 资源目录
exports.assetsPath = (_path) => path.posix.join('static', _path);

// 环境
exports.isDevelopment = process.env.NODE_ENV === 'development';

// 文件命名
exports.filenames = {
  app: exports.isDevelopment ? '[name].js' : exports.assetsPath('js/[contenthash:8].js'),
  chunk: exports.isDevelopment ? '[name].js' : exports.assetsPath('js/[contenthash:8].js'),
  css: exports.isDevelopment ? '[name].css' : exports.assetsPath('css/[contenthash:8].css'),
  img: exports.isDevelopment ? '[path][name][ext]' : exports.assetsPath('images/[contenthash:8][ext]'),
  font: exports.isDevelopment ? '[path][name][ext]' : exports.assetsPath('fonts/[contenthash:8][ext]'),
  video: exports.isDevelopment ? '[path][name][ext]' : exports.assetsPath('videos/[contenthash:8][ext]'),
  cssModules: exports.isDevelopment ? '[name]__[local]--[hash:base64:5]' : '_[hash:base64:8]',
};

// 资源loader
exports.assetsLoaders = [{
  test: /\.(png|jpe?g|gif|svg|webp|avif)$/i,
  type: 'asset/resource',
  generator: {
    filename: exports.filenames.img,
  },
}, {
  test: /\.(webm|mp4|ogv)$/i,
  type: 'asset/resource',
  generator: {
    filename: exports.filenames.video,
  },
}, {
  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
  type: 'asset/resource',
  generator: {
    filename: exports.filenames.font,
  },
}];

// css loader
exports.cssLoaders = (opt) => {
  const options = { ...opt || {} };

  const cssLoader = {
    loader: 'css-loader',
    options: {
      modules: {
        auto: options.useCssModules ? undefined : /\.module\.\w+$/i,
        localIdentName: exports.filenames.cssModules,
      },
    },
  };

  const postcssLoader = 'postcss-loader';

  // generate loader string to be used with extract text plugin
  const generateLoaders = (loader, loaderOptions) => {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];

    if (loader) {
      loaders.push({
        loader: `${loader}-loader`,
        options: loaderOptions,
      });
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return [MiniCssExtractPlugin.loader].concat(loaders);
    }
    return ['style-loader'].concat(loaders);
  };

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus'),
  };
};

// style loader
exports.styleLoaders = (options = {}) => {
  const output = [];
  const normalLoaders = exports.cssLoaders(options);
  const cssModulesLoaders = exports.cssLoaders({ ...options || {}, useCssModules: true });

  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const extension in normalLoaders) {
    const test = new RegExp(`\\.${extension}$`);
    output.push({
      oneOf: [{
        test,
        resourceQuery: /modules/,
        use: cssModulesLoaders[extension],
      }, {
        test,
        use: normalLoaders[extension],
      }],
    });
  }

  return output;
};
