import React, { Component } from 'react';
import { 
  Button, 
  Form, 
  Grid, 
  Segment, 
  Icon,
  Divider
} from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  InputField,
  TextAreaField,
  SelectField
} from 'react-semantic-redux-form';
import { createProfessional } from '../../actions/user';

//GET_MODALITIES
const options = [
  {
    key: 1,
    value: 1,
    text: 'Alongamento',
  },
  {
    key: 2,
    value: 2,
    text: 'Artes Marciais',  
  },
  {
    key: 3,
    value: 3,
    text: 'Ciclismo',
  },
  {
    key: 4,
    value: 4,
    text: 'Corrida',
  },
  {
    key: 5,
    value: 5,
    text: 'Crossfit',
  }, 
  {
    key: 6,
    value: 6,
    text: 'Dança',
  },
  {
    key: 7,
    value: 7,
    text: 'HiiT',
  }
];

class ProfessionalForm extends Component {
  submit = values => {
    const { createProfessional } = this.props;
    console.log('Values', values);
    
    createProfessional(values, () => {
      console.log('Callback');
    });
    
    //save database
    //authenticate on passport
    //redirect to main
  }

  render() {
    const { handleSubmit } = this.props;

    const required = value => value ? undefined : 'Required';
    const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'E-mail inválido' : undefined;

    return (
      <Grid
        textAlign='center'
        style={{ height: '80%' }}
        verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Form onSubmit={handleSubmit(this.submit)}>
            <Segment stacked>
              <Field 
                name='firstName' 
                component={InputField} 
                fluid
                icon='user'
                iconPosition='left'
                placeholder='Nome'
                autoFocus
                validate={[ required ]}
              />
              
              <Field 
                name='lastName' 
                component={InputField} 
                fluid
                icon='user'
                iconPosition='left'
                placeholder='Sobrenome'
                validate={[ required ]}
              />

              <Field 
                name='email' 
                component={InputField} 
                fluid
                icon='mail'
                iconPosition='left'
                placeholder='Email'
                validate={[ required, email ]}
              />

              <Field 
                name='password' 
                component={InputField} 
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Senha'
                type='password'
                validate={[ required ]}
              />

              <Divider horizontal>INFO PROFISSIONAL</Divider>

              <Field 
                name='CREF' 
                component={InputField} 
                fluid
                icon='drivers license'
                iconPosition='left'
                placeholder='CREF'
                validate={[ required ]}
              />

              <Field 
                name='modalities' 
                component={SelectField} 
                fluid
                multiple
                placeholder='Modalidades'
                validate={[ required ]}
                options={options}
              />

              <Field 
                name='description' 
                component={TextAreaField} 
                placeholder='Conte-nos um pouco sobre o seu perfil...'
                validate={[ required ]}
              />

              <Form.Field>
                <Button color='orange' fluid size='small'>Salvar</Button>
              </Form.Field>
              
              <Link to="/">
                <Button icon fluid labelPosition='left'>
                  <Icon name='cancel' />
                  Cancel
                </Button>
              </Link>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return state;
}

const mapDispatchToProps = dispatch => ({
  createProfessional: (values, callback) => dispatch(createProfessional(values, callback)),
});

ProfessionalForm = reduxForm({
  form: 'professionalForm',
  enableReinitialize: true
})(ProfessionalForm)

ProfessionalForm = connect(mapStateToProps,mapDispatchToProps)(ProfessionalForm);

export default ProfessionalForm;


//password - update model
//isProfessional

//description
//modalities