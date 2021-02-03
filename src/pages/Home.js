import * as React from 'react';
import { Text, View , TouchableWithoutFeedback} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllUserList from './AllUserList'
import { AuthContext } from './../context/FirebaseContext'
import { TouchableOpacity } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth'
import { createStackNavigator } from '@react-navigation/stack';
import Chat from './Chat';
import UserList from '../components/UserList/UserList';

function cikis() {
    auth().signOut()
}
function HomeScreen() {
    const { user } = React.useContext(AuthContext)
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{user.email}</Text>
            <TouchableWithoutFeedback onPress={cikis}>
                <Text>Çıkış Yap</Text>
            </TouchableWithoutFeedback>
        </View>
    );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function OtherNavigation() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Tüm Kullanıclar" component={AllUserList} />
        </Tab.Navigator>
    )
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="test" component={OtherNavigation} />
                <Stack.Screen name="chat" component={Chat} />
            </Stack.Navigator>

        </NavigationContainer>
    );
}
