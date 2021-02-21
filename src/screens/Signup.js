import React, { useState } from 'react';
import auth from '@react-native-firebase/auth'
import styles from "./UserAuthStyle";
import { Keyboard, Text, View, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore'

const Signup = ({ navigation }) => {
    const [error, setError] = useState()
    const [email, setEmail] = useState()
    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const [passwordAgain, setPasswordAgain] = useState()
    const defaultAvatar = 'https://firebasestorage.googleapis.com/v0/b/wemeet-a0aa8.appspot.com/o/user.png?alt=media&token=67a9d397-4574-466f-8c3c-af0337074226'

    function signUp() {
        if (email && password && passwordAgain) {
            if (password === passwordAgain) {
                auth().createUserWithEmailAndPassword(email, password).then(async (user) => {
                    await firestore()
                        .collection('users')
                        .doc(user.user.uid)
                        .set({
                            id: user.user.uid,
                            avatar: defaultAvatar,
                            email: email,
                            name: name,
                            status: true,
                            lastSeen: new Date()
                        })
                    user.user.updateProfile({
                        displayName: name,
                        photoURL: defaultAvatar
                    })
                }).catch((err) => {
                    console.log(err.code)
                    switch (err.code) {
                        case 'auth/email-already-in-use': setError('Bu email adresi kullanımda.'); break;
                        case 'auth/invalid-email': setError('Lütfen geçerli bir email adresi giriniz.'); break;
                        case 'auth/weak-password': setError('Daha güçlü bir parola deneyin.'); break;
                        default: setError('Bir hata oluştu. Lütfen daha sonra deneyin.'); break;
                    }
                })
            } else {
                setError('Parolalar eşleşmiyor. Tekrar kontrol edin.')
            }
        } else {
            setError('Lütfen tüm alanları doldurunuz.')
        }
    }
    return (
        <KeyboardAvoidingView style={styles.containerView} behavior={"height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.loginScreenContainer}>
                    <View style={styles.loginFormView}>
                        <Text style={styles.logoText}>WeMeet</Text>
                        <TextInput onChangeText={(text) => setName(text)} placeholder="Name" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
                        <TextInput onChangeText={(text) => setEmail(text)} placeholder="Email" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
                        <TextInput onChangeText={(text) => setPassword(text)} placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                        <TextInput onChangeText={(text) => setPasswordAgain(text)} placeholder="Password again" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                        <Button
                            buttonStyle={styles.loginButton}
                            onPress={signUp}
                            title="Sign up"
                        />
                        {
                            error ?
                                <Text style={{ color: 'red', alignSelf: 'center' }}>
                                    {error}
                                </Text>
                                :
                                null
                        }
                        <Button
                            buttonStyle={styles.changeScreenButton}
                            onPress={() => navigation.navigate('Login')}
                            title="Hesabın zaten var mı? Giriş Yap."
                            titleStyle={{ color: '#3897f1' }}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default Signup;