import { CuisineTag } from '@aila/api-interfaces';

import * as helpers from './helpers';

describe('helpers', () => {
  describe('parseCuisineTags', () => {
    it('should parse input and return array of CuisineTags', () => {
      const input = 'asian,non-asian';
      const actual: CuisineTag[] = helpers.parseCuisineTags(input);
      const expected = [CuisineTag.Asian, CuisineTag.NonAsian];
      expect(actual).toStrictEqual(expected);
    });
  });
});
