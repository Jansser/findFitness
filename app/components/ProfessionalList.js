import React, { Component } from 'react';

import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Card, ListItem, Button, Rating } from 'react-native-elements';

class ProfessionalList extends Component { 
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Profissionais'
    }
  }

  render() {
    const list = [
      {
        id: 1,
        name: 'Jansser',
        status: 1,
        rate: 5
      },
      {
        id: 2,
        name: 'George',  
        status: 1,
        rate: 0
      },
      {
        id: 3,
        name: 'João',
        rate: 3
      },
      {
        id: 4,
        name: 'Clark',
        rate: 4
      }
    ];

    return(
      <ScrollView>
        {
          list.map(professional => (
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

export default ProfessionalList;