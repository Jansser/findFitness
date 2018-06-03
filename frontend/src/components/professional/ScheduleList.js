import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  Table,
  Container,
  Icon,
  Tab,
  Header,
  Button
} from 'semantic-ui-react';

import { getSchedules, updateSchedule } from '../../utils/api';
import { formatDate } from '../../utils/helpers';
import { fetchSchedulesSuccess } from '../../actions/schedule';

const STATUS = {
  Solicitado: {
    key: 'Solicitado',
    icon: 'calendar outline',
    content: 'Solicitados'
  },
  Confirmado: {
    key: 'Confirmado',
    icon: 'calendar check',
    content: 'Confirmados'
  },
  Cancelado: {
    key: 'Cancelado',
    icon: 'calendar times',
    content: 'Cancelados'
  }
}

class ScheduleList extends Component {
  state = {
    loading: false,
    actualPane: STATUS.Solicitado
  }
  
  renderTable = (status) => {
    const { loading } = this.state;
    const { user, schedules } = this.props;

    if(loading === false && schedules.length === 0) {
      return (
        <Tab.Pane loading={loading}>
          <Header as='h2' icon>
            <Icon name={status.icon} />
            <Header.Subheader>
              <p textalign='center'>Não existem agendamentos <strong>{status.content}</strong>.</p>
            </Header.Subheader>
          </Header>
        </Tab.Pane>
      )
    }

    const renderStatusCell = (user, schedule) => {
      if(user.isProfessional && status.key === STATUS.Solicitado.key) {
        return (
          <Table.Cell 
            textAlign='center'
            verticalAlign='middle'>
            <Button.Group size='tiny'>
              <Button 
                onClick={() => this.updateStatus(schedule, STATUS.Confirmado)} 
                positive 
                icon 
                labelPosition='left'>
                <Icon name={STATUS.Confirmado.icon} />
                  Confirmar
              </Button>
              <Button.Or
                text='Ou' />
              <Button
                onClick={() => this.updateStatus(schedule, STATUS.Cancelado)} 
                negative
                icon 
                labelPosition='right'>
                <Icon name={STATUS.Cancelado.icon} />
                Cancelar
              </Button>
            </Button.Group>
          </Table.Cell>
        );
      } else {
        return (
          <Table.Cell 
          textAlign='center'
          verticalAlign='middle'>
          <Icon name={status.icon}/>
            <p className='status'>{schedule.status}</p>
          </Table.Cell>
        )
      }
    }

    return (
      <Tab.Pane loading={loading}>
        <Table celled 
          selectable
          color={'orange'}
          compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{user.isProfessional ? 'Aluno' : 'Profissional'}</Table.HeaderCell>
              <Table.HeaderCell>Data</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              schedules.map(schedule => (
                <Table.Row key={schedule.id}>
                  <Table.Cell>
                    <strong>{user.isProfessional ? schedule.user.firstName : schedule.professional.firstName}{}</strong>
                  </Table.Cell>
                  <Table.Cell>
                    {formatDate(schedule.date)}
                  </Table.Cell>
                  {renderStatusCell(user, schedule)}
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
      </Tab.Pane>)
  }

  handleTabChange = (event, data) => {
    let status = data.panes[data.activeIndex].menuItem;
    this.setState({actualPane: status});
    this.loadSchedules(status.key);
  }

  loadSchedules = (status) => {
    const { user, fetchSchedulesSuccess } = this.props;
    
    status = status || STATUS.Solicitado.key;

    this.setState({ loading: true });

    let id = user.isProfessional ? { professionalId: user.id } : { userId: user.id };
    
    getSchedules({
      ...id,
      status: status
    })
      .then(schedules => {
        fetchSchedulesSuccess(schedules);
        this.setState({ loading: false });
      });
  }

  updateStatus = (schedule, status) => {
    const { actualPane } = this.state;
    this.setState({ loading: true });

    updateSchedule(schedule.id, status.key)
      .then(response => {
        this.loadSchedules(actualPane.key);
      });
  }

  panes = [
    { 
      menuItem: { 
        ...STATUS.Solicitado
      }, 
      render: () => this.renderTable(STATUS.Solicitado) 
    },
    { 
      menuItem: { 
        ...STATUS.Confirmado
      }, 
      render: () => this.renderTable(STATUS.Confirmado) 
    },
    { 
      menuItem: { 
        ...STATUS.Cancelado
      }, 
      render: () => this.renderTable(STATUS.Cancelado) 
    },
  ];

  componentDidMount() {
    this.loadSchedules();
  }

  render() {
    return (
      <Container>
        <h1>Agendamentos</h1>

        <Tab 
          onTabChange={this.handleTabChange}
          panes={this.panes} />
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    schedules: state.schedule.schedules
  };
}

const mapDispatchToProps = dispatch => ({
  fetchSchedulesSuccess: (schedules) => dispatch(fetchSchedulesSuccess(schedules)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleList);