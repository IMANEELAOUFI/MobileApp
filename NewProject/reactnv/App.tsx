/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import Naviagtion from './src/navigation';
import OneSignal from 'react-native-onesignal';


function App(): JSX.Element {

  useEffect(() => {
    // OneSignal Initialization
   OneSignal.setAppId('8bb4b988-b778-4a2d-9d21-75682cc53ab1');
   
   
   //Method for handling notifications opened
   OneSignal.setNotificationOpenedHandler(notification => {
   console.log("OneSignal: notification opened:", notification);
   });
   
   
   
  },[])
  return (
    <SafeAreaView style={styles.root}>
      <Naviagtion />
    </SafeAreaView>

  );
 
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#ADD8E6",
    justifyContent: 'center',
    
  },

  
});

export default App;
