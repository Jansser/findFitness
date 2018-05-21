import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { FormInput, FormValidationMessage } from 'react-native-elements';

/**
 * to be wrapped with redux-form Field component
 */
const MyTextInput = props => {
  const { input, meta, ...inputProps } = props;
  
  return (
    <View>
      <FormInput
        {...inputProps}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
      />
    </View>
  );
}

export default MyTextInput;