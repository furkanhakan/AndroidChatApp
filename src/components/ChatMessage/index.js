import React, { useState, useContext } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import styles from './style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../../context/FirebaseContext'

const ChatMessage = (props) => {
    const { user } = useContext(AuthContext)
    const { message, userId } = props;
    let date = new Date(message._data.time.seconds * 1000)
    const check = message._data.seen != true ? 'check' : 'check-all'
    const isMyMessage = () => {
        return message._data.me === false;
    }

    const deleteAlert = (id, msg) => {
        Alert.alert(
            'Mesaj sil',
            `${msg} mesajını silmek istediğine emin misin?`,
            [
                {
                    text: "İptal",
                    style: "cancel"
                },
                {
                    text: "Sil",
                    onPress: () => {
                        firestore()
                            .collection(`users/${user.uid}/contacts/${userId}/messages`)
                            .doc(id)
                            .delete()
                    }
                }
            ]
        )

    }

    return (
        <TouchableOpacity style={styles.container} onLongPress={() => { deleteAlert(message.id, message._data.message) }}>
            <View style={[
                styles.messageBox, {
                    backgroundColor: isMyMessage() ? 'white' : '#DCF8C5',
                    alignSelf: isMyMessage() ? 'flex-start' : 'flex-end',
                }
            ]}>
                <Text>{message._data.message}</Text>
                <Text style={styles.time}>
                    {date.getHours()}:{date.getMinutes().toString().length == 1 ? '0' + date.getMinutes().toString() : date.getMinutes().toString()}
                    {
                        !isMyMessage() ?
                            <Text style={{ position: 'absolute', left: 10 }}>
                                <MaterialCommunityIcons name={check} size={14} color={message._data.seen ? '#0077b6' : 'grey'} />
                            </Text>
                            : null
                    }
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default ChatMessage;