import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import TankUser from '../models/user.js';


export const signin = async (req, res) => {
    const { email, password } = req.body;
    
    try{
        const existingUser = await TankUser.findOne({ email });

        if(!existingUser) return res.status(404).json({message: "User doesn't exist."})

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message: 'Invalid credentials.'})
        
        const token = jwt.sign({email: existingUser.email, id: existingUser._id, isAdmin: existingUser.isAdmin}, 'test', { expiresIn: '1h'});

        res.status(200).json({result: existingUser, token})
    } catch (error) {
        res.status(500).json({message: 'Something went wrong'})
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName, atomicButton, country } = req.body;
    
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const upperChars = /[A-Z]/;
    
    try{
        const existingUser = await TankUser.findOne({ email });

        if(existingUser) return res.status(404).json({message: "User already exist."})

        if(password !== confirmPassword) return res.status(404).json({message: "Passwords don't match."})

        if(email.length > 255 ) return res.status(404).json({message: "Email to long."})

        if(password.length < 6) return res.status(404).json({message: "Password to short."})
        
        if(!specialChars.test(password)) return res.status(404).json({message: "Password needs one special char."})
        
        if(!upperChars.test(password)) return res.status(404).json({message: "Password need one upper char."})
        
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await TankUser.create({ email, atomicButton, country, password: hashedPassword, name: `${firstName} ${lastName}`})
    
        const token = jwt.sign({ email: result.email, id: result._id}, 'test', { expiresIn: '1h'});

        res.status(200).json({result, token});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong.'})
    }
}