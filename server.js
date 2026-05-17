const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public')); // Serves HTML/CSS/JS from public folder

// Mock Database (Replace with MongoDB for production)
let users = [
    { id: 1, name: "Siddiq", game: "Chess", location: "Clubhouse", skill: "Advanced", availability: "Weekends" },
    { id: 2, name: "Arun", game: "Badminton", location: "Main Ground", skill: "Intermediate", availability: "Evening" },
    { id: 3, name: "Priya", game: "Carrom", location: "Block A Lounge", skill: "Beginner", availability: "Morning" }
];

// API: Register New User
app.post('/api/users', (req, res) => {
    const newUser = { id: users.length + 1, ...req.body };
    users.push(newUser);
    res.status(201).json({ message: "Profile Created!", user: newUser });
});

// API: Search Players
app.get('/api/search', (req, res) => {
    const { game, location } = req.query;
    let filtered = users;
    
    if (game) {
        filtered = filtered.filter(u => u.game.toLowerCase().includes(game.toLowerCase()));
    }
    if (location) {
        filtered = filtered.filter(u => u.location.toLowerCase().includes(location.toLowerCase()));
    }
    res.json(filtered);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});