import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import PropTypes from "prop-types";
import { nav } from "../constant";
import Photo from "../screens/Photo";
import Profile from "../screens/Profile";
import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Me from "../screens/Me";
import { Image } from "react-native";

const Stack = createStackNavigator();

// const screenNamelist = [nav.Feed, nav.Search, nav.Notifications, nav.Me];
// const componentList = [Feed, Search, Notifications, Me];
/* {screenNamelist.map((name, index) =>
                screenName === name ? (
                    <Stack.Screen
                        name={"Tab" + screenName}
                        component={componentList[index]}
                    />
                ) : null
            )} */
export default function SharedStackNav({ screenName }) {
    //4개의 분리된 카드 stack을 각각의 탭에 만드는 작업
    return (
        <Stack.Navigator
            screenOptions={{
                headerMode: "screen",
                headerBackTitleVisible: false,
                headerTintColor: "white",
                headerStyle: {
                    borderBottomColor: "rgba(255, 255, 255, 0.3)",
                    shadowColor: "rgba(255, 255, 255, 0.3)",
                    backgroundColor: "black",
                },
            }}
        >
            {screenName === nav.Feed ? (
                <Stack.Screen
                    name={"Tab" + nav.Feed}
                    component={Feed}
                    options={{
                        headerTitle: () => (
                            <Image
                                style={{ width: 120 }}
                                resizeMode="contain"
                                source={require("../assets/logo.png")}
                            />
                        ),
                    }}
                />
            ) : null}
            {screenName === nav.Search ? (
                <Stack.Screen name={"Tab" + nav.Search} component={Search} />
            ) : null}
            {screenName === nav.Notifications ? (
                <Stack.Screen
                    name={"Tab" + nav.Notifications}
                    component={Notifications}
                />
            ) : null}
            {screenName === nav.Me ? (
                <Stack.Screen name={nav.Me} component={Me} />
            ) : null}
            <Stack.Screen name={nav.Profile} component={Profile} />
            <Stack.Screen name={nav.Photo} component={Photo} />
        </Stack.Navigator>
    );
}

SharedStackNav.propTypes = {
    screenName: PropTypes.string.isRequired,
};
