import * as React from 'react';
import { View, useColorScheme, Image, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Chat from '../screens/Chat';
import Colors from '../constant/Colors'
import ChatUserList from '../screens/ChatUserList'
import Contacts from '../screens/Contacts'
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Settings from '../screens/Settings';
import { AuthContext } from '../context/FirebaseContext';
import { Icon, Text } from 'react-native-elements'

const Stack = createStackNavigator();

export default function App() {
    const { user } = React.useContext(AuthContext)

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: Colors[useColorScheme()].background
                },
                headerTintColor: Colors[useColorScheme()].tint
            }}>
                <Stack.Screen name="chatUserList" component={ChatUserList} options={({ navigation }) => ({
                    title: 'WeChat',
                    headerRight: () => (
                        <View style={{
                            flexDirection: 'row',
                            width: 60,
                            justifyContent: 'space-between',
                            marginRight: 10
                        }}>
                            <Octicons name='search' size={22}></Octicons>
                            <TouchableOpacity onPress={() => { navigation.navigate('settings') }}>
                                <MaterialCommunityIcons name='dots-vertical' size={22}  ></MaterialCommunityIcons>
                            </TouchableOpacity>
                        </View>
                    ),
                    headerLeft: () => (
                        <View>
                            <Image source={{ uri: user.photoURL }} style={{ width: 35, height: 35, resizeMode: 'cover', borderRadius: 50, marginLeft: 20 }} />
                        </View>
                    )
                })} />
                <Stack.Screen name="chat" component={Chat} options={({ navigation, route }) => ({
                    headerTitle: '',
                    headerLeft: () => (
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => { navigation.goBack() }}>
                                <Icon name='arrow-back' size={26} color="#000" style={{ paddingLeft: 15 }} />
                            </TouchableOpacity>
                            <View style={{ justifyContent: 'center' }}>
                                <Image source={{ uri: route.params.avatar }} style={{ width: 35, height: 35, borderRadius: 50, marginLeft: 20, }} />
                            </View>
                            <View style={{ paddingLeft: 15, justifyContent: 'center' }}>
                                <Text>{route.params.userName}</Text>
                            </View>
                        </View>
                    ),
                    headerRight: () => (
                        <View style={{
                            width: 25,
                            marginRight: 10
                        }}>
                            <MaterialCommunityIcons name='dots-vertical' size={22} onPress={() => { navigation.navigate('settings') }} ></MaterialCommunityIcons>
                        </View>
                    )
                })} />
                <Stack.Screen name="contacts" component={Contacts} options={{
                    title: 'Kişiler'
                }} />
                <Stack.Screen name="settings" component={Settings} options={{
                    title: 'Ayarlar'
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
