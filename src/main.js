'use strict';

import printLines from './lib/text-reader';

printLines(process.argv[2])
  .then((final) => {
    console.log(final);
  })
  .catch((err) => {
    console.log(err);
  })




