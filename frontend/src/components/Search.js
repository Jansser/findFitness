import React, { Component } from 'react';
import { 
  Button, 
  Dropdown, 
  Container, 
  Message, 
  Segment, 
  Card,
  Dimmer, 
  Loader, 
  Label,
  Icon,
  Header
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { getModalitiesSuccess, fetchProfessionalsSuccess } from '../actions/user';
import { getModalities, getProfessionals, getLastSchedule } from '../utils/api';
import { formatDate, SCHEDULE_STATUS } from '../utils/helpers';
import { connect } from 'react-redux';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      professionals: [],
      
      loading: false,
      modality: 0,
      schedule: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, data) {
    const { fetchProfessionalsSuccess } = this.props;

    this.setState({ 
      loading: true, 
      modality: data.value 
    });

    getProfessionals({modality: data.value})
      .then(data => {
        fetchProfessionalsSuccess(data)
        this.setState({ loading: false });
      });
  }

  componentDidMount () {
    const { getModalitiesSuccess, user } = this.props;

    getModalities().then(modalities => {
      getModalitiesSuccess(modalities)
    });

    if(user) {
      getLastSchedule({userId: user.id}).then(schedule => {
        this.setState({ schedule });
      });
    }
  }

  render() {
    const { loading, modality, schedule } = this.state;
    const { professionals, modalities } = this.props;
    const options = modalities ? modalities.map(modality => ({ key: modality.id, value: modality.id, text: modality.name })) : [];

    return (
      <Container className='box'>
        {
          schedule &&
          <Segment 
            color={SCHEDULE_STATUS[schedule.status].color}
            textAlign='left'
          >
            <Header as='h2'>
              <Icon name={SCHEDULE_STATUS[schedule.status].icon} color={SCHEDULE_STATUS[schedule.status].color} />
              <Header.Content>
                Próximo Agendamento
                <Header.Subheader>
                  Seu agendamento com <strong>{schedule.professional.firstName}</strong> em <strong>{formatDate(schedule.date)}</strong> está <strong>{schedule.status}</strong>.
                </Header.Subheader>
              </Header.Content>
            </Header>
          </Segment>
        }

        <Segment padded='very' color='orange'>
          <p><strong>Buscar Profsissionais</strong></p>

         <Dropdown 
          placeholder='Modalidade' 
          fluid 
          selection 
          options={options}
          onChange={this.handleChange} />
        </Segment>

        {
          !modality &&
            <Message info>
              <Message.Header>Selecione uma modalidade para realizar a busca.</Message.Header>
            </Message>
        }

        <Dimmer inverted active={loading}>
          <Loader inverted>Carregando...</Loader>
        </Dimmer>

        <Card.Group>
          {professionals.map(professional =>  
            <Card key={professional.id}>
              <Card.Content>
                <Card.Header>{professional.firstName}</Card.Header>
                <Card.Description>{professional.description}</Card.Description>
              </Card.Content>
              <Card.Content 
                textAlign='left' 
                extra>
                <Label.Group size='tiny'>
                  {professional.modalities.map(modality => <Label id={modality.id} color='orange'>{modality.name}</Label>)}  
                </Label.Group>
              </Card.Content>
              <Card.Content extra>
                <Link to={`/professional/${professional.id}`}>
                  <Button color='black' fluid>Ver perfil</Button>
                </Link>
              </Card.Content>
            </Card>
          )}
        </Card.Group>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    modalities: state.user.modalities,
    professionals: state.user.professionals,
    user: state.user.user,
  };
}

const mapDispatchToProps = dispatch => ({
  getModalitiesSuccess: (modalities) => dispatch(getModalitiesSuccess(modalities)),
  fetchProfessionalsSuccess: (professionals) => dispatch(fetchProfessionalsSuccess(professionals))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);