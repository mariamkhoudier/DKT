import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Question from './Question';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




export default function Questions() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLasttName] = useState("");
  const [Address, setAdress] = useState("");
  const [City, setCity] = useState("");
  const [State, setState] = useState("");
  const [Zip, setZip] = useState("");
  const [options, setOptions] = useState([]);
  let [result, setResult] = useState({});

  let { path, url } = useRouteMatch();
  const [Questions, setQuestions] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(response => response.json())
      .then(json => {
        setQuestions(json);
      })
  }, []);



  let updateUserAnswer = (question, option) => {
    const allAnswersForAllTheOtherQuestions  =    options.filter(o => o.questionId != question.id);
    const anserForTheNewQuestion = { questionId: question.id, option };
    setOptions([...allAnswersForAllTheOtherQuestions, anserForTheNewQuestion]);
    
  };

  let submitAnswers = (event) => {
    event.preventDefault();
    fetch('http://localhost:4000/submitResult', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ customername: firstName + lastName, options: options })
    }).then(response => response.json())
      .then(serverRrsponse => {
        setResult(serverRrsponse);
      });



  }


  return (
    <div>
      <h1>Customer Details</h1>
      <Form onSubmit={submitAnswers}>
        <Row>
          <Col>
            <Form.Control placeholder="First name" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
          </Col>
          <Col>
            <Form.Control placeholder="Last name" value={lastName} onChange={(event) => setLasttName(event.target.value)} />
          </Col>
        </Row>
        <Form.Group controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="Address" value={Address} onChange={(event) => setAdress(event.target.value)} />
        </Form.Group>



        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control placeholder="City" value={City} onChange={(event) => setCity(event.target.value)} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control as="select" defaultValue="Choose..." value={State} onChange={(event) => setState(event.target.value)}>
              <option>Choose...</option>
              <option>...</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip" value={Zip} onChange={(event) => setZip(event.target.value)}>
            <Form.Label>Zip</Form.Label>
            <Form.Control />
          </Form.Group>
        </Form.Row>

        <h1>Questions</h1>
        {Questions.map(q =>
          <div key={q.id}><Question question={q} onUserSelect={(optionId) => updateUserAnswer(q, optionId)} /></div>
        )}
        <Button onClick={(event) => submitAnswers(event)} variant="info"> Submit </Button>
      </Form>
      <div>
        {result.result};
      </div>
    </div>
  )
}


