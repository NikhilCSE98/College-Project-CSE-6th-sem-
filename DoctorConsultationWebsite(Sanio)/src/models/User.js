const mongoose = require('mongoose');
const UserSchema=new mongoose.Schema({
    name:String,
    mobile:String,
    pass:String,
    email:String,
    age:String,
    home_city:String,
    gender:String,
})
module.exports= mongoose.model('User', UserSchema);
 

