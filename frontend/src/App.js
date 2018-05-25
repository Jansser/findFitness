import React, { Component } from 'react';
import './App.css';
import { 
  Container 
} from 'semantic-ui-react';
import { 
  Route, 
  Switch 
} from "react-router-dom";

import Home from './components/Home';
//import Header from './components/Header';
import ProfessionalLogin from './components/professional/ProfessionalLogin';
import UserLogin from './components/user/UserLogin';
import Main from './components/Main';

//import logo from './logo.svg';
// import Search from './components/Search';
// import ProfessionalForm from './components/ProfessionalForm';
// import ProfessionalPage from './components/ProfessionalPage';
// import ProfessionalLogin from './components/ProfessionalLogin';

class App extends Component {
  render() {
    return(
      <div className='App'>
        <Container fluid>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/main" component={Main} />
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