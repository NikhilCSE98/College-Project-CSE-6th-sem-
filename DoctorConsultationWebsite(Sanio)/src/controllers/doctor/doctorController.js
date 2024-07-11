const path = require('path');
const Doctor = require('../../models/Doctor');
const mongoose = require('mongoose'); // Import Mongoose
const ObjectId = mongoose.Types.ObjectId;
const jwt = require('jsonwebtoken');
const secretKey="SecretKey";

const renderSignUp = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'doctorSign-up.html'));
}

const renderLogin = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'doctorLogin.html'));
  }

const DoctorSign =(req, res) => {
    const { email, pass, name, age, mobile, home_city, gender } = req.body;
    Doctor.findOne({ email, pass })
        .then(existingDoctor => {
            if (existingDoctor) {
                return res.send('<script>alert("user with this email already exists");</script>');
            }
            const newDoctor = new Doctor({ name, email, pass, age, mobile, home_city, gender });
            return newDoctor.save();
        })
        .then(() => {
            console.log('User signed up successfully');
            const token = jwt.sign({ email }, secretKey,{expiresIn:'500s'},(err,token)=>{
                res.json({ token });
            }); 
            res.redirect('/');
        })
        .catch(err => console.error('Error signing up user:', err));
};

const DoctorLogin= (req, res) => {
    const { email, pass } = req.body;
    if (!email || !pass) {
        return res.status(400).send('Email and password are required');
    }
    Doctor.findOne({ email, pass })
        .then(user => {
            if (user) {
                // Generate JWT token
                const token = jwt.sign({id: user._id}, secretKey,{expiresIn:'500s'},(err,token)=>{
                    res.json({ token });
                }); 
            } else {
                res.status(401).send('Invalid email or password');
            }
        })
        .catch(err => console.error('Error logging in:', err));
};

const DHome = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'Templates', 'patientHome.html'));
};

const Dprofile= (req, res) => {
    res.sendFile(__dirname + '../../Templates/Doctor_Profile.html');
}

const DData = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; 
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const userId = decoded.id;
        
        try {
            const doctor = await Doctor.findById(userId);
            if (!doctor) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.json(doctor);
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ error: 'Error fetching user' });
        }
    });
}

const patient_List= (req, res) => {
    const appointmentId = req.params.id;
    Appointment.findById(appointmentId, (err, appointment) => {
        if (err) {
            console.error('Error fetching appointment details:', err);
            res.status(500).send('Error fetching appointment details');
        } else {
            res.json(appointment);
        }
    });
}


module.exports = { renderSignUp, DoctorSign, renderLogin, DoctorLogin, DHome,Dprofile,DData,patient_List}; 
