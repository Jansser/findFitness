import React, { Component } from 'react';

import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Card, ListItem, Button, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { searchProfessionals } from '../actions/professionals';

class ProfessionalList extends Component { 
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Profissionais'
    }
  }

  componentDidMount() {
    const { filter, searchProfessionals } = this.props;;

    searchProfessionals(filter);
  }

  render() {
    const { professionals, filter } = this.props;
    
    return(
      <ScrollView>
        {
          professionals.map(professional => (
            <Card key={professional.id}>
              <View>
                <Text>{professional.name}</Text>
                
                <Rating
                  readonly
                  style={{ paddingVertical: 10 }}
                  imageSize={20}
                  startingValue={professional.rate}
                />

                <Button 
                  style={{paddingTop: 10}}
                  icon={{name: 'user-circle', type: 'font-awesome'}}
                  title='Ver Perfil'
                  backgroundColor='black'
                  onPress={() => this.props.navigation.navigate('ProfessionalDetail', { professional: professional })} 
                />
              </View>
            </Card>
          ))
        }
      </ScrollView>
    );
  }
}

//TODO - Exibir mensagem quando não encontrar profissionais de acordo com filtro
//TODO - Exibir Modalidades <Badge value={3} textStyle={{ color: 'orange' }}/>

const mapStateToProps = state => {
  return {
    filter: state.main.filter,
    professionals: state.professionals.professionals,  
  }
}

const mapDispatchToProps = dispatch => ({
  searchProfessionals: (filter) => dispatch(searchProfessionals(filter)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfessionalList);