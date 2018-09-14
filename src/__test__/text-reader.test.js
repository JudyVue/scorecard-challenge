'use strict';
 
import printLines from '../lib/text-reader';

const mockText = 'test-input.txt';

const comparisonCollection = [
  '1. Tarantulas-TEST, 6 pts',
  '2. Lions-TEST, 5 pts',
  '3. A Tied Team-TEST, 1 pt',
  '3. Another Tied Team-TEST, 1 pt',
  '3. FC Awesome-TEST, 1 pt',
  '3. Snakes-TEST, 1 pt',
  '7. Grouches-TEST, 0 pts',
];


describe('printLines test', () => {
  test('#printLines should provide proper output after parsing text', () => {
    printLines(mockText)
      .then((scores) => {
        expect(typeof scores).toEqual('string');
        expect(scores.split(/\n\r/)).toEqual(comparisonCollection);
      })
      .catch((err) => {
        expect(err).toEqual('AN ERROR OCCURRED WHEN IT SHOULDNT HAVE');
      });
  });

  test('#printLines ERROR: Should catch error due to bad file name', () => {
    printLines('bad file name')
      .then((res) => {
        expect(res).toEqual('SHOULD NOT HAVE HIT HERE');
      })
      .catch((err) => {
        expect(err).toBeTruthy();
        expect(err.code).toEqual('ENOENT');
      });
  });

  test('#printLines ERROR: should throw error if no filename passed in', () => {
    expect(() => {
      printLines();
    }).toThrow();
  });
});
