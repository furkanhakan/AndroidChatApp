import React, { useContext, useState } from 'react';
import {
    ImageBackground,
    View,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    FlatList, useColorScheme,
    Image
} from 'react-native';
import styles from "./ChatScreenStyle";
import { AuthContext } from "../context/FirebaseContext";
import BG from '../../assets/images/ChatBG.png';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ChatMessage from "../components/ChatMessage";
import Colors from '../constant/Colors';
import firestore from '@react-native-firebase/firestore'
import sendMessage from '../service/sendMessage'
import { Icon, Text } from 'react-native-elements'

const Chat = ({ route, navigation }) => {
    const { id, email, avatar, userName } = route.params
    const { user } = useContext(AuthContext);
    const [message, setMessage] = useState()
    const [messages, setMessages] = React.useState([])

    const sendMessageHandle = async () => {
        if (message) {
            if (message.trim()) {
                sendMessage(user.uid, id, message)
                setMessage('')
            }
        }
    }

    React.useEffect(() => {

        const getUser = firestore()
            .collection('users')
            .doc(id)
            .onSnapshot((collection) => {
                let lastSeen;
                if (!collection.data().status) {
                    let time = new Date(collection.data().lastSeen.seconds * 1000)
                    let now = new Date()
                    let day = null
                    if (now.getDate() === time.getDate()) {
                        day = 'bugün'
                    } else if (now.getDate() - 1 === time.getDate()) {
                        day = 'dün'
                    }
                    if (day) {
                        lastSeen = `Son görülme ${day} ${time.getHours()}:${time.getMinutes()}`;
                    } else {
                        lastSeen = `Son görülme ${time.getDay()}.${time.getMonth()}.${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
                    }
                } else {
                    lastSeen = 'Çevrimiçi'
                }

                navigation.setOptions({
                    headerLeft: () => (
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => { navigation.goBack() }}>
                                <Icon name='arrow-back' size={26} color="#000" style={{ paddingLeft: 15 }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('profile', {
                                    id: id
                                })
                            }} style={{ flexDirection: 'row', width: '100%', height: '100%', zIndex: 1 }}>
                                <View style={{ justifyContent: 'center' }}>
                                    <Image source={{ uri: avatar }} style={{ width: 35, height: 35, borderRadius: 50, marginLeft: 20, }} />
                                </View>
                                <View style={{ paddingLeft: 15, justifyContent: 'center', flexDirection: 'column' }}>
                                    <Text>{userName}</Text>
                                    <Text style={{ fontSize: 10 }}>{lastSeen}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                })
            })

        const subscriber = firestore()
            .collection(`users/${user.uid}/contacts/${id}/messages`)
            .orderBy('time', 'desc')
            .onSnapshot(documentSnapshot => {
                setMessages(documentSnapshot.docs)
            });

        const seen = firestore()
            .collection(`users/${id}/contacts/${user.uid}/messages`)
            .where('seen', '==', false)
            .onSnapshot(documentSnapshot => {
                documentSnapshot.docs.forEach((doc) => {
                    doc.ref.update({
                        seen: true
                    })
                })
            })

        const seenProfile = () => firestore()
            .collection(`users/${id}/contacts`)
            .doc(user.uid)
            .get()
            .then(documentSnapshot => {
                documentSnapshot.ref.update({
                    seen: true
                })
            })
        seenProfile()

        // Stop listening for updates when no longer required
        return () => {
            subscriber()
            seen()
            getUser()
        };
    }, []);

    return (
        <ImageBackground style={{ width: '100%', height: '100%' }} source={BG}>
            <FlatList
                data={messages}
                renderItem={({ item }) => <ChatMessage message={item} />}
                inverted
                keyExtractor={(item) => item.id}
            />

            <KeyboardAvoidingView
                behavior={"height"}
                keyboardVerticalOffset={100}
                style={{ width: '100%' }}>
                <View style={styles.container}>
                    <View style={styles.mainContainer}>
                        <FontAwesome5 name="laugh-beam" size={24} color="grey" style={{ padding: 10 }} />
                        <TextInput
                            placeholder={"Type a message"}
                            style={styles.textInput}
                            multiline
                            value={message}
                            onChangeText={setMessage}
                        />
                        <Entypo name="attachment" size={24} color="grey" style={styles.icon} />
                        {!message && <Fontisto name="camera" size={24} color="grey" style={styles.icon} />}
                    </View>
                    <TouchableOpacity>
                        <View style={[styles.buttonContainer, { backgroundColor: Colors[useColorScheme()].background }]}>
                            {!message
                                ? <MaterialCommunityIcons name="microphone" size={28} color={Colors[useColorScheme()].tint} />
                                : <MaterialIcons name="send" size={28} color={Colors[useColorScheme()].tint} onPress={sendMessageHandle} />}
                        </View>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    )

}

export default Chat;
