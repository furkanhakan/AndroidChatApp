/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useContext } from "react";
import Navigation from './navigation/index'
import UserAuth from './screens/UserAuth';
import { AuthProvider } from "./context/FirebaseContext";
import { AuthContext } from "./context/FirebaseContext";
import VerifyPhoneNumber from './screens/VerifyPhoneNumber'

function App() {
  const { user } = useContext(AuthContext);

  if (user) {
    if (user.phoneNumber) {
      return (
        <Navigation />
      )
    }
    return (
      <VerifyPhoneNumber />
    )
  } else {
    return (
      <UserAuth />
    )
  }
}


export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};