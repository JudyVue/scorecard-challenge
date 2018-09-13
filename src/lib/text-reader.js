'use strict';

const fs = require('fs');
const readline = require('readline');

const stream = fs.createReadStream(`${__dirname}/../assets/sample-input.txt`);

// Per the Node docs, the readline module provides an interface for reading data from a Readable stream. process.stidin is essentially an abstraction, so this still falls within this challeneg's directions of using stdin to read the text file
const text = readline.createInterface({
  input: stream,
  output: process.stdout,
  terminal: false,
});


const _setScoreMap = (scores, teams, map) => {
  if (scores[0] > scores[1]) {
    map[teams[0]] += 3;
  } else if (scores[0] === scores[1]) {
    map[teams[0]] += 1;
    map[teams[1]] += 1;
  } else {
    map[teams[1]] += 3;
  }
};

const _reOrderScores = (map) => {
  return Object.keys(map).map((key) => {
    return {
      team: key,
      score: map[key],

    };
  }).sort((a, b) => {
    if (a.team < b.team) return -1;
    if (a.team > b.team) return 1;
    if (a.team === b.team) return 0;
    return undefined;
  }).sort((a, b) => b.score - a.score);
};

const _setRankings = (teamScores) => {
  let ranking = 1;
  const newTeams = [];
  for (let i = 0; i < teamScores.length; i++) {
    const current = teamScores[i];

    // settings a pointsString property that determins whether the console displays "pt" or "pts"
    if (current.score === 1) {
      current.pointsString = 'pt';
    } else {
      current.pointsString = 'pts';
    }
    const previous = teamScores[i - 1] ? teamScores[i - 1] : null;
    if (previous && previous.score === current.score) {
      current.ranking = previous.ranking;
      ranking += 1;
    } else {
      current.ranking = ranking;
      ranking += 1;
    }
    newTeams.push(current);
  }
  return newTeams;
};

const _setFinalString = (teamScores) => {
  const teamsWithRankings = _setRankings(teamScores);

  const finalString = teamsWithRankings.map((e) => {
    return `${e.ranking}. ${e.team}, ${e.score} ${e.pointsString} \n\r`;
  }).join('');
  return finalString;
};

const map = {};

text.on('line', (input) => {
  const getDigits = /\d+/g;

  const teams = input.split(', ').map((word) => {
    const newWord = word.replace(getDigits, '').trim();
    // setting the map here to avoid unnecesary additional loops
    if (!map[newWord]) map[newWord] = 0;
    return newWord;
  });

  const scores = input.match(getDigits);

  // TODO: abstract this into own function
  _setScoreMap(scores, teams, map);


  console.log(_setFinalString(_reOrderScores(map)), 'final');

  text.close();
});

