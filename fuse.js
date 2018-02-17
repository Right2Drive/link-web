const { src, context, task } = require('fuse-box/sparky')
const { FuseBox, WebIndexPlugin, LESSPlugin, CSSResourcePlugin, QuantumPlugin, CSSPlugin } = require('fuse-box')
const path = require('path')
const { TypeHelper } = require('fuse-box-typechecker')

task('default', async context => {
  await context.cleanDist()
  const fuse = context.getConfig()
  context.createBundle(fuse)
  context.devServer(fuse)
  await fuse.run()
})

task('dist', async context => {
  await context.cleanDist()
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
      sourceMaps: { project: true, vendor: true },
      plugins: [
        WebIndexPlugin({
          template: 'src/index.html',
          title: 'Link Messenger',
        }),
        [
          CSSResourcePlugin({ dist: 'dist/css-resources' }),
          CSSPlugin({ group: 'bundle.vendor.css'}),
        ],
        [
          'style/**.less',
          LESSPlugin({ paths: path.resolve(__dirname, 'node_modules')}),
          CSSPlugin({ group: 'bundle.less.css' }),
        ],
        this.isProduction && QuantumPlugin({
          bakeApiIntoBundle: 'app',
          uglify: true,
          css : { clean : true },
          extendServerImport: true,
        }),
      ],
    })
  }

  createBundle(fuse) {
    const bundle = fuse.bundle('app')
      .instructions(' > index.ts')

    if (!this.isProduction) {
      const typeChecker = this.getTypeChecker()
      typeChecker.createThread()
      bundle
        .watch()
        .cache(false)
        .hmr()
        .completed(proc => {
          this.runTypeChecker(typeChecker)
        })
    }

    return bundle
  }

  getTypeChecker(override = {}) {
    return TypeHelper({
      tsConfig: './tsconfig.json',
      name: 'src',
      basePath: './',
      tsLint: './tslint.json',
      yellowOnLint: true,
      shortenFilenames: true,
      ...override,
    })
  }

  runTypeChecker(typeChecker) {
    console.log('running typechecker...')

    typeChecker.inspectCodeWithWorker({ ...typeChecker.options, quit: false, type: 'watch' });
    typeChecker.printResultWithWorker();
  }

  devServer(fuse) {
    fuse.dev()
  }

  async cleanDist () {
    await src('dist/').clean('dist/').exec()
  }

})
