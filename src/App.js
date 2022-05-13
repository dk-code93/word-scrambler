import './css/index.css';
import { useEffect, useState } from 'react';
import utils from './utils.js';

function App() {
  const [level, setLevel] = useState(1);
  const [sentence, setSentence] = useState('Loading...');
  const [words, setWords] = useState([]);

  useEffect(() => {
    (async () => {
      console.log('Running use effect', `This is the level: ${level}`)
      const result = await utils.getSentence(level);
      setWords([...result]);
      const scrambles = utils.sentenceScramble(result);
      setSentence(scrambles.join(' '));
    })();
  }, [level]);

  return (
    <>
       { sentence }
    </>
  );
}

export default App;
