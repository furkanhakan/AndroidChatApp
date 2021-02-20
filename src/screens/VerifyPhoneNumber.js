import React, { useState, useRef } from 'react';
import { Keyboard, Text, View, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from "./UserAuthStyle";
import PhoneInput from "react-native-phone-number-input";
import firestore from '@react-native-firebase/firestore'

export default function PhoneVerification() {
    auth().settings.appVerificationDisabledForTesting = true;

    const [confirm, setConfirm] = useState(null);

    const [code, setCode] = useState('');
    const [phone, setPhone] = useState();
    const [formattedPhone, setFormattedPhone] = useState();
    const phoneInput = useRef(null);
    const [error, setError] = useState();

    async function verifyPhoneNumber() {
        setError('')
        console.log(phoneInput.current.isValidNumber(phone))
        console.log(formattedPhone)
        if (phoneInput.current.isValidNumber(phone)) {
            try {
                const confirmation = await auth().verifyPhoneNumber(formattedPhone);
                setConfirm(confirmation);
            } catch (e) {
                console.error(e)
            }
        } else {
            setError('Girdiğin telefon numarası yanlış.')
        }
    }

    async function confirmCode() {
        try {
            const credential = auth.PhoneAuthProvider.credential(
                confirm.verificationId,
                code,
            );
            await auth().currentUser.linkWithCredential(credential);
            await firestore().collection('users').doc(auth().currentUser.uid).update({
                phoneNumber: formattedPhone
            })
        } catch (error) {
            if (error.code == 'auth/invalid-verification-code') {
                setError('Kod yanlış.')
            }
        }
    }

    return (
        <KeyboardAvoidingView style={styles.containerView} behavior={"height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.loginScreenContainer}>
                    <View style={styles.loginFormView}>
                        <Text style={styles.logoText}>WeMeet</Text>
                        {
                            !confirm ?
                                <>
                                    <PhoneInput
                                        ref={phoneInput}
                                        defaultCode="TR"
                                        layout="first"
                                        onChangeText={(text) => {
                                            setPhone(text);
                                        }}
                                        onChangeFormattedText={(text) => {
                                            setFormattedPhone(text);
                                        }}
                                        withDarkTheme
                                        autoFocus
                                    />
                                    <Button
                                        buttonStyle={styles.loginButton}
                                        title="İleri"
                                        onPress={() =>
                                            verifyPhoneNumber()
                                        }
                                    />
                                </> :
                                <>
                                    <TextInput style={styles.loginFormTextInput} value={code} onChangeText={text => setCode(text)} />
                                    <Button
                                        buttonStyle={styles.loginButton}
                                        title="Onayla"
                                        onPress={() =>
                                            confirmCode()
                                        }
                                    />
                                </>
                        }
                        {
                            error ?
                                <Text style={{ alignSelf: 'center', color: 'red' }}>
                                    {error}
                                </Text>
                                : null
                        }
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}