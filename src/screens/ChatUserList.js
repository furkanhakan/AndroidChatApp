import React from 'react'
import { View, useColorScheme, PermissionsAndroid, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../context/FirebaseContext';
import UserList from '../components/UserListItem';
import { FlatList } from 'react-native-gesture-handler';
import Colors from '../constant/Colors'
import Icon from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from 'react-native';

const permission = async () => {
    try {
        const permissionStatus = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
            title: 'Rehbere Erişim',
            message: 'Kişierinizi görebilmek için rehberinize erişebilmemiz gerekiyor.',
            buttonPositive: 'Tamam'
        })

        if (permissionStatus == PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
}

function ChatUserList({ navigation }) {
    const color = Colors[useColorScheme()]
    const [users, setUsers] = React.useState([])
    const [test, settest] = React.useState([])
    const { user } = React.useContext(AuthContext)

    React.useEffect(() => {
        const subscriber = firestore()
            .collection(`users/${user.uid}/contacts`)
            .onSnapshot(documentSnapshot => {
                let userList = [];
                documentSnapshot.docs.forEach(async (value) => {
                    let userId = value._ref._documentPath._parts[3];
                    let user = await firestore().collection(`users`)
                        .doc(userId)
                        .get()

                    userList = [
                        ...userList,
                        {
                            id: userId,
                            email: user._data.email,
                            avatar: user._data.avatar,
                            userName: user._data.name,
                            lastMessage: value._data.message,
                            time: value._data.time,
                            me: value._data.me,
                            seen: value._data.seen
                        }
                    ]
                    setUsers(userList)
                })
            });

        return () => subscriber();
    }, [])


    const contactRoute = async () => {
        permission().then(isSuccess => {
            if (isSuccess) {
                navigation.navigate('contacts')
            } else {
                Alert.alert('Erişim hatası!', 'Uygulamanın rehbere erişimi bulunmuyor!', [
                    { text: 'Tamam' }
                ])
            }
        })
    }

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
                <Icon onPress={contactRoute} name="pencil" size={20} color='white'></Icon>
            </View>
        </View>
    )
}

export default ChatUserList;

/*


{
                <FlatList
                    style={{ width: '100%' }}
                    data={users}
                    renderItem={({ item }) => <UserList
                        id={item.id}
                        email={item.email}
                        avatar={item.avatar}
                        userName={item.userName}
                        lastMessage='Son mesaj burada gösterilir!'
                    />}
                    keyExtractor={item => item.id}
                />
            }
*/