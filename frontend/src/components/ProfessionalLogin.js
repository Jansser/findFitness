import React, { Component } from 'react';
import { Button, Form, Grid, Container, Header, Message, Segment, Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class ProfessionalLogin extends Component {
  render() {
    return (
      <Grid
        className='grid-box'
        textAlign='center'
        style={{ height: '80%' }}
        verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Form>
            <Segment stacked>
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='E-mail'
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Senha'
                type='password'
              />

              <Form.Field>
                <Button color='orange' fluid size='small'>Entrar</Button>
              </Form.Field>

              <Form.Field>
                <Link to='/form/professional'>
                  <Button color='orange' fluid size='small'>Cadastre-se</Button>
                </Link>
              </Form.Field>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default ProfessionalLogin;