'use strict';

import fs from 'fs';
import readline from 'readline';
import { setScoreMap, reOrderScores, setFinalString, setTwoTeams, setTwoScores } from './utils';

const printLines = (fileName) => {
  if (!fileName) {
    throw new Error('You did not input a file name. Please use "sample-input.txt", or create a new .txt file that you can add to the assets folder that matches sample-input.txt\'s format.');
  }
  return new Promise((resolve, reject) => {
    const filePath = process.env.NODE_ENV !== 'test' ? `${__dirname}/../assets/${fileName}` : `${__dirname}/../__test__/mock-assets/${fileName}`;
    const stream = fs.createReadStream(filePath);
    stream.on('error', (error) => {
      reject(error);
    });
  
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
    text.on('line', (input) => {
      const getDigits = /\d+/g;
      
      // separate the teams
      const teams = setTwoTeams(input, getDigits, map);
  
      // separate the scores
      const scores = setTwoScores(input, getDigits);
      
      setScoreMap(scores, teams, map);
      finalString = setFinalString(reOrderScores(map));
    });
  
    text.on('close', () => {
      resolve(finalString);
    });
  });
};

export default printLines;
