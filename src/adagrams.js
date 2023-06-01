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
      hand[letter] = hand[letter]++;
    }
  }

  const handKey = Object.keys(hand)

  return handKey;
};


export const usesAvailableLetters = (input, lettersInHand) => {
  const freqLetterInput = {}
  const freqLetterHand = {}

  for (const letter of input) {
    if (freqLetterInput[letter]) {
      freqLetterInput[letter]++;
    } else {
      freqLetterInput[letter] = 1;
    }
  }

  for (const letter of lettersInHand) {
    if (freqLetterHand[letter]) {
      freqLetterHand[letter]++;
    } else {
      freqLetterHand[letter] = 1;
    }
  }

  for (const letter of Object.keys(freqLetterInput)) {
    if ((freqLetterInput[letter] > freqLetterHand[letter]) || (freqLetterHand[letter] === undefined)) {
      return false;
    }
  };
  return true;
};

export const scoreWord = (word) => {
  const SCORE_BOARD = {
    1: new Set(["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"]),
    2: new Set(["D", "G"]),
    3: new Set(["B", "C", "M", "P"]),
    4: new Set(["F", "H", "V", "W", "Y"]),
    5: new Set(["K"]),
    8: new Set(["J", "X"]),
    10: new Set(["Q", "Z"]),
  }

  let score = 0;
  const extraPoints = 8;
  const extraPointsMinLength = 7;
  const extraPointsMaxLength = 10;
  const wordLength = word.length;

  for (const letter of word.toUpperCase()) {
    for (const letterPoint of Object.keys(SCORE_BOARD)) {
      if (SCORE_BOARD[letterPoint].has(letter)) {
        score += Number(letterPoint);
      }
    }
  }

  if ((wordLength >= extraPointsMinLength) && (wordLength <= extraPointsMaxLength)) {
    score += Number(extraPoints);
  }
  return score;
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
