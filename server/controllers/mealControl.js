import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import mealModel from '../modals/mealSchema.js';
import mongoose from 'mongoose';
import userModel from '../modals/userSchema.js';

export const getAllMeals = async (req,res)=>{
//    const { page }= req.query;  
//    console.log("page Number is:",page);
    const page=1;
   try {
       //const page=1;
       const LIMIT = 8;
       const startIndex = (Number(page)-1)*LIMIT;
    //    const total = await mealModel.countDocuments({});
       const mealsInfo = await mealModel.find({userId:req.userId}).sort({mealDate:-1})
       //.limit(LIMIT).skip(startIndex);
    //   console.log("total meal: ",mealsInfo);
       res.status(200).json({ data: mealsInfo, currentPage: Number(page) })
   } catch (error) {
       console.log("Error in getAllMeals",error);
       res.status(500).json({ message:"Error in getAllMeals", error: error })
   }
}

// export const getMealById = async (req,res) =>{
//     // desrturcure id from req.params
//     const {id} = req.params;
//     // end of destructuring

//     // Fetching meal info by id and sending data
//     try {
//         const meal = await mealModel.findById({_id:id});
//         if(!meal){
//             return res.status(400).json({
//                 message:"No meal Found"
//             })
//         }
//         res.status(200).json(meal);
//     } catch (error) {
//         console.log("welcome to error in getMealById",error);
//         res.status(500).json({ message:"Error in Fetchting meal by id:", error: error })
//     }
//     // end of fetching meal info

// }

export const createMeal = async (req,res) =>{
    // start of destructring the req.body
   // console.log("req.body",req.body);
    const {mealName, mealType, mealCalories, mealDescription,mealDate} = req.body;
    // end of destructure
    // console.log("req.body: ",req.body)
    // start of create meal into DB
      try {
          const mealInfo = new mealModel({ mealName, mealType, mealCalories, mealDescription,mealDate,userId:req.userId })
       //   console.log("meal Info:  ",mealInfo);
          const savedMeal= await mealModel.create(mealInfo);
     //     console.log("Saved Meal is:",savedMeal);
          res.status(201).json({ data: savedMeal, message: "Successfull created Meal" })
          
      } catch (error) {
          console.log("Welcome to Error in createMeal",error);
          res.status(500).josn({ message:"Error in create Meal", error: error })
      }
    //end of create meal
}

export const deleteMealById = async (req,res) =>{
    const {id}= req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({
                message:"Either Id is Invalid or No meal found with ID"
            })
        }
        await mealModel.findByIdAndRemove(id);
        res.status(200).json({
            message:"Successfully Meal deleted"
        })
    } catch (error) {
        console.log("Welcome to Error in deleteMealById",error);
        res.status(500).josn({ message:"Error in deleteMealById", error: error })
    }
}

export const updateMealById = async (req,res) =>{
    const {id}= req.params;
    const { mealName,mealType,mealDescription,mealCalories,mealDate} = req.body;
    try {
        // console.log("Enter try block")
        if(!mongoose.Types.ObjectId.isValid(id)){ return res.status(404).json({ message:"Either Id is Invlid or No meal Found with Id" }) }
         //console.log("After types checking")
        const updatedMeal ={ mealName, mealType, mealDescription, mealCalories, _id: id }
    //    console.log(updatedMeal)
       await mealModel.findByIdAndUpdate( id, updatedMeal, { new: true, runValidators:true } )
       res.status(201).json({ message:"Successfully Update meal", data: updatedMeal })

    } catch (error) {
        console.log("Welcome to Error in updateMealById",error);
        res.status(500).josn({ message:"Error in updateMealById", error: error })
    }
}

export const getUserMealInfo = async(req,res)=>{

    try {
        // console.log("I am called");
          const userMealInfo= await mealModel.aggregate([
              {$match:{
                  userId: req.userId
              }},
              {$group:{
                  _id: "$mealDate",
                  totalCalories: {$sum:"$mealCalories"},
                  count:{$sum: 1}
              }}
          ])
          const userCalorieInfo = await userModel.findById({_id:req.userId});
        //   console.log("Meal data fetched from db", userMealInfo);
        //   console.log("User data fetched from db", userCalorieInfo);
          res.status(200).json({
              userData: userMealInfo,   // it is array and have information about Date, totalCalories on Date and total meal
              userMaxCalorie: userCalorieInfo.userMaxCalorie,  // it have user max calorie on that day
              message:"Succesfully take the data"  // message 
          })    
    } catch (error) {
        console.log("welcome to the error",error);
        res.status(404).json({
            message:`Error Ocuured; ${error}`
        })       
    }
}