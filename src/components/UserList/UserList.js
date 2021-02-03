import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    StyleSheet
} from "react-native";
import styles from "./style";
import moment from 'moment'
import { useNavigation } from '@react-navigation/native';

const UserList = (props) => {
    const navigation = useNavigation();
    const {id, email, avatar, userName} = props

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
                    <Image source={{ uri: avatar }} style={styles.avatar} />
                    <View style={styles.midContainer}>
                        <Text style={styles.username}>{userName}</Text>
                        <Text
                            numberOfLines={1}
                            style={styles.lastMessage}>
                            {props.lastMessage
                                ? `${props.lastMessage}`
                                : ""}
                        </Text>
                    </View>

                </View>

                <Text style={styles.time}>
                    {props.lastMessage && moment(props.lastMessage.createdAt).format("DD/MM/YYYY")}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default UserList;