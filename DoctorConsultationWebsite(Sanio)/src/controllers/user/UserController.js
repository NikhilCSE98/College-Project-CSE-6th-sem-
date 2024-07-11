const path = require('path');
const User = require('../../models/User');
const Appointement=require('../../models/Appointement');
const mongoose = require('mongoose'); 
const ObjectId = mongoose.Types.ObjectId;
const jwt = require('jsonwebtoken');
const secretKey="SecretKey";

const renderSignUp = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'sign-up-patient.html'));
}

const renderLogin = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'patientLogin.html'));
}

const UserSign = (req, res) => {
    const { email, pass, name, age, mobile, home_city, gender } = req.body;
    User.findOne({ email, pass })
        .then(existingUser => {
            if (existingUser) {
                return res.send('<script>alert("user with this email already exists");</script>');
            }
            const newUser = new User({ name, email, pass, age, mobile, home_city, gender });
            return newUser.save();
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


const UserLogin = (req, res) => {
    const { email, pass } = req.body;
    if (!email || !pass) {
        return res.status(400).send('Email and password are required');
    }
    User.findOne({ email, pass })
        .then(user => {
            if (user) {
                const token = jwt.sign({id: user._id}, secretKey,{expiresIn:'500s'},(err,token)=>{
                    res.json({ token });
                }); 
            } else {
                res.status(401).send('Invalid email or password');
            }
        })
        .catch(err => console.error('Error logging in:', err));
};

const UHome = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'Templates', 'patientHome.html'));
};

const Uprofile= (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'Templates', 'ProfileEdit.html'));
}

const UData =async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; 
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const userId = decoded.id;
        
        try {
            const user = await User.findById(userId);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.json(user);
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ error: 'Error fetching user' });
        }
    });
}



let render_Appoint= (req, res) => {
    res.sendFile(__dirname + '../../Templates/appointement.html');
}

const UAppoint = (req, res) => {
    const { date, dname, Specialist, Duration, Symptom_1, Symptom_2, Symptom_3, Other_Symp } = req.body;

   
            const newAppointment = new Appointement({
                date,
                dname,
                Specialist,
                Duration,
                Symptom_1,
                Symptom_2,
                Symptom_3,
                Other_Symp
            });
            newAppointment.save()
                .then(() => {
                    console.log('Appointment details saved successfully');
                    res.send('Appointment details saved successfully!');
                })
                .catch(err => {
                    console.error('Error saving appointment details:', err);
                    res.status(500).send('Error saving appointment details');
                });
}


module.exports = { renderSignUp, UserSign, renderLogin, UserLogin, UHome, Uprofile, UData, render_Appoint, UAppoint};