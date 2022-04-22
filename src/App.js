import './css/index.css';
import { useEffect, useRef, useState } from 'react';
import utils from './utils.js';

function App() {
  const [sentence, setSentence] = useState('Loading...')

  useEffect(() => {
    (async () => {
      setSentence(await utils.getSentence(1));
    })();
  }, []);

  return (
    <>
       { sentence }
    </>
  );
}

export default App;
