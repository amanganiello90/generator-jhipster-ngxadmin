import chalk from 'chalk';
import AppGenerator from 'generator-jhipster/esm/generators/app';
import {
  PRIORITY_PREFIX,
  INITIALIZING_PRIORITY,
  PROMPTING_PRIORITY,
  CONFIGURING_PRIORITY,
  LOADING_PRIORITY,
  PREPARING_PRIORITY,
  DEFAULT_PRIORITY,
  WRITING_PRIORITY,
  INSTALL_PRIORITY,
  END_PRIORITY,
} from 'generator-jhipster/esm/priorities';

import {askForApplicationType, askForTestOpts} from './prompts.mjs';


import { createRequire } from "module";
const require = createRequire(import.meta.url);
const ngxPackagejs = require('./../../package.json');


export default class extends AppGenerator {
  constructor(args, opts, features) {
    super(args, opts, { taskPrefix: PRIORITY_PREFIX, ...features });

    if (this.options.help) return;

    if (!this.options.jhipsterContext) {
      throw new Error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints ngxadmin')}`);
    }
  }

  get [INITIALIZING_PRIORITY]() {
    return {
      ...super._initializing(),
      displayLogo() {
        this.log(chalk.white(`Application files will be generated in folder: ${chalk.yellow(process.cwd())}`));
    if (process.cwd() === this.getUserHome()) {
      this.log(chalk.red.bold('\n️⚠️  WARNING ⚠️  You are in your HOME folder!'));
      this.log(chalk.red('This can cause problems, you should always create a new directory and run the jhipster command from here.'));
      this.log(chalk.white(`See the troubleshooting section at ${chalk.yellow('https://www.jhipster.tech/installation/')}`));
    }
    this.log(
      chalk.white.bold(' _______________________________________________________________________________________________________________\n')
    );
    this.log(
      chalk.white('Welcome to generator-jhipster-ngxadmin ') + chalk.yellow(`v${ngxPackagejs.version}`)
    );
    this.log(
      chalk.green.bold(`  This is the NGX JHipster blueprint that apply ${chalk.yellow('ngx-admin template!')}`)
    );
    this.log(
      chalk.green.bold(
        `  The fixed options applied are:  ${chalk.yellow('monolith or gateway application type with oauth2, and ngx admin client with no test framework')}`
      )
    );
    this.log(
      chalk.white.bold(' _______________________________________________________________________________________________________________\n')
    );
      }
    };
  }

  get [PROMPTING_PRIORITY]() {
    return {
      ...super._prompting(),
      askForApplicationType
    };
  }

  get [CONFIGURING_PRIORITY]() {
    return {
      ...super._configuring(),
      setStandardNGXProps(){
          this.jhipsterConfig.authenticationType='oauth2';
          this.jhipsterConfig.skipClient=false;
          this.jhipsterConfig.withAdminUi = true;
          this.jhipsterConfig.clientFramework='angularX';
          this.jhipsterConfig.clientTheme = 'none';

        }
    };
  }


  get [LOADING_PRIORITY]() {
    return {
      async loadingTemplateTask() {},
      ...super._loading(),
    };
  }

  get [PREPARING_PRIORITY]() {
    return {
      async preparingTemplateTask() {},
      ...super._preparing(),
    };
  }

  get [DEFAULT_PRIORITY]() {
    return {
      ...super._default(),
      askForTestOpts
    };
  }

  get [WRITING_PRIORITY]() {
    return {
      async writingTemplateTask() {},
      ...super._writing(),
    };
  }

  get [INSTALL_PRIORITY]() {
    return {
      async installTemplateTask() {},
      ...super._install(),
    };
  }

  get [END_PRIORITY]() {
    return {
      async endTemplateTask() {},
      ...super._end(),
    };
  }
}
