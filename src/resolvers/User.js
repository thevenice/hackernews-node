function links(parents, args, context) {
  return context.prisma.user({ id: parent.id }).link();
}
module.exports = {
  links
};
