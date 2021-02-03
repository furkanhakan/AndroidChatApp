import React from 'react'
import { SafeAreaView, View } from 'react-native';
import database from '@react-native-firebase/database'
import { AuthContext } from '../context/FirebaseContext';
import UserList from '../components/UserList/UserList';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { theme } from './themeConstants';



function AllUserList({ navigation }) {
    const [users, setUsers] = React.useState([])
    const { user } = React.useContext(AuthContext)

    React.useEffect(() => {
        const userRef = database().ref('/users')
        const OnLoadingListener = userRef.on('value', snapshot => {
            setUsers([]);
            snapshot.forEach(children => {
                if (user.uid != children.val().id)
                    setUsers(users => [...users, children.val()])
            })
        });

        return () => {
            userRef.off('value', OnLoadingListener)
        }
    }, [])

    return (
        <View style={{height:'100%'}}>
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
        </View>
    )
}

export default AllUserList;