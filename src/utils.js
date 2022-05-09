import axios from 'axios';

const arrayShuffle = (array) => {
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

    return array;
}

const sentenceScramble = (string) => {
    // Split string by spaces
    const originalWords = string.split(' ');
    const scrambledWords = [];
    // Perform a loop to scramble each word
    originalWords.forEach(word => {
        
        const letters = word.split('');

        // 3 letter or less words don't shuffle, so skip
        if(letters.length <= 3) {
            scrambledWords.push(letters.join(''));
            return;
        }

        // Extract first and last letter
        const first = letters.shift();
        const last = letters.pop();

        // Insert into a new array with the middle letters shuffled
        const scrambled = [first, ...arrayShuffle(letters), last].join('');
        scrambledWords.push(scrambled);
        
        console.log(scrambledWords);
        
    });
    return scrambledWords;
}

const utils = {
    getSentence: async (digit) => {
        const { data: { data: { sentence } } } = await axios.get(`https://api.hatchways.io/assessment/sentences/${digit}`);
        const scrambled = sentenceScramble(sentence);
        return scrambled;
    },

}

export default utils;