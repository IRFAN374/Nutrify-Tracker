// MealAction method exposed to the operation
export {
    getAllMeals,
    getMealById,
    updateMeal,
    createMeal,
    deleteMeal,
    getUserMealInfo,
} from './Meal/mealActions';

// AuthAction method exposed to the operation
export {
  signIn,
  signUp
} from './User/userActions';

// AdminAction method exposed to the operation
export {
  getUserDetails,
  getUserMealDetails,
  deleteUserByAdmin,
  getUserNameByAdmin,
} from './Admin/adminAction'