import React, { Component } from 'react';
import { 
  Container, 
  Button,
  Modal,
  Header,
  Icon,
  Message,
  Segment
} from 'semantic-ui-react';
import {
  DateTimeInput
} from 'semantic-ui-calendar-react';
import { connect } from 'react-redux';
import { createSchedule, getProfessional } from '../../utils/api';
import ReviewForm from './ReviewForm';
import { formatDate } from '../../utils/helpers';
import Loader from '../common/Loader';
import StarRatingComponent from 'react-star-rating-component';

class ProfessionalProfile extends Component {
  state = {
    dateTime: '',
    error: '',
    loading: false,
    message: '',
    modalOpen: false,

    professional: {},
    professLoading: true,
  }
  
  componentDidMount() {
    const { professionalId } = this.props;

    getProfessional({ id: professionalId }).then(professional => {
      this.setState({ 
        professLoading: false, 
        professional: professional 
      });
    });
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
          this.setState({ 
            loading: false,
            message: `Seu agendamento para ${formatDate(data.date)} foi solicitado, aguarde a confirmação de ${data.professional.firstName}.`,
            modalOpen: false
          });
        }
      });
  }
  
  render() {
    const { user } = this.props;
    
    let { dateTime, error, message, modalOpen, loading, professional, professLoading } = this.state;
    let { handleOpen } = this;

    return (
      <div>
        <Container textAlign='left'>
          <Loader loading={professLoading} text={'Carregando'}/>

          <Segment stacked>
            <h1 className='professional-title'>{professional.firstName} {professional.lastName}</h1>
            <p>{professional.description}</p>
            
            <div className='professional-rating'>
              <StarRatingComponent 
                name="rate-average" 
                editing={false}
                value={professional.averageRating}
                />
            </div>

            <Modal 
              id='schedule-modal'
              open={modalOpen}
              onClose={this.handleClose}
              trigger={
                <Button color='orange' onClick={handleOpen}>
                  <Icon name='calendar' />
                  Solicitar Agendamento</Button>
                } 
                closeIcon>
              <Header icon='calendar' content='Agendamento' />
              <Modal.Content>
                <Loader loading={loading} text='Salvando'/>

                <p>Selecione dia e hora para solicitar o seu agendamento com professional.name.</p>
                <div id='date-time-table'>
                  <DateTimeInput
                    placeholder="Data e Hora"
                    value={dateTime}
                    iconPosition="left"
                    popupPosition='left center'
                    inline={true}
                    onChange={this.handleDateTimeChange}
                    dateFormat='MM-DD-YYYY' />
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
          </Segment>
          {
            message &&
            <Message positive>
              <p>{message}</p>
            </Message>
          }
          
          {
            user.isProfessional === false &&
            <ReviewForm professional={professional} />
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
