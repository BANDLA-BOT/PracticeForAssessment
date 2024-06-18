const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken')
const User = require("./models/User.js");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose
  .connect("mongodb://localhost:27017/Profile")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/profilePic");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
});
//routes
app.post("/register", upload.single("profilepic"), async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const picture = req.file.filename;
    const newUser = User.create({
      username,
      email,
      password,
      profilepic: picture,
    });
    res.status(201).send({ success: true, user: newUser });
  } catch (error) {
    res.status(500).json({ message: true, error });
  }
})


app.use('/login', async(req,res)=>{
    const {email, password} = req.body
    console.log(password)
    console.log(email)
    try {
      const user = await User.find(email)
      console.log(user)
      console.log(user.password)
      if(user){
        if(user.password === password){
          const token = jwt.sign({email:email},'jwt-secret-key-token', {expiresIn:'1m'})
          console.log(token)
          res.json({success:"Logged in successfully",token,user})
        }
      }
      else{
        res.json({message:"Error while log in "})
      }
    } catch (error) {
      console.log(error)
    }
})
const verify = (req,res,next)=>{
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  jwt.verify(token, jwt-secret-key-token, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = decoded;
    next();
  });
}
app.get('/getuser',verify,(req,res)=>{
  const user = req.user 
  res.json({message:"verified",user:user})
})

app.listen(8000, () => {
  console.log("Server is running on 8000");
});
