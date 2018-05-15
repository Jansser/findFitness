import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage, Rating, Header  } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { Keyboard } from 'react-native';
import { Icon } from 'react-native-elements';

class Search extends Component { 
  render() {
    return(
      <View style={{paddingTop: 20}}>
        <FormInput placeholder='Modalidade' onFocus={() => { this.props.navigation.navigate('ModalityList'); }}/>

        <Button 
          style={ {paddingTop: 10} }
          icon={{name: 'search', type: 'font-awesome'}}
          title='Buscar'
          backgroundColor='black'
          onPress={() => this.props.navigation.navigate('ProfessionalList')} 
        />
        
      </View>
    );
  }
}
  
export default Search;