import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { nav } from "../constant";
import CreateAccount from "../screens/CreateAccount";
import LogIn from "../screens/LogIn";
import Welcome from "../screens/Welcome";

const Stack = createStackNavigator();

export default function LoggedOutNav() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={nav.Welcome}
                component={Welcome}
                options={{ headerShown: false }}
            />
            <Stack.Screen name={nav.LogIn} component={LogIn} />
            <Stack.Screen name={nav.CreateAccount} component={CreateAccount} />
        </Stack.Navigator>
    );
}
