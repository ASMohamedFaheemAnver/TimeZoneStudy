const { ApolloClient, InMemoryCache } = require("@apollo/client");

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Post: {
        fields: {
          date: {
            read(value) {
              // console.log({ value });
              return new Date(value);
            },
          },
        },
      },
    },
  }),
});

export default client;
