import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(false);
const client = new ApolloClient({
    uri: "https://floppy-clowns-laugh-211-59-182-118.loca.lt/graphql",
    cache: new InMemoryCache(),
});

export default client;
