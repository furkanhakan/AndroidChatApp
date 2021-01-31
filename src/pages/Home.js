import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllUserList from './AllUserList'
import { AuthContext } from './../context/FirebaseContext'
import { TouchableOpacity } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth'

function cikis() {
    auth().signOut()
}
function HomeScreen() {
    const { user } = React.useContext(AuthContext)
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{user.email}</Text>
            <TouchableOpacity>
                <Text>Çıkış Yap</Text>
            </TouchableOpacity>
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Tüm Kullanıclar" component={AllUserList} />
                <Tab.Screen name="Profilim" component={AllUserList} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
