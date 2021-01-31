import React from 'react'
import { View, Text } from 'react-native';
import database from '@react-native-firebase/database'
import { ListItem, Avatar } from 'react-native-elements';


function AllUserList() {
    const [users, setUsers] = React.useState([])

    React.useEffect(() => {
        const userRef = database().ref('/users')
        const OnLoadingListener = userRef.on('value', snapshot => {
            setUsers([]);
            snapshot.forEach(children => {
                setUsers(users => [...users, children.val()])
            })
        });

        return () => {
            userRef.off('value', OnLoadingListener)
        }
    }, [])


    return (
        <View>
            <Text>
                <View>
                    {
                        users.map((item, index) => (
                            <ListItem key={item.id} bottomDivider>
                                <Avatar source={{ uri: item.avatar }} />
                                <ListItem.Content>
                                    <ListItem.Title>{item.email}</ListItem.Title>
                                    <ListItem.Subtitle>{item.id}</ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                        ))
                    }
                </View>
            </Text>
        </View>
    )
}

export default AllUserList;