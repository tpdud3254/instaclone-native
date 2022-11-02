import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, View } from "react-native";
import { nav } from "../constant";
import useMe from "../hooks/useMe";
import SharedStackNav from "./SharedStackNav";
import TabIcon from "./TabIcons";

const Tabs = createBottomTabNavigator();

export default function TabsNav() {
    const { data } = useMe();
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
                listeners={({ navigation }) => {
                    return {
                        tabPress: (e) => {
                            e.preventDefault();
                            navigation.navigate("Upload");
                        },
                    };
                }}
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
                options={{
                    tabBarIcon: ({ focused, color, size }) =>
                        data?.me?.avatar ? (
                            <Image
                                source={{ uri: data.me.avatar }}
                                style={{
                                    height: 20,
                                    width: 20,
                                    borderRadius: "50%",
                                    ...(focused && {
                                        borderColor: "white",
                                        borderWidth: 1,
                                    }),
                                }}
                            />
                        ) : (
                            <TabIcon
                                iconName={"person"}
                                size={22}
                                focused={focused}
                            />
                        ),
                }}
            >
                {() => <SharedStackNav screenName={nav.Me} />}
            </Tabs.Screen>
        </Tabs.Navigator>
    );
}
