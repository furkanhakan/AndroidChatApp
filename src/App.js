/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useContext } from "react";
import Home from './pages/Home';
import UserAuth from './pages/UserAuth';
import { AuthProvider } from "./context/FirebaseContext";
import { AuthContext } from "./context/FirebaseContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      {
        user ?
          <Home />
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