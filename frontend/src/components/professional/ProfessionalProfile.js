import React, { Component } from 'react';
import { 
  Container, 
  Button,
  Modal,
  Header,
  Icon,
  Message,
  Dimmer,
  Loader,

} from 'semantic-ui-react';
import {
  DateTimeInput
} from 'semantic-ui-calendar-react';
import { connect } from 'react-redux';
import { createSchedule } from '../../utils/api';
import ReviewForm from './ReviewForm';
import { formatDate } from '../../utils/helpers';

class ProfessionalProfile extends Component {
  state = {
    dateTime: '',
    error: '',
    loading: false,
    message: '',
    modalOpen: false
  }
  
  handleDateTimeChange = (event, { value }) => {
    this.setState({ dateTime: value });
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false });

  submit = () => {
    const { professionalId, user } = this.props;
    let { dateTime } = this.state;
    
    this.setState({
      loading: true,
      error: '',
      message: ''
    });

    if(dateTime === '') {
      this.setState({ 
        loading: false,
        error: 'Selecione um dia e hora.',
        message: ''
      });
    }

    let schedule = {
      professionalId: professionalId,
      userId: user.id,
      date: dateTime
    };

    createSchedule(schedule)
      .then(data => {
        if(data.error) {
          this.setState({ 
            loading: false,
            error: data.error,
          });
        } else {
          //let date = new Date(data.date);
          
          this.setState({ 
            loading: false,
            message: `Seu agendamento para ${formatDate(data.date)} foi solicitado, aguarde a confirmação de ${data.professional.firstName}.`,
            modalOpen: false
          });
        }
      });
  }
  
  render() {
    const { professionalId } = this.props;
    let { dateTime, error, message, modalOpen, loading } = this.state;
    let { handleOpen } = this;

    return (
      <div>
        <Container textAlign='left'>
          <h1>PROFESSIONAL {professionalId}</h1>

          <Modal 
            id='schedule-modal'
            open={modalOpen}
            onClose={this.handleClose}
            trigger={<Button color='orange' onClick={handleOpen}>Solicitar Agendamento</Button>} closeIcon>
            <Header icon='calendar' content='Agendamento' />
            <Modal.Content>
              <Dimmer inverted active={loading}>
                <Loader inverted>Salvando...</Loader>
              </Dimmer>

              <p>Selecione dia e hora para solicitar o seu agendamento com professional.name.</p>
              <div id='date-time-table'>
                <DateTimeInput
                  placeholder="Data e Hora"
                  value={dateTime}
                  iconPosition="left"
                  popupPosition='left center'
                  inline={true}
                  onChange={this.handleDateTimeChange} />
              </div>

              {error && 
                <Message negative>
                  <p>{error}</p>
                </Message>
              }
            </Modal.Content>
            <Modal.Actions>
              <Button
                onClick={this.handleClose}>
                <Icon name='remove' /> Cancelar
              </Button>

              <Button 
                color='orange' 
                onClick={this.submit}>
                <Icon name='checkmark' /> Salvar
              </Button>
            </Modal.Actions>
          </Modal>
          
          {
            message &&
            <Message positive>
              <p>{message}</p>
            </Message>
          }

        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;

  return {
    isAuthenticated: state.user.isAuthenticated,
    user: state.user.user,
    professionalId: id
  };
}

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalProfile);

/*
<ReviewForm />

text={{
  days: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  months: ['Janeiro', 'Fervereiro', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  today: 'Today',
  now: 'Now',
  am: 'AM',
  pm: 'PM'
}}
*/