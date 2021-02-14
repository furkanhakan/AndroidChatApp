import React from 'react';
import { Text, View } from 'react-native';
import styles from './style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const ChatMessage = (props) => {
    const { message } = props;
    let date = new Date(message._data.time.seconds * 1000)
    const check = message._data.seen != true ? 'check' : 'check-all'
    const isMyMessage = () => {
        return message._data.me === false;
    }

    return (
        <View style={styles.container}>
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
        </View>
    )
}

export default ChatMessage;