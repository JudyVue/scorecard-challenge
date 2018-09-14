'use strict';
 
import printLines from '../lib/text-reader';

const mockText = 'test-input.txt';

const comparisonCollection = [
  '1. Tarantulas-TEST, 6 pts ',
  '2. Lions-TEST, 5 pts ',
  '3. A Tied Team-TEST, 1 pt ',
  '3. Another Tied Team-TEST, 1 pt ',
  '3. FC Awesome-TEST, 1 pt ',
  '3. Snakes-TEST, 1 pt ',
  '7. Grouches-TEST, 0 pts',
];


describe('printLines test', () => {
  test('should provide proper output after parsing text', () => {
    printLines(mockText)
      .then((scores) => {
        expect(typeof scores).toEqual('string');
        expect(scores.split(/\n\r/)).toEqual(comparisonCollection);
      })
      .catch((err) => {
        expect(err).toEqual('AN ERROR OCCURRED WHEN IT SHOULDNT HAVE');
      });
  });
});
