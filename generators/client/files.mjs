 const TEMPLATE_FILES_LIST = {
  common: [
    {
      templates: [
        'package.json',
        'tsconfig.json',
        'tsconfig.app.json',
        'tslint.json',
        'angular.json',
        'README.md.ngx',
        'webpack/webpack.custom.js',
      ],
    },
  ],
  webapp: [
    {
    from: `webapp/`,
    to: context => `${context.clientSrcDir}/`,
    templates: ['index.html', 'main.ts', 'polyfills.ts', 'typings.d.ts'],
    }
  ],
  app: [
    {
      from: `webapp/app/`,
      to: context => `${context.clientSrcDir}/app/`,
      templates: ['app.component.ts','app.module.ts'],
    }
  ],
  header: [
    {
      from: `webapp/app/ngx-header/`,
      to: context => `${context.clientSrcDir}/app/@theme/components/header`,
      templates: ['header.component.ts','header.component.html','header.component.scss'],
    }
  ]
  
}

export function writeFiles(ctx) {
  return {
   copyEntireContentAssetsFolder() {
      ctx.fs.copy(
      ctx.templatePath('assets'),
      ctx.destinationPath(`${ctx.clientSrcDir}/content/assets`)
     );
   },
   copyEntireNGXApp() {
    ctx.fs.copy(
    ctx.templatePath('ngx-app'),
    ctx.destinationPath(`${ctx.clientSrcDir}/app`)
   );
 },
   async addNGXTemplates() {
     await this.writeFiles({
       sections: TEMPLATE_FILES_LIST ,
       context: ctx,
     });
   },

   /*removeUnusedJhipsterFiles() {
    ctx.removeFolder(`${ctx.clientSrcDir}/app/home`);
   },*/
  }
}