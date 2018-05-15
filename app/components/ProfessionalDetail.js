import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

class ProfessionalDetail extends Component { 
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Perfil'
    }
  }

  render() {
    const { professional } = this.props.navigation.state.params;

    return (
      <View>
        <Text h2>{professional.name}</Text>
      </View>
    );
  }
}

export default ProfessionalDetail;