import React, { Component } from 'react';
import { Button, Form, Grid, Container, Header, Message, Segment, Icon, Menu } from 'semantic-ui-react';

class ProfessionalForm extends Component {
  render() {
    return (
      <Grid
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
                placeholder='Nome'
              />
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='Sobrenome'
              />
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='Email'
              />
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='CREF'
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Senha'
                type='password'
              />

              <Form.Field>
                <Button color='orange' fluid size='small'>Salvar</Button>
              </Form.Field>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default ProfessionalForm;