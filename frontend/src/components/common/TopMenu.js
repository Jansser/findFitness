import React, { Component } from 'react';
import { 
  Menu,
  Icon,
  Image,
  Header,
  Label
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { logout } from '../../actions/user';
import { Link } from 'react-router-dom';
import { getUserPicture } from '../../utils/helpers';

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
        search: '',
        professionalProfile: `/professional/${user.id}`
      } :
      {
        main: '/search',
        search: '/search',
        schedule: `/user/${user.id}/schedule`
      };

    const label = user.isProfessional ? <Label color='orange' size='mini'>Profissional</Label> : <Label color='yellow' size='mini'>Aluno</Label>;
    
    const menuItems = user.isProfessional ? [
      <Menu.Item
        link as={Link} to={links.professionalProfile}>
        <Icon name='user'/>
        Meu Perfil
      </Menu.Item>,
      <Menu.Item
        link as={Link} to={links.main}>
        <Icon name='calendar'/>
        Agendamentos
      </Menu.Item>
    ] : [
      <Menu.Item
        link as={Link} to={links.search}>
        <Icon name='search'/>
        Buscar Profissionais
      </Menu.Item>,
      <Menu.Item
        link as={Link} to={links.schedule}>
        <Icon name='calendar'/>
        Agendamentos
      </Menu.Item>
    ];

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
          {menuItems.map(menuItem => menuItem)}

          <Menu.Item>
            <Header as='h5' inverted textAlign='left'>
              <Image src={getUserPicture(user)} size='tiny' circular />
              <Header.Content>
                {user.firstName} {user.lastName}
                {label}
              </Header.Content>
            </Header>
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