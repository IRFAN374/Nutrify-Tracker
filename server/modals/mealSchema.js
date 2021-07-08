import mongoose from 'mongoose';

const mealSchema = mongoose.Schema({
    mealName: {
        type: String,
        required: true
    },
    mealType:{
        type: String,
        required: true
    },
    mealCalories:{
        type: Number,
        required: true
    },
    mealDescription:{
        type: String,
        required: true
    },
    userId: {
        type:String
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
    mealDate:{
        type: Date,
        default: new Date().getDate()
    }
})

export default mongoose.model("mealModel",mealSchema);


/**
 * 1. id: default provide by mongoodb
 * 2. mealName: Name of Food -- String
 * 3. mealType: Lunch,BreakFast,Dinner,Snakes --  String
 * 4. mealCalorie-  Food calorie --- Number
 * 5. createdAt: Time at which food consumed --- Date
 * 6. userId: Food consume by User  --- string (save from token)
 * 7. Date: on Which food is consumed
 * 8: Description: Food Description -- String
 */