import React from 'react';
import {View, Text, Modal, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {Constants} from 'expo';

class CityAlert extends React.Component{


  render(){

    return(
      <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.isVisible}
          onRequestClose={() => { Alert.alert('Type City Again.')}}
          >
            <TouchableOpacity
            style = {{
            borderRadius: 5,
            elevation: 3,
            height: 35,
            width: 180,
            backgroundColor:'dodgerblue',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 20,
            left: "22%",
           }}>
              <Text style = {{textAlign: 'center', color: 'white'}}>Indian Cities Only 🙏</Text>
            </TouchableOpacity>


      </Modal>
    )}
}

export default CityAlert;
