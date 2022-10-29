import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
    makeVar,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

const TOKEN = "token";

export const logUserIn = async (token) => {
    // await AsyncStorage.multiSet([
    //     ["token", token],
    //     ["loggedIn", "yes"],
    // ]); //multiSet 여러 키-값 쌍을 일괄적으로 저장합니다.
    /* Async Storage는 문자열 데이터만 저장할 수 있으므로 객체 데이터를 저장하려면 먼저 직렬화해야 합니다.
    JSON으로 직렬화할 수 있는 데이터의 경우 데이터를 저장할 때 JSON.stringify()를 사용하고 
    데이터를 로드할 때 JSON.parse()를 사용할 수 있습니다. */

    await AsyncStorage.setItem(TOKEN, token);
    isLoggedInVar(true);
    tokenVar(token);
};

export const UserLogOut = async () => {
    await AsyncStorage.removeItem(TOKEN);
    isLoggedInVar(false);
    tokenVar("");
};

const httpLink = createHttpLink({
    uri: "https://8b92-211-59-182-118.jp.ngrok.io" + "/graphql",
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            token: tokenVar(),
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
