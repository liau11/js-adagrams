export const drawLetters = () => {
  const LETTER_POOL = {
    A: 9,
    B: 2,
    C: 2,
    D: 4,
    E: 12,
    F: 2,
    G: 3,
    H: 2,
    I: 9,
    J: 1,
    K: 1,
    L: 4,
    M: 2,
    N: 6,
    O: 8,
    P: 2,
    Q: 1,
    R: 6,
    S: 4,
    T: 6,
    U: 4,
    V: 2,
    W: 2,
    X: 1,
    Y: 2,
    Z: 1,
  };

  const hand = {};
  const lettersKey = Object.keys(LETTER_POOL);

  while (Object.keys(hand).length < 10) {
    let letterIndex = Math.floor((Math.random() * lettersKey.length));
    let letter = lettersKey[letterIndex];

    if (!(letter in hand)) {
      hand[letter] = 1;
    } else if (hand[letter] < LETTER_POOL[letter]) {
      hand[letter] = hand[letter] + 1;
    }
  }

  const handKey = Object.keys(hand)

  return handKey;
};

// export const usesAvailableLetters = (input, lettersInHand) => {
//   // Implement this method for wave 2
// };

// export const scoreWord = (word) => {
//   // Implement this method for wave 3
// };

// export const highestScoreFrom = (words) => {
//   // Implement this method for wave 4
// };
