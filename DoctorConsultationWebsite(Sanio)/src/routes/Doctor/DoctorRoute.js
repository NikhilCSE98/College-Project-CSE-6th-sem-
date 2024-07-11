const express = require('express');
const router2 = express.Router();
const { renderSignUp, DoctorSign,renderLogin,DoctorLogin,DHome,Dprofile,DData,patient_List} = require('../../controllers/doctor/doctorController');

router2.get('/DoctorSign', renderSignUp);
router2.post('/DoctorSign', DoctorSign);

router2.get('/DoctorLogin', renderLogin);
router2.post('/DoctorLogin', DoctorLogin);


router2.get('/Doctordashboard',DHome);

router2.get('/DProfile',Dprofile);
router2.get('/DoctorProfile',DData);

router2.get('/PatientList',patient_List);

module.exports = router2;
