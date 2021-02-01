import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, Alert, Image, TouchableOpacity, FlatList, Dimensions, Keyboard, KeyboardEvent } from 'react-native';
import styles from "./ChatScreenStyle";
import { AuthContext } from "../context/FirebaseContext";
import database from '@react-native-firebase/database'
import { ListItem } from 'react-native-elements';
import { theme } from './themeConstants';
import { Icon } from 'react-native-elements'


const Chat = ({ route, navigation }) => {
    const { id, email, avatar, userName } = route.params
    const { user } = useContext(AuthContext);
    const [tableId, setTableId] = useState(user.uid < id ? user.uid + id : id + user.uid)

    const [message, setMessage] = useState()
    const [isReady, setIsReady] = useState(false)

    const [messages, setMessages] = React.useState([])
    const [messageHeight, setMessageHeight] = useState('83%')

    let flatList;

    React.useEffect(() => {
        const userRef = database().ref('/messages/' + tableId)
        const OnLoadingListener = userRef.on('value', snapshot => {
            setMessages([]);
            snapshot.forEach(children => {
                if (children.val() != null)
                    setMessages(messages => [...messages, children.val()])
            })
        });

        Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
        Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);

        return () => {
            userRef.off('value', OnLoadingListener)
            Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
            Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
        }
    }, [])

    const sendMessage = () => {
        if (message) {
            if (message.trim()) {
                let key = database().ref().push().key
                database()
                    .ref('/messages/' + tableId + '/' + key)
                    .set({
                        from: user.uid,
                        to: id,
                        msg: message,
                        date: new Date().getTime()
                    })
                setMessage('')
            }

        }
    }

    // Klavye konumuna göre sohbet ekranı
    const onKeyboardDidShow = (e) => {
        setMessageHeight('73%')
    }
    const onKeyboardDidHide = (e) => {
        setMessageHeight('83%')
    }

    const userSelections = (item) => {
        var date = new Date(item.date);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        if (item.from != user.uid) {
            return (
                <View style={{ marginTop: 30 }} key={item}>
                    <View style={styles.friendBlock}>
                        <View style={styles.agentMsgBlock}>
                            <Text style={styles.agentMsgText}>{item.msg}</Text>
                            <View style={styles.friendTimeBlock}>
                                <Text style={styles.timestampText}>{hours}.{minutes}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={{ marginTop: 30 }} key={item}>
                    <View style={styles.userBlock}>
                        <View style={styles.userMsgBlock}>
                            <Text style={styles.userMsgText}>{item.msg}</Text>
                            <View style={styles.userTimeBlock}>
                                <Text style={styles.timestampText}>{hours}.{minutes}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            );
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, backgroundColor: theme.chatBackground }}>
                <View style={styles.headerOuterBlock}>
                    <View style={styles.headerBlock}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackBlock}>
                            <View style={{ paddingLeft: 10 }}>
                                <Icon name='arrow-back' size={24} color="#fff" />
                            </View>
                        </TouchableOpacity>
                        <Image source={{ uri: avatar }} style={styles.imgUser} />
                        <View style={{ paddingLeft: 15 }}>
                            <Text style={styles.nameText}>{userName}</Text>
                            <Text style={styles.usernameText}>{email}</Text>
                        </View>
                        <View style={styles.menuIconBlock}>
                            <TouchableOpacity>
                                <Text style={styles.menuIcon}>...</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ marginBottom: 20, height: messageHeight }}>
                    {
                        <FlatList
                            data={messages}
                            renderItem={({ item }) => userSelections(item)}
                            keyExtractor={item => item.id}
                            ref={ref => flatList = ref}
                            onContentSizeChange={(contentWidth, contentHeight) => {
                                flatList.scrollToEnd({ animated: true });
                            }}
                        />

                    }
                </View>
                <View style={styles.footerBlockWrapper}>
                    <View style={styles.footerBlock}>
                        <View style={styles.searchInputBlockWrapper}>
                            <View style={styles.searchInputBlock}>
                                <TouchableOpacity style={{ width: '100%' }}>
                                    <TextInput
                                        placeholder="Message"
                                        value={message}
                                        onChangeText={(text) => setMessage(text)}
                                        style={styles.textStyle1}
                                        placeholderTextColor={'#C8C8C8'}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.footerIconsWrapper}>
                            <View style={styles.footerIconsBlock}>
                                <TouchableOpacity onPress={sendMessage} style={{ width: 30, paddingLeft: 5 }}>
                                    <Icon name='send' color={theme.primaryColor} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ paddingLeft: 10, width: 50 }}>
                                    <Icon name='attachment' color={theme.primaryColor} ></Icon>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )

}

export default Chat;
