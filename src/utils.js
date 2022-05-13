import axios from 'axios';

const arrayShuffle = (array) => {
    const copy = [...array];
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    // If the end result is the same, reshuffle
    if( array.join('') === copy.join('') ) { arrayShuffle(array) }
    return array;
}

const utils = {
    getSentence: async (digit) => {
        const { data: { data: { sentence } } } = await axios.get(`https://api.hatchways.io/assessment/sentences/${digit}`);
        const split = sentence.split(' ');
        return split;
    },
    sentenceScramble: (array) => {
        // Accepts an array of words that is copied
        const originalWords = [...array];
        const scrambledWords = [];
        // Perform a loop to scramble each word
        originalWords.forEach(word => {
            
            // 3 letter or less words don't shuffle, so skip
            if(word.length <= 3) {
                scrambledWords.push(word);
                return;
            }
            
            const letters = word.split('');
    
            // Extract first and last letter
            const first = letters.shift();
            const last = letters.pop();
    
            // Insert into a new array with the middle letters shuffled
            const scrambled = [first, ...arrayShuffle(letters), last].join('');
            scrambledWords.push(scrambled);
        });
        return scrambledWords;
    },
}

export default utils;