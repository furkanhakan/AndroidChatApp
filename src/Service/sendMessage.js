import firestore from '@react-native-firebase/firestore'

const sendMessage = (authId, userId, message) => {
    const time = new Date()
    console.log(authId, userId, message)
    // From
    firestore()
        .collection(`users/${authId}/contacts/${userId}/messages`)
        .doc()
        .set({
            me: true,
            message,
            seen: false,
            time,
        })
        .catch((error) => {
            console.log(error.message)
            return false
        })
    firestore()
        .collection(`users/${authId}/contacts`)
        .doc(userId)
        .set({
            me: true,
            message,
            seen: false,
            time,
        })
        .catch((error) => {
            console.log(error.message)
            return false
        })

    // To
    firestore()
        .collection(`users/${userId}/contacts/${authId}/messages`)
        .doc()
        .set({
            me: false,
            message,
            seen: false,
            time,
        })
        .catch((error) => {
            console.log(error.message)
            return false
        })
    firestore()
        .collection(`users/${userId}/contacts`)
        .doc(authId)
        .set({
            me: false,
            message,
            seen: false,
            time,
        })
        .catch((error) => {
            console.log(error.message)
            return false
        })

    return true
}

export default sendMessage