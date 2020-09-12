const path = require('path')
//const CompressionPlugin = require('compression-webpack-plugin') // compression-webpack-plugin插件需要npm安装

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
  
  lintOnSave: false, // 设置eslint报错时停止代码编译
  productionSourceMap: false, // 不需要生产环境的 source map（减小dist文件大小，加速构建）
  css:{
    extract: true,
    sourceMap: false,
    loaderOptions:{
        sass: {
            prependData:`@import"./src/styles/main.scss";`
        }
    }
  },
  devServer: {
    open: false, // 编译完成是否打开网页
    host: '0.0.0.0', // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
    port: 8080, // 访问端口
    https: false, // 编译失败时刷新页面
    hot: true, // 开启热加载
    hotOnly: false,
    proxy: {
      '/api': {
         target: 'http://www.web-jshtml.cn/productapi/token', // 代理接口地址
         changeOrigin: true, // 是否跨域
         pathRewrite: {
           '^/api': ''   //需要rewrite的, 这里理解成以'/api'开头的接口地址，把/api代替target中的地址
        }
      }
    }
  },
  chainWebpack: (config) => { 
    const svgRule = config.module.rule('svg') // 找到svg-loader
        svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
        svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
        svgRule // 添加svg新的loader处理
          .use('svg-sprite-loader')
          .loader('svg-sprite-loader')
          .options({
            symbolId: 'icon-[name]',
            include: ["./src/Svgicon"]
          })
    // 移除 prefetch 插件(针对生产环境首屏请求数进行优化)
    config.plugins.delete('prefetch')
    // 移除 preload 插件(针对生产环境首屏请求数进行优化)   preload 插件的用途：https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
    config.plugins.delete('preload')
    // 第1个参数：别名，第2个参数：路径  （设置路径别名）
    config.resolve.alias
    .set('@pages', resolve('./src/page'))
    .set('@router', resolve('./src/router'))
    .set('@store', resolve('./src/store'))
    .set('@utils', resolve('./src/utils'))
    
  },
  // 配置打包 js、css文件为.gz格式，优化加载速度  （参考：https://blog.csdn.net/qq_31677507/article/details/102742196）
  configureWebpack: config => {
    
    if (process.env.NODE_ENV === 'production') {
     
      return {
       
        plugins: [new CompressionPlugin({
          test: /\.js$|\.css/, // 匹配文件
          threshold: 10240, // 超过10kB的数据进行压缩
          deleteOriginalAssets: false // 是否删除原文件 （原文件也建议发布到服务器以支持不兼容gzip的浏览器）
        })],
        performance: { // 生产环境构建代码文件超出以下配置大小会在命令行中显示警告
          hints: 'warning',
          // 入口起点的最大体积 整数类型（以字节为单位,默认值是：250000 (bytes)）
          maxEntrypointSize: 5000000,
          // 生成文件的最大体积 整数类型（以字节为单位,默认值是：250000 (bytes)）
          maxAssetSize: 3000000
          // // 只给出 js 文件的性能提示
          // assetFilter: function (assetFilename) {
          //   return assetFilename.endsWith('.js')
          // }
        }
      }
    }
  }
}
