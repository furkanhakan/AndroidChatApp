import React, { useState } from 'react';
import auth from '@react-native-firebase/auth'
import styles from "./UserAuthStyle";
import { Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import database from '@react-native-firebase/database'



const Signup = ({ navigation }) => {
    const [error, setError] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordAgain, setPasswordAgain] = useState()

    function signUp() {
        auth().createUserWithEmailAndPassword(email, password).then((user) => {
            database()
                .ref('/users/' + user.user.uid)
                .set({
                    id: user.user.uid,
                    email: user.user.email,
                    avatar: 'https://firebasestorage.googleapis.com/v0/b/wemeet-a0aa8.appspot.com/o/user.png?alt=media&token=67a9d397-4574-466f-8c3c-af0337074226'
                })
        }).catch((err) => {
            console.log(err.code)

        })
    }
    return (
        <KeyboardAvoidingView style={styles.containerView} behavior="padding">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.loginScreenContainer}>
                    <View style={styles.loginFormView}>
                        <Text style={styles.logoText}>WeMeet</Text>
                        <TextInput onChangeText={(text) => setEmail(text)} placeholder="Email" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
                        <TextInput onChangeText={(text) => setPassword(text)} placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                        <TextInput onChangeText={(text) => setPasswordAgain(text)} placeholder="Password again" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                        <Button
                            buttonStyle={styles.loginButton}
                            onPress={signUp}
                            title="Sign up"
                        />
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