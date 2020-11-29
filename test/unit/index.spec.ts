import * as util from '../../src/utils/imgUtils';
import config from '../../src/config/config';

it('should verify configuration values are loaded', () => {
  expect(typeof config.port).toBe(typeof '');
  // expect(typeof config.port).toBe(typeof {});
});

