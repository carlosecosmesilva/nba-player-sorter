function createComparisons(players, maxComparisons) {
  const pairs = [];
  for (let first = 0; first < players.length; first += 1) {
    for (let second = first + 1; second < players.length; second += 1) {
      pairs.push([players[first], players[second]]);
    }
  }
  return pairs.sort(() => Math.random() - 0.5).slice(0, maxComparisons);
}

export function createSorter(players, maxComparisons) {
  let comparisonIndex = 0;
  const scores = new Map(players.map((player) => [player[0], 0]));
  const comparisons = createComparisons(players, maxComparisons);

  return {
    get currentPair() {
      return comparisons[comparisonIndex];
    },
    get remainingComparisons() {
      return comparisons.length - comparisonIndex;
    },
    get isComplete() {
      return comparisonIndex >= comparisons.length;
    },
    choose(playerIndex) {
      const selectedPlayer = comparisons[comparisonIndex][playerIndex];
      scores.set(selectedPlayer[0], scores.get(selectedPlayer[0]) + 1);
      comparisonIndex += 1;
    },
    skip() {
      comparisonIndex += 1;
    },
    get progressPercent() {
      return (comparisonIndex / comparisons.length) * 100;
    },
    ranking() {
      return [...players].sort((first, second) => scores.get(second[0]) - scores.get(first[0]));
    },
    scoreFor(player) {
      return scores.get(player[0]);
    },
  };
}
