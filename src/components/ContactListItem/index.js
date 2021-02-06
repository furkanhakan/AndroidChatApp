import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback
} from "react-native";
import styles from "./style";
import { useNavigation } from '@react-navigation/native';
const defaultAvatar = 'https://firebasestorage.googleapis.com/v0/b/wemeet-a0aa8.appspot.com/o/user.png?alt=media&token=67a9d397-4574-466f-8c3c-af0337074226';

const ContactListItem = (props) => {
    const navigation = useNavigation();
    const {id, name, avatar, phoneNumber} = props

    const onClick = () => {
        navigation.navigate('chat', {
            id: id,
            email: email,
            avatar: avatar,
            userName: userName
        })
    }
    return (
        <TouchableWithoutFeedback onPress={onClick}>
            <View style={styles.container}>
                <View style={styles.lefContainer}>
                    <Image source={{ uri: defaultAvatar }} style={styles.avatar} />

                    <View style={styles.midContainer}>
                        <Text style={styles.username}>{name}</Text>
                        <Text numberOfLines={2} style={styles.status}>{phoneNumber}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ContactListItem;