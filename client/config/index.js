const path = require('path');
const config = {
  alias: {
    '@/assets': path.resolve(__dirname, '..', 'src/assets'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/pages': path.resolve(__dirname, '..', 'src/pages'),
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/constants': path.resolve(__dirname, '..', 'src/constants'),
    '@/models': path.resolve(__dirname, '..', 'src/models'),
    '@/services': path.resolve(__dirname, '..', 'src/services'),
    '@/styles': path.resolve(__dirname, '..', 'src/styles'),
  },
  projectName: 'weapp-crypto',
  date: '2020-5-9',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  babel: {
    sourceMap: true,
    presets: [
      [
        'env',
        // {
        //   modules: false,
        // },
      ],
    ],
    plugins: [
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-object-rest-spread',
      [
        'transform-runtime',
        {
          helpers: false,
          polyfill: false,
          regenerator: true,
          moduleName: 'babel-runtime',
        },
      ],
    ],
  },
  plugins: [],
  defineConstants: {},
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 10240, // 设定转换尺寸上限
        },
      },
    },
  },
  h5: {
    esnextModules: ['taro-echarts'],//echart
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: ['last 3 versions', 'Android >= 4.1', 'ios >= 8'],
        },
      },
    },
  },
  copy: {
    patterns: [
      //  之前写的复制配置，忽略echarts.js
      {
        from: 'node_modules/taro-echarts/components/ec-canvas/',
        to: 'dist/npm/taro-echarts/components/ec-canvas',
        ignore: ['ec-canvas.js', 'wx-canvas.js','echarts.js']
      },
      // 添加新的copy规则，将
      {
        from: 'src/static',
        to: 'dist/npm/taro-echarts/components/ec-canvas',
      }
    ],
    options: {},
  },
};

module.exports = function(merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'));
  }
  return merge({}, config, require('./prod'));
};
