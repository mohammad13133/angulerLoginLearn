const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000; // Backend port

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample users data (replace with a database later)
const users = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
];

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  console.log(password);

  // Find user
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).send("Invalid credentials");
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, username: user.username },
    "your-secret-key",
    { expiresIn: "1h" }
  );
  res.json({ token });
});
app.get("/", (req, res) => {
  res.json({ message: "Hello for loggong test" });
});
// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
