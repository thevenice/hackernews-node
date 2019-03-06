//import gqlServer from yoga
const { GraphQLServer } = require("graphql-yoga");
//import prisma-client folder to
//provide data in context
const { prisma } = require("./generated/prisma-client");

// --- resolvers---
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
// --- resolvers---
//2 resolver
const resolvers = {
  Query,
  Mutation,
  User,
  Link
};

//3 Server
//why conext hasa function in it ?
/*
Instead of attaching an object directly, you’re now creating the context as a function which returns the context. The advantage of this approach is that you can attach the HTTP request that carries the incoming GraphQL query (or mutation) to the context as well. This will allow your resolvers to read the Authorization header and validate if the user who submitted the request is eligible to perform the requested operation.
*/
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  // context: { prisma } old
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});
server.start(() => console.log(`Server is running on http://localhost:4000`));

//practice
// type Query {
//   # Fetch a single link by its `id`
//   link(id: ID!): Link
// }

// type Mutation {
//   # Update a link
//   updateLink(id: ID!, url: String, description: String): Link

//   # Delete a link
//   deleteLink(id: ID!): Link
// }
