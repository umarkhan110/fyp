const express = require('express')
const router = express.Router();
//const distance = require('distance-matrix-api');
const Fypclients = require('../model/Fypclient.js');
const Fypfuels = require('../model/Fypfuel.js');
const multer = require('multer');
const path = require('path');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sgMail = require('@sendgrid/mail')
const Authenticate = require("../midleware/Authentication");
const Recentorder = require('../model/Recentorder.js');
const Authenticatesp = require('../midleware/Authenticationsp.js');
const dotenv = require('dotenv');
//const { default: Forget } = require('../client/src/component/Forget.js');
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

// Signup Route for Customer

router.post('/customersignup',upload.single("image"), async (req, res) => {
    const { customerfname,customerlname,contact, email, password, code, codeg } = req.body;
    const image = (req.file) ? req.file.filename : null;
    try {
        if(code !== codeg){
            return res.status(422).send({ message: "Code is not Valid" });
        }else{
            const userExist = await Fypclients.findOne({ email: email });
            if (userExist) {
                return res.status(422).send({ message: "Email is already exist." });
            } else {
                const user = new Fypclients({  customerfname,customerlname,contact, email, password, image });
                await user.save();
                return res.status(200).json({ message: "User Created Successfully" });
            }
        }
        
    } catch (error) {
        console.log(error)
    }
})

// Signup Email Verification

