import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { nav } from "../constant";

export default function Welcome({ navigation }) {
    return (
        <View>
            <Text>Welcome</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate(nav.CreateAccount)}
            >
                <View>
                    <Text>Go to Create Account</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate(nav.LogIn)}>
                <View>
                    <Text>Go to Log In</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
