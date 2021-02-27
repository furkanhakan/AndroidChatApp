import React from 'react'
import { View, useColorScheme } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../context/FirebaseContext';
import UserList from '../components/UserListItem';
import { FlatList } from 'react-native-gesture-handler';
import Colors from '../constant/Colors'
import Icon from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from 'react-native';

function ChatUserList({ navigation }) {
    const color = Colors[useColorScheme()]
    const [users, setUsers] = React.useState([])
    const { user } = React.useContext(AuthContext)

    React.useEffect(() => {
        const subscriber = firestore()
            .collection(`users/${user.uid}/contacts`)
            .onSnapshot(documentSnapshot => {
                let userList = [];
                documentSnapshot.docs.forEach(async (value) => {
                    let user = await firestore().collection(`users`)
                        .doc(value.id)
                        .get()

                    userList = [
                        ...userList,
                        {
                            id: value.id,
                            email: user.data().email,
                            avatar: user.data().avatar,
                            userName: user.data().name,
                            lastMessage: value.data().message,
                            time: value.data().time,
                            me: value.data().me,
                            seen: value.data().seen,
                            token: user.data().token
                        }
                    ]
                    setUsers(userList)
                })
            });

        return () => subscriber();
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView>
                {
                    <FlatList
                        style={{ width: '100%' }}
                        data={users}
                        renderItem={({ item }) => <UserList user={item} />}
                        keyExtractor={item => item.id}
                    />
                }
            </SafeAreaView>
            <View style={{
                width: 60,
                borderRadius: 50,
                height: 60,
                backgroundColor: color.buttonColor,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: 15,
                right: 15
            }}>
                <Icon onPress={() => navigation.navigate('contacts')} name="pencil" size={20} color='white'></Icon>
            </View>
        </View>
    )
}

export default ChatUserList;