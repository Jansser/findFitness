import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Loader from './common/Loader';

import { connect } from 'react-redux';
import { setFilter } from '../actions/main';
import { fetchModalities } from '../actions/modalities';

import { NavigationActions } from 'react-navigation';

class ModalityList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Modalidades'
    }
  }

  componentDidMount() {
    const { getModalities } = this.props;

    getModalities();
  }

  setModality(modality) {
    const { setFilter } = this.props;
    
    setFilter({
      modality: modality
    });

    this.toHome();
  }

  toHome = () => {
    const { navigate } = this.props.navigation;
    navigate('Home');
  }

  render() {
    const { modalities } = this.props;

    if(modalities.length === 0) {
      return <Loader/>;
    }

    return(
      <ScrollView>
        {modalities.length === 0 && <Loader />}
        
        <List>
          {
            modalities.map(modality => (
              <TouchableOpacity 
                key={modality.id}
                onPress={() => this.setModality(modality)}
              >
                <ListItem
                  title={modality.name}
                />
              </TouchableOpacity>
            ))
          }
        </List>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    filter: state.main,
    modalities: state.modalities.modalities,  
  }
}

const mapDispatchToProps = dispatch => ({
  setFilter: (filter) => dispatch(setFilter(filter)),
  getModalities: () => dispatch(fetchModalities()),
});
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalityList);