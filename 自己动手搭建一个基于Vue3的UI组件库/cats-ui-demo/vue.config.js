module.exports = {
  // 组件样式内联
  css: {
    extract: false,
  },
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
      .add('/packages/')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // 修改它的选项...
        return options
      })
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'sass'
    }
  }
};