// function feeds(parent, args, context, info) {
//   return context.prisma.links();
// }

async function feed(parent, args, context, info) {
  const where = args.filter
    ? {
        OR: [
          { description_contains: args.filter },
          { url_contains: args.filter }
        ]
      }
    : {};
  const links = await context.prisma.links({
    where,
    skip: args.skip,
    first: args.first,
    last: args.last,
    orderBy: args.orderBy
  });
  const count = await context.prisma
    .linksConnection({
      where
    })
    .aggregate()
    .count();
  return { links, count };
}
module.exports = { feed };

/**
 * links and count
 * You’re first using the provided filtering, ordering and pagination arguments to retrieve a number of Link elements.
Next, you’re using the linksConnection query from the Prisma client API to retrieve the total number of Link elements currently stored in the database.
The links and count are then wrapped in an object to adhere to the Feed type that you just added to the GraphQL schema.
 */
