import config from '../../../../src/core/config/config';

describe('Config file', () => {
  it('Should verify configuration values are loaded', () => {
    expect(typeof config.port).toBe(typeof 'string');
    // expect(typeof config.port).toBe(typeof {});
  });
});
