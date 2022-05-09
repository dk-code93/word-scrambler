import './css/index.css';
import { useEffect, useState } from 'react';
import utils from './utils.js';

function App() {
  const [sentence, setSentence] = useState('Loading...');

  useEffect(() => {
    (async () => {
      const words = await utils.getSentence(1);
      setSentence(words.join(' '));
    })();
  }, []);

  return (
    <>
       { sentence }
    </>
  );
}

export default App;
