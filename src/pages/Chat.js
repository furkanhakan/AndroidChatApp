import React, { useContext, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Alert, Image, TouchableOpacity, FlatList } from 'react-native';
import styles from "./ChatScreenStyle";
import { AuthContext } from "../context/FirebaseContext";
import database from '@react-native-firebase/database'
import { ListItem } from 'react-native-elements';
import { theme } from './themeConstants';
import { Icon } from 'react-native-elements'


const Chat = ({ route, navigation }) => {
    const { id } = route.params
    const { user } = useContext(AuthContext);
    const [tableId, setTableId] = useState(user.uid < id ? user.uid + id : id + user.uid)

    const [message, setMessage] = useState()

    const [messages, setMessages] = React.useState([])

    React.useEffect(() => {
        const userRef = database().ref('/messages/' + tableId)
        const OnLoadingListener = userRef.on('value', snapshot => {
            setMessages([]);
            snapshot.forEach(children => {
                if (children.val() != null)
                    setMessages(messages => [...messages, children.val()])
            })
        });

        return () => {
            userRef.off('value', OnLoadingListener)
        }
    }, [])

    const sendMessage = () => {
        if (message != '' || message != null) {
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

    const userSelections = (item) => {
        if (item.from != user.uid) {
            return (
                <View style={{ marginTop: 30 }}>
                    <View style={styles.friendBlock}>
                        <View style={styles.agentMsgBlock}>
                            <Text style={styles.agentMsgText}>{item.msg}</Text>
                            <View style={styles.friendTimeBlock}>
                                <Text style={styles.timestampText}>{item.date}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={{ marginTop: 30 }}>
                    <View style={styles.userBlock}>
                        <View style={styles.userMsgBlock}>
                            <Text style={styles.userMsgText}>{item.msg}</Text>
                            <View style={styles.userTimeBlock}>
                                <Text style={styles.timestampText}>{item.date}</Text>
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
                <View>
                    {
                        <FlatList
                            data={messages}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            
                            renderItem={({ item }) => userSelections(item)}
                            keyExtractor={item => item.id}
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
