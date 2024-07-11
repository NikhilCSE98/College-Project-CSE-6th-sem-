const express = require('express');
const router = express.Router();
const { renderSignUp, UserSign,renderLogin,UserLogin,UHome,Uprofile,UData,render_Appoint,UAppoint} = require('../../controllers/user/UserController');

router.get('/UserSignup', renderSignUp);
router.post('/UserSignup', UserSign);

router.get('/UserLogin', renderLogin);
router.post('/UserLogin', UserLogin);


router.get('/dashboard',UHome);

router.get('/uProfile',Uprofile);
router.get('/userProfile', UData);

router.get('/appointement',render_Appoint);
router.post('/appointementRequest',UAppoint);

module.exports = router;
