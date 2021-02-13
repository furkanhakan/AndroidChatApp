import React, { useEffect, useState } from "react"
import database from '@react-native-firebase/database';


export const getAllUsers = () => {
    database()
        .ref('/users')
        .once('value')
        .then(snapshot => {
            console.log('User data: ', snapshot.val());
        });

}

export const findUsersMyChat = async () => {
    const data = await database()
        .ref('/users')
        .on('value', snapshot => {
            return snapshot.val()
        }).catch((err) => {
            console.log(err)
        });

    return data;
}