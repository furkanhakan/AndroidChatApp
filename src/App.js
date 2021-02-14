/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useContext, useEffect } from "react";
import Navigation from './navigation/index'
import UserAuth from './screens/UserAuth';
import { AuthProvider } from "./context/FirebaseContext";
import { AuthContext } from "./context/FirebaseContext";
import messaging from '@react-native-firebase/messaging';

function App() {
  const { user } = useContext(AuthContext);
  const register = async () => {
    await messaging().registerDeviceForRemoteMessages();
    await messaging().requestPermission();
    console.log(await messaging().getToken())
  }

  const messageListener = async () => {
    try {
      messaging().onNotificationOpenedApp((notification) => {
        const { title, body } = notification;
        console.log(title, body)
      });

      messaging().setBackgroundMessageHandler((remoteMessage) => {
        console.log(remoteMessage.data)
      })


      messaging().onMessage((message) => {
        console.log(JSON.stringify(message));
      });

    } catch (e) {
      console.error(e)
    }

  }

  useEffect(() => {
    register()
    messageListener()
  }, [])

  return (
    <>
      {
        user ?
          <Navigation />
          :
          <UserAuth />
      }
    </>
  );
}


export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

/*
global.socket = io("http://192.168.1.101:3000");
    socket.on('connect', function () {
      console.log('Socket connected!');
    });

socket.on('chat message', function (msg) {
  this.setState({
    message: this.state.message + '\n' + msg
  })
}.bind(this))

var messageSend = () => {
  socket.emit('chat message', this.state.text)
  this.setState({
    text: ''
  })
} */