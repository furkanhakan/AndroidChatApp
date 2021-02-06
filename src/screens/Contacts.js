import React from 'react'
import { View, Text, PermissionsAndroid, FlatList } from 'react-native';
import Contacts from 'react-native-contacts'
import ContactListItem from '../components/ContactListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        AsyncStorage.setItem('contact', jsonValue)
    } catch (e) {
        console.error(e)
    }
}

const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('contact')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error(e)
    }
}

function ContactList() {
    const [users, setUsers] = React.useState(() => {
        getData().then(data => {
            if(data != null) {
                console.log('hayır bura')
                setUsers(data)
            } else {
                console.log('burası Çalıştı')
                Contacts.getAllWithoutPhotos().then(contacts => {
                    contacts.map((item, index) => {
                        if (item.phoneNumbers.length)
                            setUsers((users = []) => [...users, item])
                    })
                })
            }
        })
    })
    storeData(users)
    
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <FlatList
                style={{ width: '100%' }}
                data={users}
                renderItem={({ item }) => <ContactListItem
                    id={item.rawContactId}
                    name={item.displayName}
                    phoneNumber={item.phoneNumbers[0].number}
                />}
                keyExtractor={(item) => item.rawContactId}
            />
        </View>

    )
}
export default ContactList;