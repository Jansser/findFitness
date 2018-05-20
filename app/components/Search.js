import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage, Rating, Header  } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { Keyboard } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { setFilter } from '../actions/main';

class Search extends Component { 
  render() {
    const { modality } = this.props.filter;
    const { navigate } = this.props.navigation;

    return(
      <View style={{paddingTop: 20}}>
        <FormInput 
          placeholder='Modalidade'
          value={modality.name} 
          onFocus={() => { navigate('ModalityList'); }} 
        />

        <FormLabel>Pontuação Mínima</FormLabel>

        <FormLabel>
          <Rating
            readonly
            style={{ paddingVertical: 10 }}
            imageSize={30}
            startingValue={0}
          />
        </FormLabel>

        <Button 
          style={ {paddingTop: 10} }
          icon={ {name: 'search', type: 'font-awesome'} }
          title='Buscar'
          backgroundColor='black'
          onPress={() => navigate('ProfessionalList')}  
        />
      </View>
    );
  }
}

//Validate if Modalidate is selected;

//Adicionar CREF
//Adicionar Descrição no professional

//Avaliação - Review - do usuário para o profissional

//Busca pela Nota
//Busca pelo Sexo
//Busca pelo valor

//Como fazer o cadastro de profissional c local e a busca por região?

//cadastros de cliente
//Facebook
 
//cadastro de profissinal


function mapStateToProps (state) {
  return {
    filter: state.main.filter  
  }
}

export default connect(
  mapStateToProps,
)(Search);
