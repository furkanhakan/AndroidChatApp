import React, { useContext, useState } from 'react';
import {
    ImageBackground,
    View,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    FlatList, useColorScheme
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

const Chat = ({ route, navigation }) => {
    const { id, email, avatar, userName } = route.params
    const { user } = useContext(AuthContext);
    const [message, setMessage] = useState()
    const [messages, setMessages] = React.useState([])

    const sendMessageHandle = () => {
        if (message) {
            if (message.trim()) {
                sendMessage(user.uid, id, message)
                setMessage('')
            }
        }
    }

    React.useEffect(() => {
        const collectionName = `users/${user.uid}/contacts/${id}/messages`;
        const subscriber = firestore()
            .collection(collectionName)
            .orderBy('time', 'desc')
            .onSnapshot(documentSnapshot => {
                setMessages(documentSnapshot.docs)
            });

        firestore()
            .collection(collectionName)
            .where('seen', '==', false)
            .get().then((response) => {
                let batch = firestore().batch()
                response.docs.forEach((doc) => {
                    const docRef = firestore().collection(collectionName).doc(doc.id)
                    batch.update(docRef, {
                        seen: true
                    })
                })
                batch.commit()
            })

        // Stop listening for updates when no longer required
        return () => subscriber();
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
