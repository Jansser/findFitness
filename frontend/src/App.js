import React, { Component } from 'react';
//import logo from './logo.svg';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import './App.css';
import { Button, Form, Grid, Message, Segment, Icon, Menu, Container } from 'semantic-ui-react'
import config from './config.json';
import { Route, Switch } from "react-router-dom";
import Home from './components/Home';
// import Search from './components/Search';
// import ProfessionalForm from './components/ProfessionalForm';
import Header from './components/Header';
// import ProfessionalPage from './components/ProfessionalPage';
// import ProfessionalLogin from './components/ProfessionalLogin';

class App extends Component {
  state = {
    isAuthenticated: false,
    user: null,
    token: ''
  };

  logout = () => {
    this.setState({ 
      isAuthenticated: false, 
      user: null, 
      token: ''
    });
  };

  onFailure = (error) => {
    alert(error);
  };

  facebookResponse = (response) => {
    const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});

    const options = {
        method: 'POST',
        body: tokenBlob,
        mode: 'cors',
        cache: 'default',
        'Content-Type': 'application/json'
    };

    
    fetch('http://localhost:3001/auth/facebook', options).then(response => {
        const token = response.headers.get('x-auth-token');

        response.json().then(user => {
          if (token) {
            this.setState({isAuthenticated: true, user, token});

            console.log('State', this.state);
          }
        });
    });
  };

  render() {
    return(
      <div className='App'>
        <Container fluid>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Container>
      </div>
    );
    
    const { isAuthenticated, user } = this.state;

    if(isAuthenticated) {
      return (
        <Menu 
          fixed='left'
          inverted
          vertical
          width={3}>
          <Menu.Item>
            Olá {user.firstName}
          </Menu.Item>
          <Menu.Item>
            <Button onClick={this.logout}>
              Log out
            </Button>
          </Menu.Item>
        </Menu>
      );
    }

    return (
      <div className="App">
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              FIND FITNESS
            </Header>

            <Form>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='E-mail'
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Senha'
                  type='password'
                />

                <Form.Field>
                  <Button color='teal' fluid size='small'>Entrar</Button>
                </Form.Field>

                <FacebookLogin
                  appId={config.FACEBOOK_APP_ID}
                  autoload={true}
                  fields="name,email,picture,user_gender,user_birthday"
                  callback={this.facebookResponse} 
                  render={renderProps => (
                    <Button onClick={renderProps.onClick} color='facebook' fluid size='small'>
                      <Icon name='facebook' /> Entrar com Facebook
                    </Button>
                  )}/>
              </Segment>
            </Form>

            <Message>
              New to us? <a >Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
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