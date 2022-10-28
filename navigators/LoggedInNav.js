import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { nav } from "../constant";
import Feed from "../screens/Feed";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
    return (
        <Tabs.Navigator>
            <Tabs.Screen name={nav.Feed} component={Feed}></Tabs.Screen>
        </Tabs.Navigator>
    );
}
