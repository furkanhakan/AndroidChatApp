import React, { useState } from 'react';
import auth from '@react-native-firebase/auth'
import styles from "./UserAuthStyle";
import { Keyboard, Text, View, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';

const Login = ({ navigation }) => {
    const [error, setError] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    function login() {
        if(email && password) {
            auth().signInWithEmailAndPassword(email, password).then(() => {
            }).catch((err) => {
                switch (err.code) {
                    case 'auth/wrong-password': setError('Email adresiniz veya şifreniz yanlış.'); break;
                    case 'auth/invalid-email': setError('Lütfen geçerli bir email adresi giriniz.'); break;
                    case 'auth/ınvalıd-emaıl': setError('Lütfen geçerli bir email adresi giriniz.'); break;
                    case 'auth/user-not-found': setError('Böyle bir hesap kayıtlı değil.'); break;
                    default: setError('Bir hata oluştu. Lütfen daha sonra deneyin.'); break;
                }
            })
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
                        <TextInput onChangeText={(text) => setEmail(text)} placeholder="Email" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
                        <TextInput onChangeText={(text) => setPassword(text)} placeholder="Parola" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                        <Button
                            buttonStyle={styles.loginButton}
                            onPress={login}
                            title="Giriş yap"
                        />
                        {
                            error ?
                            <Text style={{color: 'red', alignSelf: 'center'}}>
                                {error}
                            </Text>
                            :
                            null
                        }
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