import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { 
  Button, 
  Form, 
  Grid, 
  Container, 
  Header, 
  Message, 
  Segment, 
  Icon, 
  Menu 
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import config from '../../config.json';

class UserLogin extends Component {
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
      <Grid
        textAlign='center'
        id='main'
        verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Form>
            <Segment stacked>
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
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserLogin;

/* 

*/