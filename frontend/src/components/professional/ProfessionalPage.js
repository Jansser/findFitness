import React, { Component } from 'react';
import { Container, Button } from 'semantic-ui-react';
import ReviewForm from './ReviewForm';

class ProfessionalPage extends Component {
  render() {
    return (
      <div>
        <Container>
          <h1>PROFESSIONAL NAME</h1>

          <Button color='orange'>Solicitar Agendamento</Button>

          <ReviewForm />
        </Container>
      </div>
    );
  }
}

export default ProfessionalPage;