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
import UserLogin from './components/user/UserLogin';
import Main from './components/Main';
import ProfessionalForm from './components/professional/ProfessionalForm';
import SideBar from './components/common/SideBar';
import TopMenu from './components/common/TopMenu';
import Search from './components/Search';

class App extends Component {
  render() {
    const { isAuthenticated } = this.props;

    return(
      <div className='App'>
        <Container fluid>
          {isAuthenticated &&
            <TopMenu />
          }

          {isAuthenticated &&
            <SideBar />
          }

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/professional/sign" component={ProfessionalLogin} />
            <Route exact path="/professional/form" component={ProfessionalForm} />
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
//<Header />

//Docs
//https://www.npmjs.com/package/react-facebook-login
//https://medium.com/@alexanderleon/implement-social-authentication-with-react-restful-api-9b44f4714fa
//https://github.com/auth0/node-jsonwebtoken
//https://nodeontrain.xyz/tuts/secure_password/
//https://www.abeautifulsite.net/hashing-passwords-with-nodejs-and-bcrypt

/* 
  <Container fluid>
    //Use redux
    //https://redux.js.org/recipes/structuring-reducers/basic-reducer-structure

    //No Estado geral
    if(userisLoggedIm) {
      <TopMenu />
      <SideBar />
    }
    //https://reacttraining.com/react-router/web/example/auth-workflow

    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/search" component={Main} /> //Poderia ir direto para a pagina de search QUANDO LOGADO N PROFISSA
      para agendamento quando profissa
      <Route exact path="/professional/sign" component={ProfessionalLogin} />
      <Route exact path="/user/sign" component={UserLogin} />
    </Switch>
  </Container>
*/
//Note: In a real-life application, you’ll probably want to store that data in a storage system like Redis or LocalStorage that’s persistent across sessions.