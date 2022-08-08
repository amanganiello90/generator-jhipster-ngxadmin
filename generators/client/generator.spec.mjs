import expect from 'expect';

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

    it('should succeed', () => {
      expect(result.getStateSnapshot()).toMatchSnapshot();
    });
  });
});
