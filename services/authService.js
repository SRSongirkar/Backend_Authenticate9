const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (userData) => {
  try {
    console.log("User Data:", userData);

    const existingUser = await User.findOne({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw new Error("User already exists.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUser = await User.create({
      name: userData.name,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      password: hashedPassword,
    });

    console.log("New User:", newUser);

    return newUser;
  } catch (error) {
    console.error("Registration Error:", error);
    throw error;
  }
};

const loginUser = async (userData) => {
  try {
    const { email, password } = userData;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    return { token, user };
  } catch (error) {
    throw error;
  }
};

module.exports = { registerUser, loginUser };
