import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { List, ListItem } from 'react-native-elements';

class ModalityList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Modalidades'
    }
  }

  render() {
    const list = [
      {
        id: 1,
        name: 'Musculação',
        status: 1
      },
      {
        id: 2,
        name: 'Corrida',  
        status: 1
      },
      {
        id: 3,
        name: 'Artes Marciais',
        status: 1
      },
      {
        id: 4,
        name: 'Ciclismo',
        status:1
      }
    ];

    return(
      <View>
        <List>
          {
            list.map(modality => (
              <TouchableOpacity 
                key={modality.id}
              >
                <ListItem
                  title={modality.name}
                />
              </TouchableOpacity>
            ))
          }
        </List>
      </View>
    );
  }
}

export default ModalityList;