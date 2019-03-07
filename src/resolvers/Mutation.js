const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

//post
function post(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } }
  });
}
async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.createUser({ ...args, password });

  const token = await jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    user,
    token
  };
}

// login
async function login(parent, args, context, info) {
  //1
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error("No user associated with this Email Address");
  }

  //2
  const vaild = await bcrypt.compare(args.password, user.password);
  if (!vaild) {
    throw new Error("Password is Incorrect");
  }
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  //3 return
  return {
    token,
    user
  };
}
//new VOTE resolver
async function vote(parent, args, context, info) {
  //1 vaildate user via getUserId function
  const userId = getUserId(context);
  //2 check if vote already given
  const linkExists = await context.prisma.$exists.vote({
    user: { id: userId },
    link: { id: args.linkId }
  });
  if (linkExists) {
    throw new Error(`Already Voted for : ${args.linkId}`);
  }
  //3
  return context.prisma.createVote({
    user: { connect: { id: userId } },
    link: { connect: { id: args.linkId } }
  });
}

//export modules
module.exports = {
  signup,
  login,
  post,
  vote
};
