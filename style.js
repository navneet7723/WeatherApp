import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  textBox:{
    color: 'black',
    opacity: 1,
    borderRadius: 2,
    width:250,
    height: 40,
    marginLeft: 10,
    paddingTop: 10,
    paddingRight: 0,
    paddingBottom: 10,
    paddingLeft: 10,
    borderBottomColor: 'white',

  },
  searchActive:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: 'ghostwhite',
    opacity: 0.7,
    width: 305,
    height: 52,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 27,
  },
  citytext:{
    color: 'white',
    fontSize: 15,
    fontStyle: 'italic',
    textAlign: 'left',
    paddingTop: 5,
    paddingLeft: 40,
  },
  weatherlist: {
    alignItems: 'center'
  },
  riseset: {
    marginTop: 120,
    alignItems: 'center',
    height: 50,
  },
  sunrise: {
    justifyContent: 'center',
    backgroundColor: 'white',
    opacity: 0.6,
    padding: 7,
    height: 60,
    borderRadius: 9,
    elevation: 5,
    alignItems: 'center',
    flexDirection: 'column'
  },
  sunset: {
    justifyContent: 'center',
    backgroundColor: 'black',
    opacity: 0.6,
    padding: 7,
    height: 60,
    borderRadius: 9,
    elevation: 5,
    alignItems: 'center',
    flexDirection: 'column'
  },
  weatherTxt: {
    color: 'white',
    fontSize: 30
  },
  midBar:{
    backgroundColor: 'dimgray',
    opacity: 0.7,
    borderRadius: 10,
    elevation: 3,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  humid: {
    opacity:1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width:'26%'
  },
  templist: {
    opacity:1,
    borderRadius: 2,
    width: '44.33%',
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderRightWidth: 2,
    borderLeftWidth: 2,
    elevation: 1,
    borderTopWidth: 0.1,
    borderBottomWidth: 0.1,
    height: 60,
  },
  windSpeed: {
    opacity:1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '26%',
  },
  forecastItem:{
    height: 55,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  foreCast: {
    marginHorizontal: 5,
    borderRadius: 20,
    elevation: 2,
    marginTop: 15,
    height: 200,
    backgroundColor: 'white',
    opacity: 0.6,
    padding: 10,
  },
  ScrollV: {
    marginVertical: 5,
  }

});

export default styles;
