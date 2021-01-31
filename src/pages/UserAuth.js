import React from 'react';
import Login from './Login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './Signup';
const Stack = createStackNavigator();

const UserAuth = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} HeaderBackButton="null" />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default UserAuth;