const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const Drivers = require('../models/drivers')
const validateSignupInput = require("../validation/signupDriver");
const validateLoginInput = require("../validation/loginDriver");
const keys = require('../config/keys')


const postSignup = (req, res) => {
   const { errors, isValid } = validateSignupInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    console.log(req.body)
  Drivers.findOne({email : req.body.email})
       .then(driver => {
           if(driver){
               return res.status(400).json({ email: "Email already exists"});
           }else{
                 newDriver = new Drivers({
                  name: req.body.name,
                  email: req.body.email,
                  password: req.body.password,
                  phoneNo : req.body.phoneNo
                });
              }
           

           // hashing password
           bcrypt.genSalt(10,(err,salt) => {
               bcrypt.hash(newUser.password, salt, (err,hashPassword) => {
                   if(err) throw err;

                   newDriver.password = hashPassword
                   newDriver.save()
                          .then((deiver) => res.json(driver))
                          .catch(err => console.log(err))
               })
           })
       })
};


const postLogin = (req,res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  } 

  console.log(req.body)
  const email = req.body.email;
  const password = req.body.password;
   
  Drivers.findOne({ email : email })
      .then(driver => {
        if(!driver){
           return res.status(404).json({ driverNotFount: "Driver not found" });
        }
        console.log(driver)
          bcrypt.compare(password, driver.password)
                .then(isMatch => {
                  if(isMatch){
                    const payload = {
                      id : driver.id,
                      name : driver.name
                    }

                    jwt.sign(payload,keys.secretOrKey,{ expiresIn : 31556926 },
                      (err,token)=>{
                          res.json({ success : true,
                          token : "bearer" + token })
                    } )
                  }else{
                    return res.status.json({
                      passwordincorrect: "Password incorrect",
                    });
                  }
                })

      })

}

module.exports = { postSignup,postLogin }