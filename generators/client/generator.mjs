import chalk from 'chalk';
import ClientGenerator from 'generator-jhipster/esm/generators/client';
import {
  PRIORITY_PREFIX,
  INITIALIZING_PRIORITY,
  PROMPTING_PRIORITY,
  CONFIGURING_PRIORITY,
  COMPOSING_PRIORITY,
  WRITING_PRIORITY,
  INSTALL_PRIORITY,
  END_PRIORITY,
} from 'generator-jhipster/esm/priorities';

export default class extends ClientGenerator {
  constructor(args, opts, features) {
    super(args, opts, { taskPrefix: PRIORITY_PREFIX, ...features });

    if (this.options.help) return;

    if (!this.options.jhipsterContext) {
      throw new Error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints ngxadmin')}`);
    }

    this.sbsBlueprint = true;
  }

  get [INITIALIZING_PRIORITY]() {
    return {
      async initializingTemplateTask() {},
    };
  }

  get [PROMPTING_PRIORITY]() {
    return {
      async promptingTemplateTask() {},
    };
  }

  get [CONFIGURING_PRIORITY]() {
    return {
      async configuringTemplateTask() {},
    };
  }

  get [COMPOSING_PRIORITY]() {
    return {
      async composingTemplateTask() {},
    };
  }

  get [WRITING_PRIORITY]() {
    return {
      async writingTemplateTask() {
        await this.writeFiles({
          sections: {
            files: [{ templates: ['template-file-client'] }],
          },
          context: this,
        });
      },
    };
  }

  get [INSTALL_PRIORITY]() {
    return {
      async installTemplateTask() {},
    };
  }

  get [END_PRIORITY]() {
    return {
      async endTemplateTask() {},
    };
  }
}
