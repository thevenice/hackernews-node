//we are in mutation
//import bcrypt,jwt,appSecret,getuserid
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");
//signup
async function signup(parent, args, context, info) {
  //1
  //password making of 10 characters from bcrypt
  //bcrypt.hash(args.pas, charac. length)
  const password = await bcrypt.hash(args.password, 10);

  //2 create user(post)
  //explanation:step is to use the prisma client instance to store the new User in the database.
  //user creation method comes from conext.prisma
  const user = await context.prisma.createUser(...args, password);

  //3 tokens from JWT
  //jwt.signup({},secret)
  const tokens = await jwt.signup({ userId: user.id }, APP_SECRET);

  //4 return
  return {
    user,
    tokens
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

//post
function post(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } }
  });
}

//export modules
module.exports = {
  signup,
  login,
  post
};
