import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { nav } from "../constant";

export default function Photo({ navigation }) {
    return (
        <View
            style={{
                backgroundColor: "black",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <TouchableOpacity onPress={() => navigation.navigate(nav.Profile)}>
                <Text style={{ color: "white" }}>Go to Profile</Text>
            </TouchableOpacity>
        </View>
    );
}
