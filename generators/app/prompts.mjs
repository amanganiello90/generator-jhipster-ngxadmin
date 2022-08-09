
import chalk from 'chalk';

const MONOLITH='monolith';
const GATEWAY='gateway';

export async function askForApplicationType() {
    if (this.existingProject && this.options.askAnswered !== true) return;
  
    const applicationTypeChoices = [
      {
        value: MONOLITH,
        name: 'Monolithic application (recommended for simple projects)',
      },
      {
        value: GATEWAY,
        name: 'Gateway application',
      }
    ];
  
    await this.prompt(
      [
        {
          type: 'list',
          name: 'applicationType',
          message: `Which ${chalk.yellow('*type*')} of application would you like to create?`,
          choices: applicationTypeChoices,
          default: MONOLITH,
        },
      ],
      this.config
    );
  
    const { applicationType } = this.jhipsterConfig;
    // TODO drop for v8, setting the generator with config is deprecated
    this.applicationType = applicationType;
  }

  export async function askForTestOpts() {
    if (this.existingProject) return undefined;
  
    const choices = [];
   
    if (!this.skipServer) {
      // all server side test frameworks should be added here
      choices.push({ name: 'Gatling', value: 'gatling' }, { name: 'Cucumber', value: 'cucumber' });
    }
    const PROMPT = {
      type: 'checkbox',
      name: 'testFrameworks',
      message: 'Besides JUnit, which testing frameworks would you like to use?',
      choices,
      default: []
    };
  
    const answers = await this.prompt(PROMPT);
    this.testFrameworks = this.jhipsterConfig.testFrameworks = answers.testFrameworks;
    return answers;
  }