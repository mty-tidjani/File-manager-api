import * as util from '../../src/core/utils/imgUtils';
import config from '../../src/core/config/config';

it('should verify configuration values are loaded', () => {
  expect(typeof config.port).toBe(typeof '');
  // expect(typeof config.port).toBe(typeof {});
});

