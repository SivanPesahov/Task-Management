const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3000;
const connectDB = require("./config/db");
const { verifyToken } = require("./middleware/auth.middleware");
const path = require("path");

dotenv.config();

async function main() {
  //Connect the database
  await connectDB();

  // MIDDLEWARE
  app.use(express.static("public"));
  app.use(express.json());

  // allow CORS for local development (for production, you should configure it properly)
  app.use(cors());

  // ROUTES
  const authRoutes = require("./routes/auth.route");
  const taskRoutes = require("./routes/task.route");
  const mailRoutes = require("./routes/mail.route");
  app.use("/api/auth", authRoutes);
  app.use("/api/task", verifyToken, taskRoutes);
  app.use("/api/mail", verifyToken, mailRoutes);

  app.use("*", (req, res) => {
    res.sendFile(path.resolve("public", "index.html"));
  });
  // START SERVER
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main();
