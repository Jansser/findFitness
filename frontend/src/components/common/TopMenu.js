import React, { Component } from 'react';
import { 
  Menu 
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { logout } from '../../actions/user';
import { Redirect } from 'react-router';

class TopMenu extends Component {
  handleLogout = () => {
    const { logout } = this.props;

    logout();
    return this.toHome();
  };

  toHome = () => {
    return <Redirect to="/"/>;
  }

  render() {
    return(
      <Menu>
        <Menu.Menu position='right'>
          <Menu.Item name='logout' onClick={this.handleLogout}>
            Sair
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);