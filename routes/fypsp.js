const express = require('express')
const router = express.Router();
const Fypfuels = require('../model/Fypfuel.js');
const multer = require('multer');
const path = require('path');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Authenticatesp = require("../midleware/Authenticationsp");
const sgMail = require('@sendgrid/mail')
dotenv.config({path:'./config.env'});
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Signup Route for Service Provider

router.post('/spsignup',upload.single("image"), async (req, res) => {
    const { fname,lname,contact, email,address, password,service,lat,lng,shopname,code, codeg } = req.body;
    const image = (req.file) ? req.file.filename : null;
    try {
        if(code !== codeg){
            return res.status(422).send({ message: "Code is not Valid" });
        }else{
            const userExist = await Fypfuels.findOne({ email: email });
            if (userExist) {
                return res.status(422).send({ message: "Email is already exist." });
            } else {
                const user = new Fypfuels({ fname,lname, email,contact,image,shopname,address, password,service,location:{type:"Point", coordinates:[lat,lng]} });
                await user.save();
                return res.status(200).json({ message: "User Created Successfully" });
            }
        }
       
    } catch (error) {
        console.log(error)
    }
})

// Service Provider Email Verification

router.post('/spsignupverify', async (req, res) => {
    const { email } = req.body;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    try {
        function generateRandomNumber() {
            var minm = 100000;
            var maxm = 999999;
            return Math.floor(Math
            .random() * (maxm - minm + 1)) + minm;
          }
          const output = generateRandomNumber();
          console.log(output);
          const msg = {
            to: `${email}`,
            from: 'drazumar277@gmail.com', 
            subject: ` GetFix Email Verification`,
            text: 'Please verify your email, copy the code.',
            html: `Please verify your email, copy the code.<strong>${output}</strong>`,
          }
          
          sgMail
            .send(msg)
            .then(() => {
              console.log('Email sent')
              res.json({ message: output });
            })
            .catch((error) => {
              console.error(error)
            })
            
    } catch (error) {
        console.log(error)
    }
})


//Signin Route for Service Provider
router.post('/spsignin', async (req, res) => {
    const { email, password } = req.body;
    try {
        let token;
        if (!email || !password) {
            return res.status(400).json({ error: "plz fill all feild" })
        }
        const emailExist = await Fypfuels.findOne({ email: email });
        if (emailExist) {
            const passMatch = await bcrypt.compare(password, emailExist.password);
            token = await emailExist.generateAuthToken();
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 9000000),
                httpOnly: true
            });
            if (!passMatch) {
                res.status(400).json({ error: "Password is not correct" })
            }else {
                res.json({ message: "Login Successfully" });
            }
        } else {
            res.status(400).json({ error: "Wrong Email" });
        }
    } catch (error) {
        console.log(error)
    }
})

// Get Detail of Service Provider

router.get('/profile', Authenticatesp, async (req, res) => {
    try {
        const profile = await Fypfuels.findById(req.userID);
        //console.log(profile)
        res.json(profile)
        console.log(profile);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;