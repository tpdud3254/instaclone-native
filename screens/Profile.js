import React, { useEffect } from "react";
import { Text, View } from "react-native";

export default function Profile({ navigation, route }) {
    useEffect(() => {
        if (route?.params?.userName) {
            navigation.setOptions({
                title: route.params.userName,
            });
        }
    }, []);
    return (
        <View
            style={{
                backgroundColor: "black",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text style={{ color: "white" }}>Somones Profile</Text>
        </View>
    );
}
