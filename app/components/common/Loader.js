import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ActivityIndicator 
} from 'react-native';

const Loader = props => {
  return(
    <View style={styles.container}>
      <ActivityIndicator style={{marginBottom: 10}} color="black"/>
      <Text style={{ fontSize: 10}}>CARREGANDO...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loader;
