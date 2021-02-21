import React from 'react'
import { View, FlatList } from 'react-native';
import ContactListItem from '../components/ContactListItem';
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from "../context/FirebaseContext";
import HeaderClassicSearchBar from "../components/HeaderClassicSearchBar/HeaderClassicSearchBar";

function ContactList() {
    const { user } = React.useContext(AuthContext);
    const usersRef = firestore().collection('users');
    const [searchText, setSearchText] = React.useState()
    const [users, setUsers] = React.useState(() => {
        usersRef
            .where('id', '!=', user.uid)
            .limit(20)
            .get()
            .then((value) => {
                value.forEach((queryDocumentSnapshot) => {
                    setUsers((users = []) => [...users, queryDocumentSnapshot.data()])
                })
            })
    })

    const searhUser = () => {
        if (searchText) {
            setUsers([])
            usersRef
                .where('name', '>=', searchText)
                .limit(20)
                .get()
                .then((value) => {
                    value.forEach((queryDocumentSnapshot) => {
                        if (queryDocumentSnapshot.data().id != user.uid)
                            setUsers((users = []) => [...users, queryDocumentSnapshot.data()])
                    })
                })
        }
    }


    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <HeaderClassicSearchBar onChangeText={text => setSearchText(text)} onPress={searhUser} />
            <FlatList
                style={{ width: '100%' }}
                data={users}
                renderItem={({ item }) => <ContactListItem
                    user={item}
                />}
                keyExtractor={(item) => item.id}
            />

        </View>

    )
}
export default ContactList;