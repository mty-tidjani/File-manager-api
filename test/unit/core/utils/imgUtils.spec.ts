import { optimize, getMeta  } from '../../../../src/core/utils/imgUtils';
import path from 'path';

const file = path.join(__dirname, '../../../../uploads/images/thanos.jpg');

describe('ImgUtil functions', () => {
  /**
   * Getmeta
   */
  it('Should return null for empty string ', async () => {
    const vale = await getMeta('');
    expect(vale).toBe(null);
  });

  it('Should return null for null ', async () => {
    const vale = await getMeta(null);
    expect(vale).toBe(null);
  });

  it('Should return an object with file as param', async () => {
    const vale = await getMeta(file);

    expect(vale).toMatchObject({ height: 483, width: 928 });
  });
  
  /**
   * Optimise
   */
  const input = { height: 30, width: 30 }
  const input2 = { height: 483, width: 928 }
  const input3 = { height: 483 }

  it('Should return the same options for null second param', async () => {
    const vale = await optimize(input, '');
    expect(vale).toMatchObject(input);
  });

  it('Should return null for null ', async () => {
    const vale = await optimize(input, null);
    expect(vale).toMatchObject(input);
  });

  it('Should return', async () => {
    const vale = await optimize(input2, file);
    expect(vale).toMatchObject(input2);
  });
  
});

