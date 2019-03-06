//import gqlServer from yoga
const { GraphQLServer } = require("graphql-yoga");

//var links acts as db
let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "hey how to gql"
  }
];
//id counter(length counter)
let idCount = links.length;
//2 resolver
const resolvers = {
  Query: {
    info: () => `this is the API of the Hackernews Clone`,
    feed: () => links
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    }
  }
  // Link: {
  //   id: parent => parent.id,
  //   description: parent => parent.description,
  //   url: parent => parent.url
  // }
};

//3 Server
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
