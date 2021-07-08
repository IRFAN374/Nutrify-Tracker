import express from "express";
import {
    getAllMeals,
    // getMealById,
    createMeal,
    deleteMealById,
    updateMealById,
    getUserMealInfo
} from '../controllers/mealControl.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/',auth,getAllMeals);
router.post('/',auth,createMeal);
// router.get('/:id',auth,getMealById);
router.patch('/:id',auth,updateMealById);
router.delete('/:id',auth,deleteMealById);

// total meal query
router.get('/total',auth,getUserMealInfo);


export default router


/**
 * 1. /meal/ --- getAllMeals        get
 * 2. /meal/ --- createMeal         post
 * 3. /meal/:id --- getMealById     get
 * 4. /meal/:id --- editMealById    patch
 * 5. /meal/:id --- deleteMealById  delete 
 * 
 */