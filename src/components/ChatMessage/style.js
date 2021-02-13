import { StyleSheet } from "react-native";
import Colors from "../../constant/Colors";

const styles = StyleSheet.create({
    container: {
        padding: 5,
    },
    messageBox: {
        borderRadius: 5,
        paddingLeft: 10,
        paddingTop: 10,
        paddingRight: 10,
        minWidth: 150
    },
    name: {
        color: Colors.light.tint,
        fontWeight: "bold",
        marginBottom: 5,
    },
    message: {

    },
    time: {
        alignSelf: "flex-end",
        color: 'grey',
        fontSize: 10,
        paddingBottom: 3
    }
});

export default styles;