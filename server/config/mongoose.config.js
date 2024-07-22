const mongoose = require('mongoose');

mongoose.set('strictQuery', false); // importante

mongoose.connect("mongodb://127.0.0.1/Ecommerce")
    .then(() => console.log("CONNECTED TO DB"))
    .catch(err => console.log("ERROR WITH DB: " + err));
