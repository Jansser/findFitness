import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { Button, Form, Grid, Message, Segment, Icon, Menu, Container } from 'semantic-ui-react'
import { Route, Switch } from "react-router-dom";
import Home from './components/Home';
// import Search from './components/Search';
// import ProfessionalForm from './components/ProfessionalForm';
import Header from './components/Header';
import ProfessionalLogin from './components/professional/ProfessionalLogin';
import UserLogin from './components/user/UserLogin';
// import ProfessionalPage from './components/ProfessionalPage';
// import ProfessionalLogin from './components/ProfessionalLogin';

class App extends Component {
  render() {
    return(
      <div className='App'>
        <Container fluid>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/professional/sign" component={ProfessionalLogin} />
            <Route exact path="/user/sign" component={UserLogin} />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default App;
//<Header />

//Docs
//https://www.npmjs.com/package/react-facebook-login
//https://medium.com/@alexanderleon/implement-social-authentication-with-react-restful-api-9b44f4714fa
//https://github.com/auth0/node-jsonwebtoken

//Note: In a real-life application, you’ll probably want to store that data in a storage system like Redis or LocalStorage that’s persistent across sessions.