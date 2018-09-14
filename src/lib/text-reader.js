'use strict';

import fs from 'fs';
import readline from 'readline';
import { setScoreMap, reOrderScores, setFinalString, setTwoTeams, setTwoScores } from './utils';


const printLines = (fileName) => {
  // TODO: configure test env for ENV to point to jest env for testing purposes
  const filePath = process.env.NODE_ENV !== 'test' ? `${__dirname}/../assets/${fileName}` : `${__dirname}/../__test__/mock-assets/${fileName}`;

  const stream = fs.createReadStream(filePath);

  /*
  Per the Node docs, the readline module 
  provides an interface for reading data 
  from a Readable stream. 
  process.stdin is essentially an abstraction, 
  so this still falls within 
  this challenge's directions 
  of using stdin to read the text file
  */

  const map = {};

  const text = readline.createInterface({
    input: stream,
    output: process.stdout,
    terminal: false,
  });
  
  let finalString;

  return new Promise((resolve) => {
    text.on('line', (input) => {
      const getDigits = /\d+/g;
    
      // separate the teams
      const teams = setTwoTeams(input, getDigits, map);

      // separate the scores
      const scores = setTwoScores(input, getDigits);
    
      setScoreMap(scores, teams, map);
    
    
      // console.log(setFinalString(reOrderScores(map)));
      finalString = setFinalString(reOrderScores(map));
    });

    text.on('close', () => {
      resolve(finalString);
    });
  });
};

export default printLines;
