const express=require('express');
const app=express();
const path=require( 'path' );
const {mongoose}=require('./config/db');

const env=require('dotenv');
env.config();
const port=process.env.PORT;
const bodyParser = require('body-parser');
const router=require( './routes/user/UserRoute');
const router2=require( './routes/Doctor/DoctorRoute');


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Templates', 'home.html'));
});

app.use(express.static(path.join(__dirname, 'Templates')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/",router);
app.use("/",router2);

app.listen(port,()=>{
    console.log(`the server is running on http://localhost:${port}`);
})
