import firestore from '@react-native-firebase/firestore'

const userChangeStatus = (userId, status = 1, time = null, token) => {
    firestore()
        .collection('users')
        .doc(userId)
        .update({
            status: status,
            lastSeen: time,
            token: token
        })
}

export default userChangeStatus;