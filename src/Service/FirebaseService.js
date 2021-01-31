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