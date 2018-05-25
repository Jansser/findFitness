import React, { Component } from 'react';
import { 
  Button,
  Menu 
} from 'semantic-ui-react';

class Main extends Component {
  render() {
    return (
      <Menu 
          fixed='left'
          inverted
          vertical
          width={3}>
          <Menu.Item>
            Olá Jansser
          </Menu.Item>
          <Menu.Item>
            <Button>
              Log out
            </Button>
          </Menu.Item>
        </Menu>
    )
  }
}

export default Main;
//{user.firstName}
//onClick={this.logout}