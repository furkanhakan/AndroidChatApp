import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
} from "react-native";
import styles from "./style";
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const UserListItem = (props) => {
    const navigation = useNavigation();
    const { user } = props
    let date = new Date(user.time * 1000)
    const check = user.seen != true ? 'check' : 'check-all'

    const onClick = () => {
        navigation.navigate('chat', {
            id: user.id,
            email: user.email,
            avatar: user.avatar,
            userName: user.userName,
            token: user.token
        })
    }

    return (
        <TouchableWithoutFeedback onPress={onClick}>
            <View style={styles.container}>
                <View style={styles.lefContainer}>
                    <Image source={{ uri: user.avatar }} style={styles.avatar} />
                    <View style={styles.midContainer}>
                        <Text style={styles.username}>{user.userName}</Text>
                        <Text
                            numberOfLines={1}
                            style={styles.lastMessage}>
                            {user.lastMessage
                                ? `${user.lastMessage}`
                                : ""}
                        </Text>
                    </View>
                </View>
                <Text style={styles.time}>
                    {user.lastMessage && date.getHours()}:{date.getMinutes()}
                </Text>
                {
                    user.me ?
                        <Text style={{ position: 'absolute', bottom: 20, right: 10 }}>
                            <MaterialCommunityIcons name={check} size={18} color={user.seen ? '#0077b6' : 'grey'} />
                        </Text>
                        : null
                }
            </View>
        </TouchableWithoutFeedback>
    )
}

export default UserListItem;