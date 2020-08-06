import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Questions from './Compounants/Questions';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';



export default function App() {
  return (
    <div className="container">
      <Router>
        <div>
          <Jumbotron>
            <h1>Driver Knowlage Test</h1>
            <Link to='/questions'><Button variant="info"> Questions </Button></Link>{' '}
            <Link to='/questions'><Button variant="info"> View results </Button></Link>
          </Jumbotron>
        </div>
        <Switch>
          <Route path='/questions'>
            <Questions />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}