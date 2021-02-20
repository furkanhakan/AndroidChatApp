import React, { useState } from 'react'
import { Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements'
import lastSeen from '../service/lastSeen'

const Profile = ({ route }) => {
    const userId = route.params.id
    const [user, setUser] = useState()
    const navigation = useNavigation();

    React.useEffect(() => {
        const getUser = firestore()
            .collection('users')
            .doc(userId)
            .onSnapshot((collection) => {
                setUser(collection.data())
                let message = lastSeen(collection.data().status, collection.data().lastSeen.seconds);

                navigation.setOptions({
                    headerLeft: () => (
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => { navigation.goBack() }}>
                                <Icon name='arrow-back' size={26} color="#000" style={{ paddingLeft: 15 }} />
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'column', paddingLeft: 30 }}>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text>{collection.data().name}</Text>
                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 11, color: 'grey' }}>
                                        {message}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )
                })
            })

        return () => getUser()
    }, [])

    if (user) {
        return (
            <ScrollView style={{ flex: 1, marginTop: 20 }}>
                <View style={{ width: '100%', height: Dimensions.get('window').height * 0.4 }}>
                    <Image resizeMode='contain' source={{ uri: user.avatar }} style={{ width: '100%', height: '100%' }} />
                </View>

                <View style={{ width: '100%', backgroundColor: 'white', padding: 10, marginTop: 20 }}>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'grey', padding: 10 }}>
                        <Text style={{ fontSize: 16 }}>{user.email}</Text>
                        <Text style={{ fontStyle: 'italic', fontSize: 12 }}>Email</Text>
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: 16 }}>{user.name}</Text>
                        <Text style={{ fontStyle: 'italic', fontSize: 12 }}>Adı</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
    return null;

}

export default Profile;