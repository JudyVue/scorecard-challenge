'use strict';

import { _setRankings, setScoreMap, reOrderScores, setFinalString, setTwoTeams, setTwoScores } from './../lib/utils';

const mockTeamsTied = 'Lions-TEST 3, Snakes-TEST 3';
const mockTeamsWinLoss = 'Lions-TEST 1, Snakes-TEST 3';
const getDigits = /\d+/g;


describe('testing utility helpers', () => {
  test('#setTwoTeams should return an array of the two team names', () => {
    expect(setTwoTeams(mockTeamsTied, getDigits, {})).toEqual(['Lions-TEST', 'Snakes-TEST']);
  });

  describe('TIE situation', () => {
    test('#setTwoScores should return an array of the team\'s scores of [3, 3]', () => {
      const scores = setTwoScores(mockTeamsTied, getDigits);
      expect(scores).toEqual(['3', '3']);
      expect(typeof scores[0]).toEqual('string');
      expect(typeof scores[1]).toEqual('string');
      expect(typeof parseInt(scores[0], 10)).toEqual('number');
      expect(typeof parseInt(scores[1], 10)).toEqual('number');
    });
  
    test('#setScoreMap FOR TIE SITUATION: should return a new object with the team tallies', () => {
      const testMap = {};
      const teams = setTwoTeams(mockTeamsTied, getDigits, testMap);
      const scores = setTwoScores(mockTeamsTied, getDigits);
  
      const finalMap = setScoreMap(scores, teams, testMap);
  
      expect('Lions-TEST' in finalMap).toEqual(true);
      expect('Snakes-TEST' in finalMap).toEqual(true);
      expect(finalMap['Lions-TEST']).toEqual(1);
      expect(finalMap['Snakes-TEST']).toEqual(1);
    });

    test('#reOrderScores FOR TIE SITUATION: should return an array where teams are sorted by alphabetically and by score', () => {
      const mockMap = {
        Zebras: 1,
        Aardvarks: 1,
      };

      const reOrderedTeams = reOrderScores(mockMap);
      expect(reOrderedTeams[0].team).toEqual('Aardvarks');
      expect(reOrderedTeams[0].score).toEqual(1);
      expect(reOrderedTeams[1].team).toEqual('Zebras');
      expect(reOrderedTeams[0].score).toEqual(1);
    });
  });

  describe('WIN/LOSS situtation', () => {
    test('#setTwoScores FOR WIN/LOSS SITUATION should return array of team\'s scores of [1, 3]', () => {
      const scores = setTwoScores(mockTeamsWinLoss, getDigits);

      expect(scores).toEqual(['1', '3']);
      expect(scores[0]).not.toEqual(scores[1]);
      expect(typeof scores[0]).toEqual('string');
      expect(typeof scores[1]).toEqual('string');
      expect(typeof parseInt(scores[0], 10)).toEqual('number');
      expect(typeof parseInt(scores[1], 10)).toEqual('number');
    });

    test('#setScoreMap FOR WIN/LOSS SITUATION: should return a new object with the team tallies', () => {
      const testMap = {};
      const teams = setTwoTeams(mockTeamsWinLoss, getDigits, testMap);
      const scores = setTwoScores(mockTeamsWinLoss, getDigits);
  
      const finalMap = setScoreMap(scores, teams, testMap);
  
      expect('Lions-TEST' in finalMap).toEqual(true);
      expect('Snakes-TEST' in finalMap).toEqual(true);
      expect(finalMap['Lions-TEST']).toEqual(0);
      expect(finalMap['Snakes-TEST']).toEqual(3);
    });
  });

  describe('EQUAL RANKINGS', () => {
    const mockTeams = [
      { team: 'Cougars', score: 6 },
      { team: 'Aardvarks', score: 3 },
      { team: 'Badgers', score: 3 },
      { team: 'Zebras', score: 3 },
      { team: 'Losers', score: 2 },
      { team: 'MoreLosers', score: 1 },
      { team: 'Zero', score: 0 },
    ];
    test('#_setRankings FOR TIE SITUATION: should return array where objects have ranking property that equals the same number if there is a tie', () => {
    

      const newTeams = _setRankings(mockTeams);

      newTeams.forEach((e) => {
        expect(e.ranking).toBeTruthy();
        expect(e.pointsString).toBeTruthy();
      });

      newTeams.slice(1, 4).forEach((e) => {
        expect(e.ranking).toEqual(2);
      });
      expect(newTeams[0].ranking).toEqual(1);
      expect(newTeams[4].ranking).toEqual(5);
      expect(newTeams[5].ranking).toEqual(6);
      
      newTeams.slice(0, 5).forEach((e) => {
        expect(e.pointsString).toEqual('pts');
      });
      // expecting "pts" for 0 points
      expect(newTeams[6].pointsString).toEqual('pts');

      // expecting "pt" for 1 point
      expect(newTeams[5].pointsString).toEqual('pt');
      
      // ensuring rankings are accurate for rest of items
      expect(newTeams[0].ranking).toEqual(1);
      expect(newTeams[4].ranking).toEqual(5);
      expect(newTeams[5].ranking).toEqual(6);
      expect(newTeams[6].ranking).toEqual(7);
    });

    test('#setFinalString FOR TIE SITUATION: should return the final string with same rankings', () => {
      const finalString = setFinalString(mockTeams);
      const comparisonCollection = [
        '1. Cougars, 6 pts',
        '2. Aardvarks, 3 pts',
        '2. Badgers, 3 pts',
        '2. Zebras, 3 pts',
        '5. Losers, 2 pts',
        '6. MoreLosers, 1 pt',
        '7. Zero, 0 pts',
      ];
      
      comparisonCollection.forEach((e) => {
        expect(finalString.indexOf(e)).toBeGreaterThan(-1);
      });
      expect(finalString.split(/\n\r/)).toEqual(comparisonCollection);
    });
  });

  describe('DIFFERENT RANKINGS', () => {
    const mockTeams = [
      { team: 'Cougars', score: 6 },
      { team: 'Aardvarks', score: 5 },
      { team: 'Badgers', score: 4 },
      { team: 'Zebras', score: 3 },
      { team: 'Losers', score: 2 },
      { team: 'MoreLosers', score: 1 },
      { team: 'Zero', score: 0 },
    ];
    test('#_setRankings for DIFFERENT POINTS FOR EACH TEAM, should have rankings of 1 to ascending', () => {
      const newTeams = _setRankings(mockTeams);

      newTeams.forEach((e, index) => {
        expect(e.ranking).toEqual(index + 1);
        if (e.score === 1) {
          expect(e.pointsString).toEqual('pt');
        } else {
          expect(e.pointsString).toEqual('pts');
        }
      });
    });

    test('#setFinalString for DIFFERENT POINTS FOR EACH TEAM, should return final string with different ascending rankings', () => {
      const finalString = setFinalString(mockTeams);
      const comparisonCollection = [
        '1. Cougars, 6 pts',
        '2. Aardvarks, 5 pts',
        '3. Badgers, 4 pts',
        '4. Zebras, 3 pts',
        '5. Losers, 2 pts',
        '6. MoreLosers, 1 pt',
        '7. Zero, 0 pts',
      ];
      comparisonCollection.forEach((e) => {
        expect(finalString.indexOf(e)).toBeGreaterThan(-1);
      });
  
      expect(finalString.split(/\n\r/)).toEqual(comparisonCollection);
    });

  });
});

