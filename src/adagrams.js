export default class Adagrams {
  constructor() {
    this.handSize = 10;
    this.letterPool = {
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
    this.scoreBoard = {
      1: new Set(["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"]),
      2: new Set(["D", "G"]),
      3: new Set(["B", "C", "M", "P"]),
      4: new Set(["F", "H", "V", "W", "Y"]),
      5: new Set(["K"]),
      8: new Set(["J", "X"]),
      10: new Set(["Q", "Z"]),
    }
  }

  getRandomLetter = (lettersKey) => {
    let letterIndex = Math.floor((Math.random() * lettersKey.length));

    return letterIndex;
  }


  drawLetters = (letterIndex) => {
    const hand = {};
    const lettersKey = Object.keys(this.letterPool);

    while (Object.keys(hand).length < this.handSize) {
      let letter = lettersKey[this.getRandomLetter(lettersKey)];

      if (!(letter in hand)) {
        hand[letter] = 1;
      } else if (hand[letter] < this.letterPool[letter]) {
        hand[letter] = hand[letter]++;
      }
    }

    const handKey = Object.keys(hand)

    return handKey;
  };


  usesAvailableLetters = (input, lettersInHand) => {
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

    for (const letter in freqLetterInput) {
      if ((freqLetterInput[letter] > freqLetterHand[letter]) || (freqLetterHand[letter] === undefined)) {
        return false;
      }
    };

    return true;
  };

  scoreWord = (word) => {

    let score = 0;
    const extraPoints = 8;
    const extraPointsMinLength = 7;
    const extraPointsMaxLength = 10;
    const wordLength = word.length;

    for (const letter of word.toUpperCase()) {
      for (const letterPoint of Object.keys(this.scoreBoard)) {
        if (this.scoreBoard[letterPoint].has(letter)) {
          score += Number(letterPoint);
        }
      }
    }

    if ((wordLength >= extraPointsMinLength) && (wordLength <= extraPointsMaxLength)) {
      score += Number(extraPoints);
    }

    return score;
  };

  highestScoreFrom = (words) => {
    const scores = {}
    let ties = []
    let highestScore = 0;

    // Get total score for each word in Array 'words'
    for (const word of words) {
      scores[word] = this.scoreWord(word);

      /* Reassign Array 'ties' to a new array containing the new word with the highest score */
      if (scores[word] > highestScore) {
        highestScore = scores[word];
        ties = [word]
      } else if (scores[word] === highestScore) {
        ties.push(word)
      }
    }

    // Find top word amongst the words with the same high score
    let topWord = ties[0];

    for (const word of ties) {
      if (word.length === 10) {
        topWord = word;
        break;
      } else if (word.length < topWord.length) {
        topWord = word;
      }
    }

    return { "word": topWord, "score": highestScore }
  };
}







