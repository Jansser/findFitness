import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

class LoginForm extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Login'
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    
    return (
      <View>
        <FormLabel>Email</FormLabel>
        <FormInput
          keyboardType={'email-address'}
        />

        <FormLabel>Senha</FormLabel>
        <FormInput
          secureTextEntry={true}
        />
        
        <Button 
          style={ {paddingTop: 10, paddingBottom: 10} }
          title='Entrar'
          backgroundColor='black'
          onPress={() => navigate('LoginForm')}  
        />

        <Text style={{textAlign: 'center'}}>
          Ainda não é cadastrado?
        </Text>

        <Button 
          style={ {paddingTop: 10} }
          title='Cadastre-se'
          backgroundColor='black'
          onPress={() => navigate('UserForm')}  
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//<FormValidationMessage>Error message</FormValidationMessage>
//<FormValidationMessage>Error message</FormValidationMessage>

export default LoginForm;