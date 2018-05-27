import React, { Component } from 'react';
import { Form, Segment } from 'semantic-ui-react';

class ReviewForm extends Component {
  render() {
    return (
      <Segment>
        <Form>
          <Form.TextArea label='Avaliação' placeholder='Diga o que achou do atendimento' />
          <Form.Button>Salvar</Form.Button>
        </Form>
      </Segment>
    )
  }
}

export default ReviewForm;