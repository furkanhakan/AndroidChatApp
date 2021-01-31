import React, { useState } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

const UserAuth = ({ navigation }) => {
    const [error, setError] = useState()
    const [isLogin, setIslogin] = useState(1)
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

    function signUp() {
        auth().createUserWithEmailAndPassword(email, password).then((user) => {
            database()
                .ref('/users/' + user.user.uid)
                .set({
                    id: user.user.uid,
                    email: user.user.email,
                })
        }).catch((err) => {
            console.log(err.code)

        })
    }
    // furkan_hkn@hotmail.com
    return (
        <ScrollView>
            <View style={styles.body}>
                {
                    isLogin ?
                        <View>
                            <Text style={styles.text}>
                                Giriş Yap
                            </Text>
                            <TextInput
                                placeholder='Email'
                                borderColor='red'
                                style={styles.input}
                                onChangeText={(text) => setEmail(text)}
                            />
                            <TextInput
                                secureTextEntry={true}
                                placeholder='Password'
                                style={styles.input}
                                onChangeText={(text) => setPassword(text)}
                            />
                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={login}>
                                <Text style={styles.submitButtonText}> Giriş Yap </Text>
                            </TouchableOpacity>
                            <Text style={styles.link}
                                onPress={() => { setIslogin(0); setError() }}>
                                Kayıt ol
                            </Text>
                            {
                                error ?
                                    <Text style={styles.errorText}> {error} </Text>
                                    :
                                    null
                            }
                        </View>
                        :
                        <View>
                            <Text style={styles.text}>
                                Kayıt ol
                            </Text>
                            <TextInput
                                placeholder='Email'
                                borderColor='red'
                                style={styles.input}
                                onChangeText={(text) => setEmail(text)}
                            />
                            <TextInput
                                placeholder='Password'
                                secureTextEntry={true}
                                style={styles.input}
                                onChangeText={(text) => setPassword(text)}
                            />
                            <TextInput
                                placeholder='Password Again'
                                secureTextEntry={true}
                                style={styles.input}
                                onChangeText={(text) => setPasswordAgain(text)}
                            />
                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={signUp}>
                                <Text style={styles.submitButtonText}> Kayıt Ol </Text>
                            </TouchableOpacity>
                            <Text style={styles.link}
                                onPress={() => { setIslogin(1); setError() }}>
                                Giriş Yap
                            </Text>
                            {
                                error ?
                                    <Text style={styles.errorText}> {error} </Text>
                                    :
                                    null
                            }
                        </View>
                }
            </View>
        </ScrollView>
    )
}

export default UserAuth;

const styles = StyleSheet.create({
    link: {
        textAlign: 'center',
        textDecorationLine: 'underline'
    },
    text: {
        textAlign: 'center',
        fontSize: 20
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText: {
        color: 'white'
    },
    errorText: {
        textAlign: 'center',
        color: 'red'
    }
});