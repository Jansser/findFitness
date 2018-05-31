import React, { Component } from 'react';
import { 
  Button, 
  Form, 
  Grid, 
  Segment,
  Message 
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { 
  InputField
} from 'react-semantic-redux-form';
import { authenticate } from '../../actions/user';
import { loginProfessional } from '../../utils/api';
import { Redirect } from 'react-router';

class ProfessionalLogin extends Component {
  state = {
    error: ''
  }

  submit = values => {
    this.setState({error: ''});

    const { authenticate } = this.props;

    loginProfessional(values).then((response) => {
      if(!response.error) {
        authenticate(response, '');
      } else {
        this.setState({error: response.error});
      }
    });

  }
  
  required = value => value ? undefined : 'Required';
  email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'E-mail inválido' : undefined;

  render() {
    const { handleSubmit } = this.props;
    const { isAuthenticated, user } = this.props;
    const { error } = this.state;

    if(isAuthenticated) {
      return <Redirect to={`/professional/${user.id}/schedule`}/>;
    }

    return (
      <Grid
        className='grid-box'
        textAlign='center'
        id='main'
        verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Form onSubmit={handleSubmit(this.submit)}>
            <Segment stacked>
              <Field 
                name='email' 
                component={InputField} 
                fluid
                icon='mail'
                iconPosition='left'
                placeholder='E-mail'
                autoFocus
                validate={[ this.required, this.email ]}
              />
              

              <Field 
                name='password' 
                component={InputField} 
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Senha'
                type='password'
                validate={[ this.required ]}
              />

              <Form.Field>
                <Button color='orange' fluid size='small'>Entrar</Button>
              </Form.Field>

              <Form.Field>
                <Link to='/professional/form'>
                  <Button color='orange' fluid size='small'>Cadastre-se</Button>
                </Link>
              </Form.Field>

              { error &&
                <Message 
                  negative>
                  { error }
                </Message>
              }
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    user: state.user.user
  };
}

const mapDispatchToProps = dispatch => ({
  authenticate: (user, token) => dispatch(authenticate(user, token))
});

ProfessionalLogin = reduxForm({
  form: 'professionalLogin',
  enableReinitialize: true
})(ProfessionalLogin)

ProfessionalLogin = connect(mapStateToProps,mapDispatchToProps)(ProfessionalLogin);

export default ProfessionalLogin;
