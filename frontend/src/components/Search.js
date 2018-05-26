import React, { Component } from 'react';
import { Button, Dropdown, Grid, Container, Header, Message, Segment, Icon, Menu, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { getModalitiesSuccess } from '../actions/user';
import { getModalities } from '../utils/api';
import { connect } from 'react-redux';

class Search extends Component {
  state = {
    professionals: [],
    
    loading: false,
    filter: {
      modality: ''
    }
  };

  handleModalityChange(event) {
    this.setState({
      filter: {
        modality: event.target
      }
    });
  }
      

  componentDidMount () {
    const { getModalitiesSuccess } = this.props;

    getModalities().then(modalities => {
      getModalitiesSuccess(modalities)
    });
  }

  render() {
    const { professionals, filter } = this.state;
    const { modalities } = this.props;
    const options = modalities ? modalities.map(modality => ({ key: modality.id, value: modality.id, text: modality.name })) : [];

    return (
      <Container className='box'>
        <Segment padded='very'>
          <p><strong>Buscar Profsissionais</strong></p>

         <Dropdown 
          placeholder='Modalidade' 
          fluid 
          selection 
          options={options}
          onChange={() => this.handleModalityChange} />
        </Segment>

        {
          filter.modality === '' &&
            <Message info>
              <Message.Header>Selecione uma modalidade para realizar a busca.</Message.Header>
            </Message>
        }

        <Card.Group>
          {professionals.map(professional =>  
            <Card>
              <Card.Content>
                <Card.Header>{professional.name}</Card.Header>
                <Card.Meta>Co-Worker</Card.Meta>
                <Card.Description>Matthew is a pianist living in Nashville.</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Link to='/professional'>
                  <Button color='black'>Ver perfil</Button>
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
    modalities: state.user.modalities
  };
}

const mapDispatchToProps = dispatch => ({
  getModalitiesSuccess: (modalities) => dispatch(getModalitiesSuccess(modalities))
});

export default connect(mapStateToProps,mapDispatchToProps)(Search);