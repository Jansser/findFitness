import React, { Component } from 'react';
import { 
  Menu,
  Label
} from 'semantic-ui-react';
import { connect } from 'react-redux';

class SideBar extends Component {
  render() {
    const { user } = this.props;
    
    const label = user.isProfessional ? (
      <Label color='orange'>Profissonal</Label>
    ) : (
      <Label color='yellow'>Aluno</Label>
    );

    return(
      <Menu 
        fixed='left'
        inverted
        vertical
        width={3}>
        <Menu.Item>
          Olá {user.firstName} {user.lastName}
        </Menu.Item>
        <Menu.Item>
          {label}
        </Menu.Item>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);