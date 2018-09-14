'use strict';

export const _setRankings = (teamScores) => {
  let ranking = 1;
  const newTeams = [];
  for (let i = 0; i < teamScores.length; i++) {
    const current = teamScores[i];

    // settings a pointsString property that determines whether the console displays "pt" or "pts"
    if (current.score === 1) {
      current.pointsString = 'pt';
    } else {
      current.pointsString = 'pts';
    }
    const previous = teamScores[i - 1] ? teamScores[i - 1] : null;

    // setting the ranking propery here
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


export const setScoreMap = (scores, teams, map) => {
  if (scores[0] > scores[1]) {
    map[teams[0]] += 3;
  } else if (scores[0] === scores[1]) {
    map[teams[0]] += 1;
    map[teams[1]] += 1;
  } else {
    map[teams[1]] += 3;
  }
  return map;
};

export const reOrderScores = (map) => {
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

export const setFinalString = (teamScores) => {
  const teamsWithRankings = _setRankings(teamScores);

  return teamsWithRankings.map((e) => {
    return `${e.ranking}. ${e.team}, ${e.score} ${e.pointsString}\n\r`;
  }).join('').trim();
};

export const setTwoTeams = (input, regex, obj) => {
  return input.split(', ').map((word) => {
    const newWord = word.replace(regex, '').trim();
    // setting the map here to avoid unnecesary additional loops
    if (!obj[newWord]) obj[newWord] = 0;
    return newWord;
  });
};

export const setTwoScores = (input, regex) => {
  return input.match(regex);
};
