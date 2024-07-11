const mongoose = require('mongoose');
const env = require('dotenv');
env.config();

mongoose.connect('mongodb+srv://Nikhil:GKetDsd8ciHgXjl0@sanio.rvzfl8x.mongodb.net/?retryWrites=true&w=majority&appName=sanio')
.then(d => 
    console.log("Successfully connected")
    )
.catch(err=>
    console.error("Error connecting to database:", err)
);

exports.mongoose=mongoose;