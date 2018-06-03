import React, { Component } from 'react';
import { 
  Form, 
  Header,
  Message,
} from 'semantic-ui-react';
import StarRatingComponent from 'react-star-rating-component';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { 
  TextAreaField,
} from 'react-semantic-redux-form';
import { createReview } from '../../utils/api';
import { formValidate } from '../../utils/helpers';
import Loader from '../common/Loader';
import {reset} from 'redux-form';

class ReviewForm extends Component {
  state = {
    rate: 0,
    saving: false
  }

  handleRateChange(nextValue, prevValue, name) {
    this.setState({rate: nextValue});
  }

  submit = values => {
    this.setState({saving: true});
    const { rate } = this.state;
    const { user, professional, resetForm, updateReviews } = this.props;

    let review = {
      ...values,
      professionalId: professional.id,
      userId: user.id,
      message: '',
      rate
    }

    createReview(review).then(response => {
      if(!response.error) {
        this.setState({
          saving: false,
          message: 'Sua avaliação foi criada com sucesso!'
        });

        this.setState({rate: 0});
        resetForm();
        updateReviews(response);
      }
    });
  }

  render() {
    const { handleSubmit } = this.props;
    const { rate, saving, message } = this.state;

    return (
      <div>
        <Header as='h4' dividing>Deixe aqui sua avaliação</Header>
        <Loader loading={saving} text='Salvando Avaliação'/>
        <Form onSubmit={handleSubmit(this.submit)}>
          <Form.Field>
            <StarRatingComponent
              name={`rate`}
              onStarClick={this.handleRateChange.bind(this)}
              emptyStarColor={'silver'}
              value={rate}
            />
          </Form.Field>

          <Field 
            name='content' 
            component={TextAreaField} 
            placeholder='Diga o que achou do atendimento'
            validate={[ formValidate.required ]}
          />

          {
            message && 
            <Message
              positive>
              {message}
            </Message>
          }
          <Form.Button>Salvar</Form.Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.user
  };
}

const mapDispatchToProps = dispatch => ({
  resetForm: () => dispatch(reset('reviewForm'))
});

ReviewForm = reduxForm({
  form: 'reviewForm',
  enableReinitialize: true
})(ReviewForm)

ReviewForm = connect(mapStateToProps,mapDispatchToProps)(ReviewForm);

export default ReviewForm;
