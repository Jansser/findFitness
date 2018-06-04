import React, { Component } from 'react';
import { 
  Button, 
  Form, 
  Grid, 
  Segment, 
  Icon,
  Divider,
  Image,
  Header,
  Message
} from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  InputField,
  TextAreaField,
  SelectField
} from 'react-semantic-redux-form';
import CurrencyInput from 'react-currency-input';

import { createProfessional } from '../../utils/api';
import { authenticate, getModalitiesSuccess } from '../../actions/user';
import { getModalities } from '../../utils/api';
import { Redirect } from 'react-router';
import { formValidate } from '../../utils/helpers';

const ImagePreview = props => {
  const { imagePreviewUrl } = props;

  if(imagePreviewUrl) {
    return (
      <div>
        <Image id='image-preview-upload' src={imagePreviewUrl} size='tiny' circular />
        
        <Header.Subheader className='sub-header'>
          Clique na imagem para trocar a foto do perfil.
        </Header.Subheader>
      </div>);
  } else {
    return (
      <Header as='h3' icon textAlign='center'>
        <Icon name='add user' circular size='huge'/>
        
        <Header.Subheader>
          Clique na imagem para adicionar uma foto ao perfil.
        </Header.Subheader>
      </Header>);
  }
}

class ProfessionalForm extends Component {
  state = {
    imagePreviewUrl: '',
    formError: ''
  }
  
  componentDidMount () {
    const { getModalitiesSuccess } = this.props;

    getModalities().then(modalities => {
      getModalitiesSuccess(modalities)
    });
  }

  handleImageChange = event => {
    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({imagePreviewUrl: reader.result});
    }

    reader.readAsDataURL(file)
  }

  submit = values => {
    this.setState({formError: ''});

    const { authenticate } = this.props;
    const { imagePreviewUrl } = this.state;
    
    if(!values.timeValue) {
      this.setState({formError: 'Informe o valor da aula.'});
      return;
    }
    
    const unformattedAmount = values.timeValue.replace(/[^0-9|.|-]+/g,"");
    values = {
      ...values,
      timeValue: Number(unformattedAmount)
    }

    let data = new FormData();
    
    for(let name in values) {
      data.append(name, values[name]);
    }

    data.append('picture',  this.fileInput.files[0] || null);

    if(imagePreviewUrl === '') {
      this.setState({formError: 'Selecione uma imagem para o perfil.'});
      return;
    }

    createProfessional(data).then(response => {
      if(!response.error) {
        authenticate(response, '');    
      } else {
        //Mostrar erro
      }
    });
  }
  
  render() {
    const { handleSubmit, isAuthenticated, modalities, user } = this.props;
    const { imagePreviewUrl, formError } = this.state;
    const options = modalities ? modalities.map(modality => ({ key: modality.id, value: modality.id, text: modality.name })) : [];

    if(isAuthenticated) {
      return <Redirect to={`/professional/${user.id}/schedule`}/>;
    }

    return (
      <Grid
        textAlign='center'
        style={{ height: '100%' }}
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
                validate={[ formValidate.required ]}
              />
              
              <Field 
                name='lastName' 
                component={InputField} 
                fluid
                icon='user'
                iconPosition='left'
                placeholder='Sobrenome'
                validate={[ formValidate.required ]}
              />

              <Field 
                name='email' 
                component={InputField} 
                fluid
                icon='mail'
                iconPosition='left'
                placeholder='Email'
                validate={[ formValidate.required, formValidate.email ]}
              />

              <Field 
                name='password' 
                component={InputField} 
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Senha'
                type='password'
                validate={[ formValidate.required ]}
              />

              <Divider horizontal>INFO PROFISSIONAL</Divider>
              
              <label>
                <ImagePreview imagePreviewUrl={imagePreviewUrl}/>

                <input
                  hidden
                  onChange={(event) => this.handleImageChange(event)}
                  name='picture' 
                  type="file"
                  ref={
                    input => { this.fileInput = input; }
                  } />
              </label>
              
              <Field 
                name='CREF' 
                component={InputField} 
                fluid
                icon='drivers license'
                iconPosition='left'
                placeholder='CREF'
                validate={[ formValidate.required ]}
              />

              <Field 
                name='modalities' 
                component={SelectField} 
                fluid
                multiple
                placeholder='Modalidades'
                validate={[ formValidate.required ]}
                options={options}
              />

              <Field 
                name='description' 
                component={TextAreaField} 
                placeholder='Conte-nos um pouco sobre o seu perfil...'
                validate={[ formValidate.required ]}
              />
              
              <Form.Field>
                <label className='left'>Valor da hora/aula</label>
                <Field name='timeValue'
                  type='text'
                  component={props => (
                  <CurrencyInput  
                      prefix="$" 
                      prefix='R$'
                      decimalSeparator="," 
                      thousandSeparator="."
                      value={ props.input.value } 
                      onChangeEvent={ props.input.onChange } />)} />
              </Form.Field>
              
              { formError && 
                <Message negative>
                  {formError}
                </Message>
              }
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
  return {
    user: state.user.user,
    isAuthenticated: state.user.isAuthenticated,
    modalities: state.user.modalities
  };
}

const mapDispatchToProps = dispatch => ({
  authenticate: (user, token) => dispatch(authenticate(user, token)),
  getModalitiesSuccess: (modalities) => dispatch(getModalitiesSuccess(modalities))
});

ProfessionalForm = reduxForm({
  form: 'professionalForm',
  enableReinitialize: true
})(ProfessionalForm)

ProfessionalForm = connect(mapStateToProps,mapDispatchToProps)(ProfessionalForm);

export default ProfessionalForm;
