import * as util from '../../src/utils/imgUtils';
import config from '../../src/config/config'
import { expect } from 'chai'
describe('first-test', () => {
  it('should verify configuration values are loaded ', () => {
    expect(config.port).to.be.a('string');
  });
})
