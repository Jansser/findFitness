import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { reduxForm, Field } from 'redux-form';
import MyTextInput from './common/MyTextInput';

class UserForm extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '...'
    }
  }
  
  submit = values => {
    Alert.alert('Submitted!', JSON.stringify(values));
    //submit to server
    //update redux
    //login
  }
  
  render() {
    const required = value => value ? undefined : 'Required'

    const { navigate } = this.props.navigation;
    const { handleSubmit, submitting } = this.props;

    return (
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <FormLabel>Nome</FormLabel>
        <Field
          name={'firstName'}
          component={MyTextInput}
        />

        <FormLabel>Sobrenome</FormLabel>
        <Field
          name={'lastName'}
          component={MyTextInput}
          
        />
        
        <FormLabel>Data de Nascimento</FormLabel>
        <Field
          name={'birthday'}
          component={MyTextInput}
        />

        <FormLabel>Email</FormLabel>
        <Field
          name={'email'}
          component={MyTextInput}
        />

        <FormLabel>Senha</FormLabel>
        <Field
          name={'password'}
          component={MyTextInput}
        />

        <Button 
          style={ {paddingTop: 10, paddingBottom: 10} }
          title='Salvar'
          backgroundColor='black'
          onPress={handleSubmit(this.submit)}
          loading={submitting}
        />
      </ScrollView>
    )
  }
}

/* 
onPress={handleSubmit((values) => Alert.alert('Submitted!', JSON.stringify(values))) }  
 
        <FormInput 
          keyboardType={'email-address'}
        />

         <FormInput
          secureTextEntry={true}
        />
*/
export default reduxForm({
  form: 'userForm'
})(UserForm);
