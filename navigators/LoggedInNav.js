import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { View } from "react-native";
import { nav } from "../constant";
import Feed from "../screens/Feed";
import Me from "../screens/Me";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import SharedStackNav from "./SharedStackNav";
import TabIcon from "./TabIcons";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
    return (
        <Tabs.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    borderTopColor: "rgba(255,255,255,0.3)",
                    backgroundColor: "black",
                },
            }}
        >
            <Tabs.Screen
                name={nav.Feed}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon
                            iconName={"home"}
                            size={22}
                            focused={focused}
                        />
                    ),
                }}
            >
                {() => <SharedStackNav screenName={nav.Feed} />}
            </Tabs.Screen>
            <Tabs.Screen
                name={nav.Search}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon
                            iconName={"search"}
                            size={22}
                            focused={focused}
                        />
                    ),
                }}
            >
                {() => <SharedStackNav screenName={nav.Search} />}
            </Tabs.Screen>
            <Tabs.Screen
                name={nav.Camera}
                component={View}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon
                            iconName={"camera"}
                            size={26}
                            focused={focused}
                        />
                    ),
                }}
            ></Tabs.Screen>
            <Tabs.Screen
                name={nav.Notifications}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon
                            iconName={"heart"}
                            size={22}
                            focused={focused}
                        />
                    ),
                }}
            >
                {() => <SharedStackNav screenName={nav.Notifications} />}
            </Tabs.Screen>
            <Tabs.Screen
                name={nav.Me}
                component={Me}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon
                            iconName={"person"}
                            size={22}
                            focused={focused}
                        />
                    ),
                }}
            ></Tabs.Screen>
        </Tabs.Navigator>
    );
}
