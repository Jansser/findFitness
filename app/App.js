import React from 'react';
import { StyleSheet, Text, View, TextInput, StatusBar } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage, Header  } from 'react-native-elements';
import ModalityList from './components/ModalityList';
import ProfessionalList from './components/ProfessionalList';
import Search from './components/Search';

import { Constants } from 'expo';
import { createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import ProfessionalDetail from './components/ProfessionalDetail';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const MainNavigator = createStackNavigator({
  Home: {
    screen: Search, 
    navigationOptions: {
      header: null
    }   
  },
  ModalityList: {
    screen: ModalityList,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      }
    }
  },
  ProfessionalList: {
    screen: ProfessionalList,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      }
    }
  },
  ProfessionalDetail: {
    screen: ProfessionalDetail,
      navigationOptions: {
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'black',
        }
      }
  }
}, {
});

export default class App extends React.Component {
  render() {
    const store = createStore(reducer, compose(
      applyMiddleware(thunk)
    ));

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <View style={{ backgroundColor: 'black', height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={'black'} barStyle="light-content"/>
          </View>

          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});
