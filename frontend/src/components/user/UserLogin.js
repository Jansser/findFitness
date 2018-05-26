import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { 
  Button, 
  Form, 
  Grid, 
  Segment, 
  Icon, 
} from 'semantic-ui-react';
import config from '../../config.json';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { authenticate } from '../../actions/user';

class UserLogin extends Component {
  onFailure = (error) => {
    alert(error);
  };

  facebookResponse = (response) => {
    const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
    const { authenticate } = this.props;

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
            authenticate(user, token);
          }
        });
    });
  };

  render() {
    const { isAuthenticated } = this.props;
    
    if(isAuthenticated) {
      return <Redirect to="/search"/>;
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

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.isAuthenticated
  };
}

const mapDispatchToProps = dispatch => ({
  authenticate: (user, token) => dispatch(authenticate(user, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
