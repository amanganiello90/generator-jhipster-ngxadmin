import chalk from 'chalk';
import * as _ from 'lodash';
import { rewriteFile } from './utils.mjs';

export function addEntityToHeaderMenu(
    generator,
    routerName,
    enableTranslation,
    entityTranslationKeyMenu,
    entityTranslationValue = _.startCase(routerName),
    jhiPrefix = 'jhi'
  ) {
    const errorMessage = `${chalk.yellow('Reference to ') + routerName} ${chalk.yellow('not added to header menu.\n')}`;
    const entityMenuPath = `${generator.CLIENT_MAIN_SRC_DIR}app/@theme/components/header/header.component.html`;
    const routerLink = `${routerName}`;
    const entityEntry =
      // prettier-ignore
      generator.stripMargin(`|<nb-option value="${routerLink}">
                             |         <nb-icon icon="alert-circle-outline"></nb-icon>
                             |            <span${enableTranslation ? ` ${jhiPrefix}Translate="global.menu.entities.${entityTranslationKeyMenu}"` : ''}>${entityTranslationValue}</span>
                             |     </nb-option>`);
    const rewriteFileModel = generateFileModel(entityMenuPath, 'jhipster-needle-add-entity-to-header-menu', entityEntry);
    rewriteFileModel.regexp = routerLink;

    
    addBlockContentToFile(rewriteFileModel, errorMessage, generator);
  }

  function generateFileModel(aFile, needleTag, ...content) {
    return {
      file: aFile,
      needle: needleTag,
      splicable: content,
    };
  }

  function addBlockContentToFile(rewriteFileModel, errorMessage, generator) {
    try {
      return rewriteFile(rewriteFileModel, generator);
    } catch (e) {
      logNeedleNotFound(e, errorMessage, rewriteFileModel.file, generator);
      return false;
    }
  }

 function logNeedleNotFound(exception, message, fullPath, generator) {
    if (!message) {
      message = 'File rewrite failed.';
    }
    generator.log(chalk.yellow('\nUnable to find ') + fullPath + chalk.yellow(` or missing required jhipster-needle. ${message}\n`));
    generator.debug('Error:', exception);
  }

  

