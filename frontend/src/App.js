import React, { Component } from 'react';
import './App.css';
import { 
  Container 
} from 'semantic-ui-react';
import { 
  Route, 
  Switch,
  withRouter 
} from "react-router-dom";

import Home from './components/Home';
import { connect } from 'react-redux';

import ProfessionalLogin from './components/professional/ProfessionalLogin';
import ProfessionalProfile from './components/professional/ProfessionalProfile';
import UserLogin from './components/user/UserLogin';
import ProfessionalForm from './components/professional/ProfessionalForm';
import TopMenu from './components/common/TopMenu';
import Search from './components/Search';
import ScheduleList from './components/professional/ScheduleList';

class App extends Component {
  render() {
    const { isAuthenticated } = this.props;

    return(
      <div className='App'>
        <Container fluid>
          {isAuthenticated &&
            <TopMenu {...this.props} />
          }

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/professional/sign" component={ProfessionalLogin} />
            <Route exact path="/professional/form" component={ProfessionalForm} />
            <Route exact path="/professional/:id" component={ProfessionalProfile} />
            <Route exact path="/professional/:id/schedule" component={ScheduleList} />
            <Route exact path="/user/sign" component={UserLogin} />
          </Switch>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.isAuthenticated
  };
}

const mapDispatchToProps = dispatch => ({
  //authenticate: (user, token) => dispatch(authenticate(user, token))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

//Docs
//https://www.npmjs.com/package/react-facebook-login
//https://medium.com/@alexanderleon/implement-social-authentication-with-react-restful-api-9b44f4714fa
//https://github.com/auth0/node-jsonwebtoken
//https://nodeontrain.xyz/tuts/secure_password/
//https://www.abeautifulsite.net/hashing-passwords-with-nodejs-and-bcrypt
//https://www.npmjs.com/package/semantic-ui-calendar-react
//https://medium.com/@arojunior/persisting-application-state-with-redux-and-localstorage-7a498e972c69

//Note: In a real-life application, you’ll probably want to store that data in a storage system like Redis or LocalStorage that’s persistent across sessions.

