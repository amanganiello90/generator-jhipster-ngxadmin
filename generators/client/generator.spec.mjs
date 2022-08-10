import expect from 'expect';

import assert from 'yeoman-assert';
import { helpers, lookups } from '#test-utils';

describe('SubGenerator client of ngxadmin JHipster blueprint', () => {
  describe('run', () => {
    let result;
    before(async function () {
      result = await helpers
        .create('jhipster:client')
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

    it('client is generated with ngx tslint', () => {
      assert.file('tslint.json');
    });

    it('client is generated with override of common angular files', () => {
      assert.fileContent('angular.json', '"prefix": "ngx"');
    });
  });
});
