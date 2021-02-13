import React from 'react';
import { Text, View } from 'react-native';
import styles from './style';

const ChatMessage = (props) => {
    const { message } = props;
    let date = new Date(message._data.time.seconds * 1000)
    const isMyMessage = () => {
        return message._data.me === false;
    }

    return (
        <View style={styles.container}>
            <View style={[
                styles.messageBox, {
                    backgroundColor: isMyMessage() ? '#DCF8C5' : 'white',
                    alignSelf: isMyMessage() ? 'flex-start' : 'flex-end',
                }
            ]}>
                <Text>{message._data.message}</Text>
                <Text style={styles.time}>{date.getHours()}:{date.getMinutes()}</Text>
            </View>
        </View>
    )
}

export default ChatMessage;