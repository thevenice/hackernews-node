//
function newLinkSubscribe(parent, args, context, info) {
  // get $subscribe from newLink
  return context.prisma.$subscribe.link({ mutation_in: ["CREATED"] }).node();
}
const newLink = {
  subscribe: newLinkSubscribe,
  resolve: payload => {
    return payload;
  }
};

//vote
//step 1 subs creation:fun()
function voteSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe
    .vote({
      mutation_in: ["VOTED"]
    })
    .node();
}
//step 2 subs creation: obj()
const newVote = {
  subscribe: voteSubscribe,
  resolve: payload => payload
};

module.exports = { newLink, newVote };
