import React, {Component} from 'react';
import {
  StyleSheet,  Text,  View,  TextInput,  ActivityIndicator,  FlatList,
  ImageBackground,  Image,  TouchableOpacity,  ScrollView,  Modal
} from 'react-native';

import {observer} from 'mobx-react';
import { Ionicons, MaterialCommunityIcons, Feather, SimpleLineIcons}
from '@expo/vector-icons';

import Store from './Store.js';
import styles from './style.js';
import CityAlert from './wrongCityModal.js'
const day_img = require('./Images/after_noon.png');
const night_img = require('./Images/night.png');
const boat_img = require('./Images/sunrise-phu-quoc-island-ocean.jpg');
const boats_img = require('./Images/pexels-photo-2182040.jpeg');


@observer class App extends React.Component {

  componentDidMount(){
    Store.getLocation();
  }

  renderItem = (item) => {
    return(
      <View style={styles.weatherlist}>
      <Text style = {styles.weatherTxt}>{item.main}</Text>

      <MaterialCommunityIcons size = {142} color = 'white' name = {Store.getIcon(item.main)}/>

      </View>
    )
  }

  renderItems = (item) => {
    let weekTime = Store.getapTime(item.dt_txt.substring(item.dt_txt.length-8,item.dt_txt.length-6));
    return(
      <View style = {styles.forecastItem}>
        <Text>
        {(item.main.temp-273.15).toFixed(0)}°ᶜ
        </Text>
        <MaterialCommunityIcons size = {22} color = 'white' name = {Store.getIcons(item.weather[0].main, weekTime)}/>
        <Text>
        {weekTime}
        </Text>
      </View>
    )
  }

  renderCity = () => {
    if(Store.textIn !== ''){
     console.warn('dsad');
     Store.fetchText();
   }
    else
      Store.textIn = 'Bangalore';
  }

  render() {
    let img = boats_img;

    return (

      <View style={{
        height: '100%',
        backgroundColor: 'black'
      }}>
      {
        Store.indicator ?
        <ActivityIndicator size="large" color="red" style={{flex:1}}/>
        :

        <ImageBackground source={img} style={{width: '100%', height: '100%', opacity: 0.9}}>
        <View>
        <View style= {{alignItems: 'center'}}>
          <View style = {styles.searchActive}>
            <TextInput
              style = {styles.textBox}
              value={Store.textIn}
              onChangeText={value => Store.textIn = value}
              returnKeyType = 'search'
            />
            <TouchableOpacity onPress = {() => this.renderCity()}>
              <Ionicons size ={32} style = {
                {color:'white',
                paddingTop: 5,
                paddingBottom:5,
                paddingRight: 8}
                } name = 'ios-search'/></TouchableOpacity>
          </View>
        </View>

        <View>
          <Text style = {styles.citytext}>
            {Store.item.name}, {Store.item.sys.country}
            </Text>
        </View>

        <View style = {{flexDirection: 'row', justifyContent: 'space-around'}}>

          <View style = {[styles.sunrise, styles.riseset]}>
            <Feather color='black' size={22} name = 'sun'/>
            <Text style = {{color: 'black'}}>
              {Store.timeConverter(Store.item.sys.sunrise)}
            </Text>
          </View>

        <View style = {{flexDirection: 'column'}}>
          <FlatList
            data={Store.item.weather}
            renderItem={({item}) => this.renderItem(item)}
            keyExtractor={(item ,index) => index.toString()}>
          </FlatList>

          <Text style = {{ color: 'white', fontSize: 55, textAlign: 'center'}}>
            {(Store.item.main.temp-273.15).toFixed(0)}°ᶜ
          </Text>
          </View>

            <View style = {[styles.sunset, styles.riseset]}>
              <Feather color='ghostwhite' size={22} name = 'moon'/>
              <Text style = {{color: 'ghostwhite'}}>
                {Store.timeConverter(Store.item.sys.sunset)}
              </Text>
            </View>
          </View>

        </View>

        <View style = {styles.midBar}>
          <View style={styles.humid}>
            <SimpleLineIcons name ='drop' size = {32} style={{ color: 'white', opacity:0.5 }} />
            <Text style = {{color: 'white', fontSize: 22}}>
              {Store.item.main.humidity}%
            </Text>
          </View>

          <View style = {styles.templist}>
            <Text style = {{ color: 'white', fontSize: 18}}>
              {(Store.item.main.temp_min-273.15).toFixed(2)}°ᶜ | {(Store.item.main.temp_max-273.15).toFixed(2)}°ᶜ
            </Text>
          </View>

          <View style = {styles.windSpeed}>
            <Feather size = {32} color ='white' name = 'wind' style={{ opacity: 0.5 }}/>
            <Text style = {{color: 'white', fontSize: 18}}>
              {Store.item.wind.speed} km/h
            </Text>

          </View>
        </View>



        <ScrollView style = {styles.ScrollV}>

          {Store.weekIndicator?
            <ActivityIndicator size="large" color="red" style={{flex:1}}/>

            :

            <View style = {styles.foreCast}>
            <Text>
              Today
            </Text>
            <FlatList
              data={Store.weekItem.list.splice(0, Store.todayEx())}
              renderItem={({item}) => this.renderItems(item)}
              keyExtractor={(item ,index) => index.toString()}
              horizontal={true}
              >
            </FlatList>
            <Text>
              Tomorrow
            </Text>
            <FlatList
              data={Store.weekItem.list.splice(0,8)}
              renderItem={({item}) => this.renderItems(item)}
              keyExtractor={(item ,index) => index.toString()}
              horizontal={true}
              >
            </FlatList>
            </View>
          }
          </ScrollView>
          <CityAlert isVisible={Store.modVis}/>

        </ImageBackground>
      }
      </View>
    );
  }
}



export default App;
