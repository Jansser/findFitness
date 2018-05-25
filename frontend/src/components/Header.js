
import React, { Component } from 'react';
import { Button, Form, Grid, Message, Segment, Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return(
      <Menu
        inverted
        >
        <Menu.Item link as={Link} to={'/'}>
          <Icon name='marker' />
          <strong>FIND FITNESS</strong>
        </Menu.Item>

        
      </Menu>
    )
  }
}

export default Header;

{/* <Menu.Menu position='right'>
  <Menu.Item link as={Link} to={'/search'}>
    <Button color='orange'>BUSCAR PROFISSIONAIS</Button>
  </Menu.Item>

  <Menu.Item link as={Link} to={'/login/professional'}>
    <Button color='orange'>SOU PROFISSIONAL</Button>
  </Menu.Item>
</Menu.Menu> */}