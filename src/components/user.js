import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native';

class user extends Component {
    constructor(params) {
        super.props(params)
    }
    render() {
        return (
            <View>

            </View>
        )
    }
}
export default user;


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