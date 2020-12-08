import { mediaSCD, mediaTCD } from '../../../../src/core/constants/type.codes';

describe('Status codes', () => {
  it('Should check check mediaSCD', () => {

    const keys = ['inUse', 'banned', 'deleted'];

    Object.keys(mediaSCD).forEach(key => {
      expect(keys).toContain(key);
    });

    Object.values(mediaSCD).forEach(value => {
      expect(value.length).toEqual(1);
    });
  });

  it('Should check check Media Type Codes', () => {

    const keys = ['image', 'video', 'document'];

    Object.keys(mediaTCD).forEach(key => {
      expect(keys).toContain(key);
    });

    Object.values(mediaTCD).forEach(value => {
      expect(value.length).toEqual(1);
    });
  });
});
