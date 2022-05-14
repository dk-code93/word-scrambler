import './css/index.css';
import { useEffect, useState } from 'react';
import utils from './utils.js';
import { Container, Row, Button, Stack } from 'react-bootstrap';

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
    <Container fluid className='bkg'>
      <Container className='game bg-light'>

        <Row className='h-50 pt-3'>
          <Stack gap={4}>
            <h1 className='text-center'>
              { sentence }
            </h1>
            <h5 className='text-center'>
              Guess the sentence! Start typing
            </h5>
            <h5 className='text-center'>
              The yellow blocks are meant for spaces
            </h5>
            <h3 className='text-center'>
              Score: { 'score here' }
            </h3>
          </Stack>
        </Row>

        <Row>
          <Button 
          onClick={() => {setLevel(level + 1)}}
          >Next</Button>
        </Row>
      </Container>
    </Container>
  );
}

export default App;
