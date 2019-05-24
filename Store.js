import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {observable, action} from 'mobx';
import {Permissions, Location} from 'expo';

class Store {
  @observable item = {};
  @observable weekItem = {};
  @observable weekIndicator = true;
  @observable textIn = '';
  @observable city = '';
  @observable indicator = true;
  @observable icon_name = '';
  @observable dat = new Date();
  @observable day_night = this.dat.getHours();
  @observable errorMessage = '';
  @observable lat = false;
  @observable lon = false;
  @observable am_pm = "A.M.";
  @observable modVis = false;
  @observable timer;

  @action fetchAll(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=17a0f40e9b8996d64e3a3d57c29b4f84`)
    .then((response) => response.json())
    .then((resposejson) => {

      this.item = resposejson;
      this.city = this.item.name;

      this.fetchWeek();
      this.indicator = false;
    })
    .catch((error) => {
      console.error(error);
    })
  }

  @action fetchWeek(){
    this.weekIndicator = true;
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&appid=17a0f40e9b8996d64e3a3d57c29b4f84`)
    .then((response) => response.json())
    .then((reson) => {
      this.weekItem = reson;
      // console.warn(this.weekItem.list.length);
      this.weekIndicator = false;
    })
    .catch((error) => {
      console.error(error);
    })
  }

  @action fetchText(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.textIn},in&appid=17a0f40e9b8996d64e3a3d57c29b4f84`)
    .then((response) => response.json())
    .then((res)=>{
      if(res.cod != 200){
        this.city = 'Bangalore';
        console.warn("som1");
        this.fetchWeek();
        console.warn("som1");
        return this.showModal();
      }
      else {
        this.item = res;
        console.warn("t1");
        this.city = this.textIn;
        console.warn("t2");
        this.fetchWeek();
        this.indicator = false;
        console.warn("t3");
      }
    })
  }

  @action showModal(){
    this.modVis = true;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.modVis = false;
    },3000)
  }

  @action todayEx (){
    if(this.day_night < 6)
      return 8;
    if(this.day_night < 9)
      return 7;
    if(this.day_night < 12)
      return 6;
    if(this.day_night < 15)
      return 5;
    if(this.day_night < 18)
      return 4;
    if(this.day_night < 21)
      return 3;
    if(this.day_night < 24)
      return 2;
  }

  @action async getLocation() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log(status);
    if(status !== 'granted') {
      console.log('PERMISSION NOT GRANtED');
    }
    else {
      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      this.lat = location.coords.latitude;
      this.lon = location.coords.longitude;
      this.fetchAll();
    }
  }

  @action getapTime(str){
    if(parseInt(str) >= 12)
    {
      if(parseInt(str)>12)
        return (parseInt(str)-12).toString()+" P.M.";
      else {
        return (str)+" P.M."
      }
    }
    else
    {
      if(str === '00')
        str = '12';
      return parseInt(str)+" A.M."
    }
  }

  @action getIcon(weather){
    if(weather === 'Clouds'){
      if(this.item.weather.description === 'overcast clouds')
        this.icon_name = 'weather-partlycloudy';
      else
        this.icon_name = 'weather-cloudy';
    }
    else if(weather === 'Rain')
    {
      this.icon_name = 'weather-pouring';
    }
    else if(weather === 'Thunderstorm')
    {
      this.icon_name = 'weather-lightning-rainy'
    }
    else if(weather === 'Mist'|| weather === 'Fog')
    {
      this.icon_name = 'weather-fog'
    }
    else if(weather === 'Haze')
    {
      this.icon_name = 'waves'
    }
    else if(weather === 'Drizzle')
    {
      this.icon_name = 'weather-rainy'
    }
    else
    {
      if(this.day_night>4 && this.day_night<17)
        this.icon_name = 'weather-sunny';
      else
        this.icon_name = 'weather-night';

    }
    return this.icon_name;
  }

  @action getIcons(weather, time){
    if(weather === 'Clouds'){
      if(weather.description === 'overcast clouds')
        this.icon_name = 'weather-partlycloudy';
      else
        this.icon_name = 'weather-cloudy';
    }
    else if(weather === 'Rain')
    {
      this.icon_name = 'weather-pouring';
    }
    else if(weather === 'Thunderstorm')
    {
      this.icon_name = 'weather-lightning-rainy'
    }
    else if(weather === 'Mist'|| weather === 'Fog')
    {
      this.icon_name = 'weather-fog'
    }
    else if(weather === 'Haze')
    {
      this.icon_name = 'waves'
    }
    else if(weather === 'Drizzle')
    {
      this.icon_name = 'weather-rainy'
    }
    else
    {
      if(time[time.length-4] === 'A')
        this.icon_name = 'weather-sunny';
      else
        this.icon_name = 'weather-night';

    }
    return this.icon_name;
  }

  @action timeConverter(unix_timestamp){

    var date = new Date(unix_timestamp*1000);
    // Hours part from the timestamp

    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
      // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();
    if(hours>=13)
    {
      hours-=12;
      this.am_pm = 'P.M.';
    }
    else {
      this.am_pm = 'A.M.'
    }
    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ' ' + this.am_pm;

    return formattedTime;
  }

}

export default new Store();


// @action indexOfToday(){
//   if(!this.weekIndicator){
//     for(var i=0; i<9; i++)
//     {
//       if(this.listEm[i].dt_txt.substring(this.listEm[i].dt_txt.length-8, this.listEm[i].dt_txt.length-6) === '00' ){
//         return i;
//       }
//     }
//   }
// }
