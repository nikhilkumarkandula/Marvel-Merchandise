import { generateToken } from '../lib/utils.js'
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import nodemailer from "nodemailer"
import redis from "../lib/redis.js"

export const signup = async (req, res) => {
    const { email, fullName, password} = req.body;
    //console.log(req.body);
    try{

        // checking the form details
        if(!fullName || !email || !password){
            return res.status(400).json({message: "All fields are required"})
        }
        if(password.length < 6){
            return res.status(400).json({message: "Password must be 6 characters"})
        }

        //checking if user alrerady exists
        const user = await User.findOne({email});

        if(user) return res.status(400).json({message: "Email already exists"});

        // hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email, 
            password:hashedPassword,
        });

        if(newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
            })
        } else{
            return res.status(400).json({message: "Inavlid user data"})
        }

    } catch (err) {
        console.log('error in signup:', err);
        res.status(500).json({message: "Internal Server error"});
    }
}

export const login = async (req, res) => {
    const {email, password } = req.body;
    try {
        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({message:"Inavlid Credentials"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid Password"});
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
        });

    } catch (err) {
        console.log("error in login credentials", err);
        res.status(500).json({message: "Internal server error"})
    }
}

export const logout = async (req, res) => {
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"});
    } catch (err) {
        console.log("error in logout controller:", err.message);
        res.status(500).json({message:"Internal server error"})
    }
}

export const forgot = async (req, res) => {
    const {email} = req.body;

    try{
        const user = User.findOne({email})

        if(!user) return res.status(400).json({message:"Email doesn't exist"});

        // generate otp
        const otp = crypto.randomInt(100000, 999999).toString();
        
        // stroring otp
        await redis.set(`otp:${email}`, otp, "EX", 300);
        // send otp via mail using nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP for password reset is: ${otp}`
        });

        res.status(200).json({message: "OTP sent successfully"});

    } catch(err){
        console.log("error in forgot-password", err);
        res.status(500).json({message: "Internal server error"})
    }

}

export const verifyOtp = async (req, res) => {
    const { email, newPassword, otp } = req.body
    try{
        const storedOtp = await redis.get(`otp:${email}`)
        if(!storedOtp ) {
            return res.status(400).json({message:"Expired otp"});
        }

        if( storedOtp!==otp ) {
            return res.status(400).json({message:"Invalid OTP"});
        }
        console.log("Otp", storedOtp);
        // Hash the new password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // update password
        await User.findOneAndUpdate({email}, {password: hashedPassword });

        // Delete OTP from Redis
        await redis.del(`otp:${email}`)

        res.status(200).json({message: "Password reset Succesfull"})

    } catch (err) {
        console.log("Error in OTP verification:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const feedbackForm = async (req, res) => {
    const userId = req.user._id;

    if(!userId) {
        return res.status(400).json({message:"Only logged in users can give feedback"})
    }

    const name = req.user.fullName;
    const email = req.user.email;
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ message: "Feedback can't be empty" });
    }

    try{
        

        // Create transporter (Your SMTP details)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,  // Your Gmail
                pass: process.env.MAIL_PASS,  // Your App Password
            },
        });

        // Email content
        const mailOptions = {
            from: `"${name}" <${process.env.MAIL_USER}>`, // From your predefined email
            replyTo: email,  // Allows you to reply directly to the user
            to: "your-email@example.com", // Your email where feedback is received
            subject: "New Feedback from Website",
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Feedback sent successfully!" });
    } catch (error) {
        console.error("Error sending feedback:", error);
        res.status(500).json({ message: "Failed to send feedback" });
    }
}

// checking authentication of user whenever required
export const checkAuth = (req, res) =>{
    try {
        res.status(200).json(req.user);
    } catch (err) {
        console.log('Error in checkAuth controller', err.message);
        res.status(500).json({message: "Internal server error"})
    }
}