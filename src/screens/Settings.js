import React from 'react'
import { View, useColorScheme, TouchableWithoutFeedback } from 'react-native'
import { Button, Image, Input, Text } from 'react-native-elements'
import { AuthContext } from '../context/FirebaseContext'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../constant/Colors'
import { launchImageLibrary } from 'react-native-image-picker'
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'


export default function Settings({navigation}) {
    const { user } = React.useContext(AuthContext);
    const [image, setImage] = React.useState(user.photoURL);
    const [nameInputBorderWidth, setNameInputBorderWidth] = React.useState(0)
    const [name, setName] = React.useState(user.displayName)

    const uploadImage = async () => {
        const options = {};
        await launchImageLibrary(options, response => {
            setImage(response.uri);
        })
    }

    const saveProfile = async () => {
        const ref = storage().ref(user.uid + '/profile');
        await ref.putFile(image)
        const url = await ref.getDownloadURL()
        await auth().currentUser.updateProfile({
            displayName: name,
            photoURL: url
        })
        await database().ref('users/' + user.uid).update({
            avatar: url
        })
        navigation.navigate('chatUserList')
    }

    return (
        <View style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={uploadImage}>
                <View style={{ marginTop: 20, alignItems: 'center', }}>
                    <Image source={{ uri: image }} style={{ width: 100, height: 100, resizeMode: 'cover', borderRadius: 50 }}>
                        <View style={{
                            width: 35,
                            height: 35,
                            borderRadius: 50,
                            borderWidth: 1,
                            borderColor: Colors[useColorScheme()].background,
                            backgroundColor: Colors[useColorScheme()].background,
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            bottom: 0,
                            right: 0
                        }}>
                            <Icon name='camera-outline' size={24} color='black'></Icon>
                        </View>
                    </Image>
                </View>
            </TouchableWithoutFeedback>
            <View style={{
                alignSelf: 'center',
                marginTop: 10
            }}>
                <Text>{name}</Text>
            </View>
            <Input
                placeholder='Ad (gerekli)'
                inputContainerStyle={{
                    borderBottomColor: Colors[useColorScheme()].buttonColor,
                    borderBottomWidth: nameInputBorderWidth
                }}
                style={{ fontSize: 16, borderBottomColor: 'red' }}
                onFocus={() => { setNameInputBorderWidth(1) }}
                onBlur={() => { setNameInputBorderWidth(0) }}
                value={name}
                onChangeText={(text) => { setName(text) }}
            />
            <View>
                <Button
                    title='Kaydet'
                    onPress={saveProfile}
                    disabled={name ? false : true}
                />
            </View>
        </View>
    )
}
