import chalk from 'chalk';
import EntityClientGenerator from 'generator-jhipster/esm/generators/entity-client';
import {
  PRIORITY_PREFIX,
  INITIALIZING_PRIORITY,
  PROMPTING_PRIORITY,
  CONFIGURING_PRIORITY,
  COMPOSING_PRIORITY,
  LOADING_PRIORITY,
  PREPARING_PRIORITY,
  PREPARING_FIELDS_PRIORITY,
  PREPARING_RELATIONSHIPS_PRIORITY,
  DEFAULT_PRIORITY,
  WRITING_PRIORITY,
  POST_WRITING_PRIORITY,
  INSTALL_PRIORITY,
  END_PRIORITY,
} from 'generator-jhipster/esm/priorities';

import { addEntityToHeaderMenu } from './needle-client.mjs';


export default class extends EntityClientGenerator {
  constructor(args, opts, features) {
    super(args, opts, { taskPrefix: PRIORITY_PREFIX, ...features });

    if (this.options.help) return;

    if (!this.options.jhipsterContext) {
      throw new Error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints no')}`);
    }
  }

  get [INITIALIZING_PRIORITY]() {
    return {
      async initializingTemplateTask() {},
      ...super._initializing(),
    };
  }

  get [PROMPTING_PRIORITY]() {
    return {
      async promptingTemplateTask() {},
      ...super._prompting(),
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

  get [PREPARING_FIELDS_PRIORITY]() {
    return {
      async preparingFieldsTemplateTask() {},
      ...super._preparingFields(),
    };
  }

  get [PREPARING_RELATIONSHIPS_PRIORITY]() {
    return {
      async preparingRelationshipsTemplateTask() {},
      ...super._preparingRelationships(),
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
      ...super._postWriting(),
      addEntityToHeader() {
        addEntityToHeaderMenu(this,this.entityPage,
          this.enableTranslation,
          this.clientFramework,
          this.entityTranslationKeyMenu,
          this.entityClassHumanized
        );
      }
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
