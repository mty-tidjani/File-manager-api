import config from '../../../../src/core/config/config';

it('should verify configuration values are loaded', () => {
  expect(typeof config.port).toBe(typeof 'string');
  // expect(typeof config.port).toBe(typeof {});
});
