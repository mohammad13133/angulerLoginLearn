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
  { id: 1, username: "user1", password: "password1", role: "admin" },
  { id: 2, username: "user2", password: "password2", role: "user" },
];

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Find user
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).send("Invalid credentials");
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    "your-secret-key",
    { expiresIn: "1h" }
  );
  res.json({ token });
});
app.post("/signup", (req, res) => {
  const { username, password, role } = req.body;

  // Check if user already exists
  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  // Create a new user
  const newUser = {
    id: users.length + 1, // Simple ID generation, for prototyping only
    username,
    password, // In production, hash the password before saving it
    role: role || "user", // Default role as "user"
  };

  // Add the new user to users array
  users.push(newUser);

  res
    .status(201)
    .json({ message: "User registered successfully", user: newUser });
});

app.get("/", (req, res) => {
  res.json({ message: "Hello for loggong test" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