router.post('/customersignupverify', async (req, res) => {
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


//Signin Route for Customer

router.post('/customersignin', async (req, res) => {
    const { email, password } = req.body;
    try {
        let token;
        if (!email || !password) {
            return res.status(400).json({ error: "plz fill the filled" })
        }
        const emailExist = await Fypclients.findOne({ email: email });
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


router.get('/latlng/:lat/:lng', async (req, res) => {
    try {
       console.log(`djhsghj ${req.params.lat}`)
       console.log(`djhsghj ${req.params.lng}`)
        const latlng = await Fypfuels.find(
            {
              location:
                { $near :
                   {
                     $geometry: { type: "Point",  coordinates: [ req.params.lat, req.params.lng ] },
                     $minDistance: 100,
                     $maxDistance: 5000
                   }
                }
            }
         )
        res.json(latlng)
        console.log(latlng[0].service)
    } catch (error) {
        console.log(error);
    }
})

// Search For Fuel Delivery Service

router.get('/fueldelivery/:lat/:lng',Authenticate, async (req, res) => {
    try {
    //    console.log(`fuel ${req.params.lat}`)
    //    console.log(`fuel ${req.params.lng}`)
        const latlng = await Fypfuels.find(
            {
              location:
                { $near :
                   {
                     $geometry: { type: "Point",  coordinates: [ req.params.lat, req.params.lng ] },
                     $minDistance: 100,
                     $maxDistance: 5000
                   }
                },
                service:"Fuel Provider"
            }
         )
         console.log(latlng.length)
         if(latlng.length > 0){
            res.json(latlng)
         }else{
            res.status(422).json({ message: "This Service is not avalibale" });
         }
        
    } catch (error) {
        console.log(error);
    }
})

// Search For Mechanic Service

router.get('/mechanic/:lat/:lng', Authenticate, async (req, res) => {
    try {
    //    console.log(`mechanic ${req.params.lat}`)
    //    console.log(`mechanic ${req.params.lng}`)
        const latlng = await Fypfuels.find(
            {
              location:
                { $near :
                   {
                     $geometry: { type: "Point",  coordinates: [ req.params.lat, req.params.lng ] },
                     $minDistance: 100,
                     $maxDistance: 5000
                   }
                },
                service:"Mechanic"
            }
         )
         console.log(latlng.length)
         if(latlng.length > 0){
            res.json(latlng)
         }else{
            res.status(422).json({ message: "This Service is not avalibale" });
         }
              
    } catch (error) {
        console.log(error);
    }
})

// Search For All Services
router.get('/latlng/:lat/:lng/:service', async (req, res) => {
    try {
       console.log(`djhsghj ${req.params.lat}`)
       console.log(`djhsghj ${req.params.lng}`)
        const latlng = await Fypfuels.find(
            {
              location:
                { $near :
                   {
                     $geometry: { type: "Point",  coordinates: [ req.params.lat, req.params.lng ] },
                     $minDistance: 100,
                     $maxDistance: 5000
                   }
                },
                service:req.params.service
            }
         )
         console.log(latlng.length)
         if(latlng.length > 0){
            res.json(latlng)
         }else{
            res.status(422).json({ message: "This Service is not avalibale" });
         }  
        
    } catch (error) {
        console.log(error);
    }
})

// Request For Service Provider detail

router.get('/detail/:id', async (req, res) => {
    try {
        const items = await Fypfuels.findById( req.params.id);
        res.json(items)
        console.log(items)
    } catch (error) {
        console.log(error);
    }
})


// Add Order

router.post('/recentorder', async (req, res) => {
    const { customerfname,customerlname, service, id ,_id} = req.body;
    try {
        const order = new Recentorder({customerfname,customerlname,service, user: id , client: _id});
        const ordersave = await order.save();
        return res.status(200).json({ message: "Order Added" });
    } catch (error) {
        console.log(error);
    }
})

// Request For Customer detail

router.get('/cldetail', Authenticate, async (req, res) => {
    try {
        console.log(req.userID)
        const cl = await Fypclients.findById(req.userID);
        res.json(cl)
    } catch (error) {
        console.log(error);
    }
})

// Request For Recent Order detail

router.get('/rcorder', Authenticatesp, async (req, res) => {
    try {
        const rcorder = await Recentorder.find({ user: req.userID });
        res.json(rcorder)
    } catch (error) {
        console.log(error);
    }
})

// For Status Updation

router.put('/status/:id', async (req, res) => {
    console.log(req.params.id)
    try {
        const order = await Recentorder.find({client:req.params.id})
        if(order.role === 0){
            const item = await Recentorder.findOneAndUpdate({client:req.params.id},
                {
                    $set: {
                        "role": "1",
                    }
                },{new:true});
               const abc =  res.json(item)
                console.log(abc)
        }else{
            return res.status(422).send({ message: "Already Completed" }); 
        }
        

    } catch (error) {
        console.log(error);
    }
})

// For forget password
// router.post('/forgetpass', async (req, res) => {
//     const { email, code, codeg } = req.body;
//     try {
//         if(code !== codeg){
//             return res.status(500).send({ message: "Code is not Valid" });
//         }else{
//             const forgetp = await Fypfuels.findOne({ email: email});
//             if (!forgetp) {
//                 return res.status(422).send({ message: "Email is not correct" });
//             }else{
//                 return res.status(200).send({ message: "Email " });   
//             }
//         }
        
//     } catch (error) {
//         console.log(error);
//     }
// })

router.post('/forgetpass', async (req, res) => {
    const {email, code1, codeg } = req.body;
console.log(req.body)
    try {
        if(code1 !== codeg){
            return res.status(422).send({ message: "Code is not Valid" });
        }else{
            const userExist = await Fypfuels.findOne({ email: email });
            if (userExist) {
                return res.status(200).send({ message: "Email is Correct" });
            } else {
                // const user = new Fypclients({  customerfname,customerlname,contact, email, password, image });
                // await user.save();
                return res.status(422).json({ message: "Email is not Corrected" });
            }
        }
        
    } catch (error) {
        console.log(error)
    }
})

router.put('/forget/:email', async (req, res) => {
    try {
        const { password } = req.body;
       const password1 = await bcrypt.hash(password, 12);
        console.log(req.params.email)
        const forgetpass = await Fypfuels.findOneAndUpdate({email:req.params.email},
            {
                $set: {
                    "password": password1,
                }
            },{new:true})
            res.json(forgetpass)
//console.log(res.json(forgetpass))
    } catch (error) {
        console.log(error);
    }
})

// for customer password forget
router.post('/cforgetpass', async (req, res) => {
    const {email, code1, codeg } = req.body;
console.log(req.body)
    try {
        if(code1 !== codeg){
            return res.status(422).send({ message: "Code is not Valid" });
        }else{
            const userExist = await Fypclients.findOne({ email: email });
            if (userExist) {
                return res.status(200).send({ message: "Email is Correct" });
            } else {
                // const user = new Fypclients({  customerfname,customerlname,contact, email, password, image });
                // await user.save();
                return res.status(422).json({ message: "Email is not Corrected" });
            }
        }
        
    } catch (error) {
        console.log(error)
    }
})

router.put('/cforget/:email', async (req, res) => {
    try {
        const { password } = req.body;
       const password1 = await bcrypt.hash(password, 12);
        console.log(req.params.email)
        const forgetpass = await Fypclients.findOneAndUpdate({email:req.params.email},
            {
                $set: {
                    "password": password1,
                }
            },{new:true})
            res.json(forgetpass)
//console.log(res.json(forgetpass))
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;