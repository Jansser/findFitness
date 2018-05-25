import React, { Component } from 'react';
import { Button, Dropdown, Grid, Container, Header, Message, Segment, Icon, Menu, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Search extends Component {
  state = {
    professionals: [{ name: 'Jansser'}, { name: 'Eminem'}, { name: 'Clark'}, { name: 'Clark'}, { name: 'Jansser'}, { name: 'Eminem'}, { name: 'Clark'}, { name: 'Clark'}]
  };

  render() {
    const { professionals } = this.state;

    return (
      <Container className='box'>
        <Segment padded='very'>
          <p><strong>Buscar Profsissionais</strong></p>

         <Dropdown placeholder='Modalidade' fluid selection options={[]} />
        </Segment>

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

export default Search;