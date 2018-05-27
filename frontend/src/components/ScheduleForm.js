import React, { Component } from 'react';
import { 
  Button,
  Modal,
  Header,
  Icon,
  Message
} from 'semantic-ui-react';

import {
  DateTimeInput
} from 'semantic-ui-calendar-react';

class ScheduleForm extends Component { 
  state = {
    dateTime: '',
    error: ''
  }
  
  handleDateTimeChange = (event, { value }) => {
    this.setState({ dateTime: value });
  }

  render() {
    let { dateTime, error } = this.state;

    return (
      <div>
        <Header icon='calendar' content='Agendamento' />
        
        <Modal.Content>
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
          <Button>
            <Icon name='remove' /> Cancelar
          </Button>
          <Button color='orange'>
            <Icon name='checkmark' /> Salvar
          </Button>
        </Modal.Actions>
      </div>
    )
  }
}

export default ScheduleForm;