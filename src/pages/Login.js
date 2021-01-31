import React, { useState } from 'react';
import auth from '@react-native-firebase/auth'
import styles from "./style";
import { Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';



const Login = ({ navigation }) => {
    const [error, setError] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    function login() {
        auth().signInWithEmailAndPassword(email, password).then(() => {
        }).catch((err) => {
            switch (err.code) {
                case 'auth/wrong-password': setError('Email adresiniz veya şifreniz yanlış.'); break;
                case 'auth/invalid-email': setError('Lütfen geçerli bir email adresi giriniz.'); break;
                case 'auth/user-not-found': setError('Böyle bir hesap kayıtlı değil.'); break;
                default: break;
            }
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
                        <Button
                            buttonStyle={styles.loginButton}
                            onPress={login}
                            title="Login"
                        />
                        <Button
                            buttonStyle={styles.changeScreenButton}
                            onPress={() => navigation.navigate('Signup')}
                            title="Hesabın yok mu? Kaydol."
                            titleStyle={{color:'#3897f1'}}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default Login;