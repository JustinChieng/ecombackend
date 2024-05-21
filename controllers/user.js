// controllers
const bcrypt = require("bcrypt");

const User = require("../models/user");

const getUserByEmail = async (email) => {
  //find one user with provided email
  const user = await User.findOne({ email: email });
  return user;
};

// login user
const loginUser = async (email, password) => {
  // 1. check if user exist
  const user = await getUserByEmail(email);

  // 2. if user don't exists, return error
  if (!user) throw new Error("Invalid email or password");

  //3. check if password match or not
  const isPasswordMatch = bcrypt.compareSync(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
  }

  //4 return back the user data
  return user;
};

// create user
const signUpUser = async (name, email, password) => {
  // 1. check if email already exists
  const email_exist = await getUserByEmail(email);
  if (email_exist) throw new Error("Email already exists");
  // 2. create the new user
  const newUser = new User({
    name: name,
    email: email,
    password: bcrypt.hashSync(password, 10), // hash the password
  });
  // 3. save the data
  await newUser.save();
  // 4. return the user data
  return newUser;
};

module.exports = {
  getUserByEmail,
  loginUser,
  signUpUser,
};
