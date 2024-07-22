const mongoose = require('mongoose');
const User = require('./models/user.model');

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1/Ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to MongoDB");

    // Create a new user
    const newUser = new User({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe1@example.com',
        password: 'password123',
        confirmPassword: 'password123', // Include confirmPassword
        rol: 'admin'
    });

    return newUser.save();
})
.then(user => {
    console.log("User created:", user);
})
.catch(err => {
    console.error("Error:", err);
})
.finally(() => {
    mongoose.disconnect();
});
