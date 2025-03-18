const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const SALT_ROUNDS = 10; // Number of rounds to generate salt. 10 is recommended value

async function register(req, res) {
  console.log("register");
  try {
    const { password, ...userData } = req.body;
    console.log(req.body);

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS); // Hash password
    const user = new User({ ...userData, password: hashedPassword }); // Create new user object
    await user.save(); // Save user to database
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "3h",
    });

    res.status(201).json({ token });
  } catch (error) {
    console.log("register", error);
    if (error.code === 11000) {
      console.log("username already exists");
      return res.status(400).json({ error: "User already exists" });
    }
    res.status(500).json({ error: "Registration failed" });
    console.log(error.message);
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .json({ error: "Authentication failed - user was not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ error: "Authentication failed - password is incorrect" });
    }

    // Generate JWT token containing user id
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "6h",
    });

    // Send token in response to the client, not the user object!
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
}

async function getLoggedInUser(req, res) {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user data" });
  }
}

// async function getUserById(req, res) {
//   const { id } = req.params;
//   try {
//     const user = await User.findById(id);
//     res.json(user);
//     console.log(user);
//   } catch (err) {
//     if (err.name === "CastError") {
//       console.log(
//         `user.controller, getuserById. user not found with id: ${id}`
//       );
//       return res.status(404).json({ message: "user not found" });
//     }
//     console.log(
//       `user.controller, getuserById. Error while getting user with id: ${id}`,
//       err.name
//     );
//     res.status(500).json({ message: err.message });
//   }
// }

module.exports = { register, login, getLoggedInUser };
