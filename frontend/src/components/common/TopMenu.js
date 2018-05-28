import React, { Component } from 'react';
import { 
  Menu,
  Icon
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { logout } from '../../actions/user';
import { Link } from 'react-router-dom';

class TopMenu extends Component {
  handleLogout = () => {
    const { logout, history } = this.props;

    logout();
    history.push('/');
  };

  render() {
    const { user } = this.props;
    const links = user.isProfessional ? 
      {
        main: `/professional/${user.id}/schedule`,
        search: ''
      } :
      {
        main: '/search',
        search: '/search'
      };

    return(
      <Menu
        id='top-menu'
        inverted
      >
        <Menu.Item 
        link as={Link} to={links.main}
          id="menu-logo"
        >
          <Icon name='marker'/>FIND FITNESS
        </Menu.Item>
        <Menu.Menu position='right'>
          {
            user.isProfessional === false &&
            <Menu.Item
              link as={Link} to={links.search}>
              <Icon name='search'/>
              Buscar Profissionais
            </Menu.Item>
          }
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
    history: ownProps.history
  };
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);