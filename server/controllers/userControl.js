import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import userModel from '../modals/userSchema.js'
/**
 * make databse schema 
 * make model and export them 
 */
const SECRET_CODE = 'privateKey';

export const signInController = async(req,res)=>{
    // destruture the body
    const {email,password} = req.body;
    //end of destructure
    
    try {

        // check user is exist or not
        const existUser = await userModel.findOne({email:email});
        if(!existUser){ return res.status(404).json({ message: `User Does not exist with email:${email}` }) }
        // end of checking user existing in DB
        
        // check Entered password is matched or not with DB password
        const isPasswordCorrect = await bcrypt.compare( password,existUser.password )
        if(!isPasswordCorrect){ return res.status(403).json({ message:"Invalid Credientials" }); }
        // end of matching password 
        
        // genearte token to user and send result to client side
        const token = jwt.sign( { email:existUser.email, id:existUser._id }, SECRET_CODE, { expiresIn: '1h' } )
        res.status(200).json({ result: existUser, token })
        //end of genrate token 

    } catch (error) {
        console.log("Welcome to Error in SignIn",error);
        res.status(500).json({ message:"Something wrong in server,Please try again later", error: error })
    }
}

export const signUpController = async (req,res)=>{
    
    // destructuring Body
    // console.log("req body",req.body);
    const {firstName,lastName,email,password,confirmPassword,maxCalories} = req.body;
    // end of destructuring body

    try {
        // first check user is already exist or not
        const existUser = await userModel.findOne({email:email});
        if(existUser){ return res.status(303).json({ message: `User already exist with email: ${email}` }) }
        //end of checking user existing in the db

        // check password is matched with confirmPassword or not
        if(password !== confirmPassword){ return res.status(406).json({ message: 'Confirm Password does not matched with Password' }) }
        // end of checking password

        // hashed the password and genreate token for successfull login
          const salt = await bcrypt.genSalt(12);
          const hashedPassword = await bcrypt.hash(password,salt);
          const savedUser = await userModel.create({ userName:`${firstName} ${lastName}`, password: hashedPassword, email, userMaxCalorie:maxCalories })        
          const token = jwt.sign( { email:savedUser.email, id:savedUser._id }, SECRET_CODE, { expiresIn: '1h' } )
        // end of hashed and genrate token
        
        // sending result to frontSide
        res.status(201).json({ result: savedUser, token })
        // end of sending result
        
    } catch (error) {
        console.log("Welcome to error: ",error);
        res.status(500).json({ message: 'Something went wrong in backend', error: error })        
    }
}


