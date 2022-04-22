import axios from 'axios';

const utils = {
    getSentence: async (digit) => {
        const { data: { data: { sentence } } } = await axios.get(`https://api.hatchways.io/assessment/sentences/${digit}`);
        return sentence;
    }
}

export default utils;