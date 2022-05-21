import './css/index.css';
import { useEffect, useState } from 'react';
import utils from './utils.js';
import { Container, Row, Button, Stack, Form } from 'react-bootstrap';

function App() {
  const [level, setLevel] = useState(1);
  const [sentence, setSentence] = useState('Loading...');
  const [words, setWords] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    (async () => {
      console.log('Running use effect', `This is the level: ${level}`)
      const result = await utils.getSentence(level);
      setWords([...result]);
      const scrambles = utils.sentenceScramble(result);
      setSentence(scrambles.join(' '));
    })();
  }, [level]);

  const validateLetter =(event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(target.className);

    if( value.toUpperCase() === name.split(' ')[1] ) {
      console.log('correcto!');
      target.className += ' correct';
      return;
    }
    
    // Reset styling if incorrect
    target.className = 'letter h-100 w-100 text-center form-control-lg'

  }

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
              Score: { score }
            </h3>
          </Stack>
        </Row>

        <Row className='gap-2 h-50 words'>
            {
              // Cycle through each word returning a stack of individual letters
              words.map((word, index) => {
                return (
                    <Stack key={word} gap={2} className='d-flex flex-row justify-content-between '>
                      {
                        word.split('').map((letter, i) => {
                          return (
                            <Form.Control 
                              className='letter h-100 w-100 text-center form-control-lg'
                              plaintext
                              maxLength={1}
                              type='text'
                              name={`${word} ${letter} ${i}`}
                              key={`${word} ${letter} ${i}`}
                              onChange={validateLetter}
                            ></Form.Control>
                          )
                        })
                      }
                      { index + 1 !== words.length &&
                        // Conditionally return a space if it's not the last word
                        <Form.Control 
                          plaintext
                          maxLength={1}
                          type='text'
                          name=' '
                          className='space text-center h-100 w-100 form-control-lg'
                        ></Form.Control>
                      }
                    </Stack>
                )
              })
            }
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
