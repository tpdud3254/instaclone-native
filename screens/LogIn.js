import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { nav } from "../constant";

export default function LogIn({ navigation }) {
    return (
        <View>
            <Text>LogIn</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate(nav.CreateAccount)}
            >
                <View>
                    <Text>Go to Create Account</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
