import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';

import firebase from 'react-native-firebase';
import HomeScreen from "./src/HomeScreen/index.js";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // firebase things?
    };
  }

  componentDidMount() {
    firebase.messaging().hasPermission()
      .then(enabled => {
        if (enabled) {
          firebase.messaging().getToken().then(token => {
            console.log("LOG: ", token);
          })
          // user has permissions
        } else {
          firebase.messaging().requestPermission()
            .then(() => {
              // alert("User Now Has Permission")
            })
            .catch(error => {
              // alert("Error", error)
              // User has rejected permissions  
            });
        }
      });
}

notificationListener(){ 
  firebase.notifications().onNotification((notification) => {

  // Process your notification as required
  const {
    body,
    data,
    notificationId,
    sound,
    subtitle,
    title
  } = notification;
  console.log("LOG: ", title, body, JSON.stringify(data))
});
} 

componentWillMount(){
  this.notificationListener();
}

  render() {
    return <HomeScreen />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    height: 120,
    marginBottom: 16,
    marginTop: 32,
    width: 120,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modules: {
    margin: 20,
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  }
});
