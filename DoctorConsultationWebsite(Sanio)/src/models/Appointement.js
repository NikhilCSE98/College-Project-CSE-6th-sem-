const mongoose = require('mongoose');
const AppointmentSchema=new mongoose.Schema({
    date:String,
    dname:String,
    Specialist:String,
    Duration:String,
    Symptom_1:String,
    Symptom_2:String,
    Symptom_3:String,
    Other_Symp:String
})

module.exports= mongoose.model('Appointement', AppointmentSchema);
 

