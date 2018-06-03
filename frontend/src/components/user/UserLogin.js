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
import { SERVER_URL } from '../../utils/api';
import Loader from '../common/Loader';

class UserLogin extends Component {
  state = {
    loading: false
  }

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

    fetch(`${SERVER_URL}/auth/facebook`, options).then(response => {
        const token = response.headers.get('x-auth-token');
        this.setState({loading: false});

        response.json().then(user => {
          if (token) {
            authenticate(user, token);
          }
        });
    });
  };
  
  startLoading = () => {
    this.setState({loading: true});
  }

  render() {
    const { isAuthenticated } = this.props;
    const { loading } = this.state;

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
                fields="name,email,picture"
                callback={this.facebookResponse}
                onClick={this.startLoading} 
                render={renderProps => (
                  <Button onClick={renderProps.onClick} color='facebook' fluid size='small'>
                    <Icon name='facebook' /> Entrar com Facebook
                  </Button>
                )}/>
                <Loader text='Carregando' loading={loading} />
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
