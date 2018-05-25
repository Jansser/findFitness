import React, { Component } from 'react';
import { 
  Menu 
} from 'semantic-ui-react';
import { logout } from '../actions/user';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class Main extends Component {
  handleLogout = () => {
    const { logout } = this.props;

    logout();
    return this.toHome();
  };
  
  toHome = () => {
    return <Redirect to="/"/>;
  }
  render() {
    const { isAuthenticated, user } = this.props;

    if(!isAuthenticated) {
      return this.toHome();
    }

    return (
      <div>
        <Menu 
          fixed='left'
          inverted
          vertical
          width={3}>
          <Menu.Item>
            Olá {user.firstName} {user.lastName}
          </Menu.Item>
        </Menu>

        <Menu>
          <Menu.Menu position='right'>
            <Menu.Item name='logout' onClick={this.handleLogout}>
              Sair
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    user: state.user.user
  };
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
