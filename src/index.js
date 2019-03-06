//import gqlServer from yoga
const { GraphQLServer } = require("graphql-yoga");
//import prisma-client folder to
//provide data in context
const { prisma } = require("./generated/prisma-client");

//2 resolver
const resolvers = {
  Query: {
    info: () => `this is the API of the Hackernews Clone`,
    feed: (root, args, context, info) => context.prisma.links()
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        description: args.description,
        url: args.url
      });
    }
  }
};

//3 Server
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: { prisma }
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
