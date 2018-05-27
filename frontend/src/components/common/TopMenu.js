import React, { Component } from 'react';
import { 
  Menu 
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { logout } from '../../actions/user';
import { Redirect, Switch } from 'react-router';

class TopMenu extends Component {
  handleLogout = () => {
    const { logout } = this.props;

    logout();
    this.toHome();
  };

  toHome = () => {
    return (
      <Switch>
        <Redirect to="/"/>;
      </Switch>
    )
  }

  render() {
    const { user } = this.props;

    return(
      <Menu
        id='top-menu'
        inverted
      >
        <Menu.Menu position='right'>
          <Menu.Item>
            {user.firstName} {user.lastName}
          </Menu.Item>
          <Menu.Item 
            color='orange'
            name='logout' 
            onClick={this.handleLogout}>
            Sair
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.user,
  };
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);