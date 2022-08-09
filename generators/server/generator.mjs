import chalk from 'chalk';
import ServerGenerator from 'generator-jhipster/esm/generators/server';
import {
  PRIORITY_PREFIX,
  INITIALIZING_PRIORITY,
  PROMPTING_PRIORITY,
  CONFIGURING_PRIORITY,
  COMPOSING_PRIORITY,
  LOADING_PRIORITY,
  PREPARING_PRIORITY,
  DEFAULT_PRIORITY,
  WRITING_PRIORITY,
  POST_WRITING_PRIORITY,
  INSTALL_PRIORITY,
  END_PRIORITY,
} from 'generator-jhipster/esm/priorities';

import {askForServerSideOpts} from './prompts.mjs';


export default class extends ServerGenerator {
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
      setupNodeVersion(){
        // for compatibility ngx-admin template 8.0.0
        this.NODE_VERSION = '14.20.0';
        this.NPM_VERSION = '6.14.17';
      },
      setStandardNGXProps(){
        if(this.existingProject) {
          if(this.jhipsterConfig.applicationType==='microservice') {
            throw new Error(`This blueprint is not compatible with microservice projects!`);

          }
          this.jhipsterConfig.authenticationType='oauth2';
          this.jhipsterConfig.skipClient=false;
          this.jhipsterConfig.clientFramework='angularX';

        }
      }
    };
  }

  get [PROMPTING_PRIORITY]() {
    return {
      ...super._prompting(),
      askForServerSideOpts
    };
  }

  get [CONFIGURING_PRIORITY]() {
    return {
      async configuringTemplateTask() {},
      ...super._configuring(),
    };
  }

  get [COMPOSING_PRIORITY]() {
    return {
      async composingTemplateTask() {},
      ...super._composing(),
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
      async defaultTemplateTask() {},
      ...super._default(),
    };
  }

  get [WRITING_PRIORITY]() {
    return {
      async writingTemplateTask() {},
      ...super._writing(),
    };
  }

  get [POST_WRITING_PRIORITY]() {
    return {
      async postWritingTemplateTask() {},
      ...super._postWriting(),
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
