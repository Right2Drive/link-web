const { src, context, task } = require('fuse-box/sparky')
const { FuseBox, WebIndexPlugin, LESSPlugin, CSSResourcePlugin, QuantumPlugin, CSSPlugin, EnvPlugin, BabelPlugin } = require('fuse-box')
const path = require('path')

task('default', async context => {
  await context.cleanDist()
  context.moveFavicon()
  const fuse = context.getConfig()
  context.createBundle(fuse)
  context.devServer(fuse)
  await fuse.run()
})

task('dist', async context => {
  await context.cleanDist()
  context.moveFavicon()
  context.isProduction = true
  const fuse = context.getConfig()
  context.createBundle(fuse)
  await fuse.run()
})

context(class {
  getConfig () {
    return FuseBox.init({
      homeDir: 'src',
      target: 'browser@es6',
      output: 'dist/$name.js',
      useTypescriptCompiler: true,
      sourceMaps: { project: true, vendor: true },
      plugins: [
        EnvPlugin({
          NODE_ENV: this.isProduction ? 'production' : 'development',
          CORE_URL: 'localhost',
          CORE_PORT: 3030
        }),
        WebIndexPlugin({
          template: 'src/index.html',
          title: 'Link Messenger',
          appendBundles: true,
          path: '.'
        }),
        [
          '**/**.less',
          LESSPlugin({ paths: path.resolve(__dirname, 'node_modules') }),
          CSSResourcePlugin({ dist: 'dist/css-resources' }),
          CSSPlugin()
        ],
        this.isProduction && QuantumPlugin({
          bakeApiIntoBundle: 'app',
          uglify: true,
          css: { clean: true },
          extendServerImport: true,
          manifest: true,
          treeshake: true,
          target: 'browser'
        })
      ]
    })
  }

  createBundle (fuse) {
    const bundle = fuse.bundle('app')
      .instructions(' > index.js')

    if (!this.isProduction) {
      bundle
        .watch()
        .cache(false)
        .hmr()
    }

    return bundle
  }

  devServer (fuse) {
    fuse.dev()
  }

  moveFavicon () {
    src(path.resolve('src', 'assets', 'favicon.ico'))
      .dest('dist/')
      .exec()
  }

  async cleanDist () {
    await src('dist/').clean('dist/').exec()
  }
})
