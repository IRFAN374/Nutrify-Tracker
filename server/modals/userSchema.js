import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
   userName:{
       type: String,
       required: true
   },
   userType:{
     type:String,
     default: "user"
   },
   email:{
       type: String,
       required: true
   },
   password:{
       type: String,
       required: true
   },
   userMaxCalorie:{
       type: Number,
       required: true
   },
   userCreatedAt:{
       type: Date,
       default: new Date()
   }
})

export default mongoose.model("userModel",userSchema);

/**
 * user Info:
 * 1. id: Automatically created by Mongodb
 * 2. userName (firstName and LastName)
 * 3. email
 * 4. password
 * 5. Confirm Password
 * 5. userCreatedAt: when user first created Account
 * 6. userMaxCalorie
 * 7.
 * 
 */

