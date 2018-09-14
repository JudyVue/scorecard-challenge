'use strict';

import { _setRankings, setScoreMap, reOrderScores, setFinalString, setTwoTeams, setTwoScores } from './../lib/utils';

const mockTeams = 'Lions-TEST 3, Snakes-TEST 3';
const getDigits = /\d+/g;


describe('testing utility helpers', () => {
  test('#setTwoTeams should return an array of the two team names', () => {
    expect(setTwoTeams(mockTeams, getDigits, {})).toEqual(['Lions-TEST', 'Snakes-TEST']);
  });
  
  test('#setTwoScores should return an array of the team\'s scores of [3, 3]', () => {
    const scores = setTwoScores(mockTeams, getDigits);
    expect(scores).toEqual(['3', '3']);
    expect(typeof scores[0]).toEqual('string');
    expect(typeof scores[1]).toEqual('string');
    expect(typeof parseInt(scores[0], 10)).toEqual('number');
    expect(typeof parseInt(scores[1], 10)).toEqual('number');
  });

  test('#setScoreMap FOR TIE SITUATION: should return a new object with the team tallies', () => {
    const testMap = {};
    const teams = setTwoTeams(mockTeams, getDigits, testMap);
    const scores = setTwoScores(mockTeams, getDigits);

    const finalMap = setScoreMap(scores, teams, testMap);

    expect('Lions-TEST' in finalMap).toEqual(true);
    expect('Snakes-TEST' in finalMap).toEqual(true);
    expect(finalMap['Lions-TEST']).toEqual(1);
    expect(finalMap['Snakes-TEST']).toEqual(1);
  });
});

