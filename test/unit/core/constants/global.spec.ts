import { accessPaths } from '../../../../src/core/constants/global';

describe('Global constants', () => {
  it('Should check accessPaths contain image, video... paths exits and are valid strings', () => {

    const keys = ['image', 'docs', 'video', 'thumbs'];

    Object.keys(accessPaths).forEach(key => {
      expect(keys).toContain(key);
    });

    Object.values(accessPaths).forEach(value => {
      expect(value.length).toBeGreaterThanOrEqual(1);
    });
  });
});
