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
    last: args.last
  });
  return links;
}
module.exports = { feed };
