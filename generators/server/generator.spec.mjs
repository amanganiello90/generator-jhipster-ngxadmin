import expect from 'expect';

import assert from 'yeoman-assert';
import { helpers, lookups } from '#test-utils';

describe('SubGenerator server of ngxadmin JHipster blueprint', () => {
  describe('run', () => {
    let result;
    before(async function () {
      result = await helpers
        .create('jhipster:server')
        .withOptions({
          reproducible: true,
          defaults: true,
          blueprint: 'ngxadmin',
        })
        .withLookups(lookups)
        .run();
    });

    it('should match generated files snapshot', () => {
      expect(result.getStateSnapshot()).toMatchSnapshot();
    });

    it('server is generated with node 14.20.0 version modified in pom.xml', () => {
      assert.fileContent('pom.xml', '<node.version>v14.20.0</node.version>');
    });
  });
});
