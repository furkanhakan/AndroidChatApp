import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback
} from "react-native";
import styles from "./style";
import { useNavigation } from '@react-navigation/native';
import lastSeen from '../../service/lastSeen'

const ContactListItem = (props) => {
    const navigation = useNavigation();
    const { user } = props

    const onClick = () => {
        navigation.navigate('chat', {
            id: user.id,
            email: user.email,
            avatar: user.avatar,
            userName: user.name
        })
    }

    return (
        <TouchableWithoutFeedback onPress={onClick}>
            <View style={styles.container}>
                <View style={styles.lefContainer}>
                    <Image source={{ uri: user.avatar }} style={styles.avatar} />

                    <View style={styles.midContainer}>
                        <Text style={styles.username}>{user.name}</Text>
                        <Text numberOfLines={2} style={styles.status}>{lastSeen(user.status, user.lastSeen.seconds)}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ContactListItem;