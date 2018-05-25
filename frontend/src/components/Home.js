import React, { Component } from 'react';
import { Grid, Image, Button, Form, Header, Message, Segment, Icon, Menu, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <Grid
        id='main'
        textAlign='center'
        style={{ height: '100%' }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h1'
            className='white'
            textAlign='center'
            icon>
            
            <Icon name='marker'/>
            <strong>FIND FITNESS</strong>
            
            <Header.Subheader>
              Conectando profissionais qualificados a praticantes de atividade física.
            </Header.Subheader>
          </Header>
          
          <Form size='large'>
              <Form.Field>
                <Link to='/professional/sign'>
                  <Button size='big' fluid color='orange'>SOU PROFISSIONAL</Button>
                </Link>
              </Form.Field>

              <Form.Field>
                <Link to='/user/sign'>
                  <Button size='big' fluid color='orange'>SOU ALUNO</Button>
                </Link>
              </Form.Field>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Home;