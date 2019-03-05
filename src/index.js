//import gqlServer from yoga
const { GraphQLServer } = require("graphql-yoga");
//1 TypeDefs
const typeDefs = `type Query{
  info: String!
}`;

//2 resolver
const resolvers = {
  Query: {
    info: () => `this is the API of the Hackernews Clone`
  }
};

//3 Server
const server = new GraphQLServer({
  typeDefs,
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
