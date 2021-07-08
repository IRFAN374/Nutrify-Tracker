import {
  FETCH_ALL_MEAL,
  FETCH_MEAL_BY_ID,
  CREATE,
  UPDATE,
  DELETE,
  FETCH_MEAL_BY_USER,
  START_LOADING,
  END_LOADING
} from './mealConstants';

import * as api from '../../api';


export const getAllMeals = () => async(dispatch)=>{
    try {
       dispatch({type: START_LOADING});
      //  console.log("I am called");
      
       const { data } = await api.getAllMeals();
       dispatch({
          type:FETCH_ALL_MEAL,
          payload: data
       })
      //  console.log("data is",data);
      //  console.log("I am again called");
      dispatch({type: END_LOADING});        
    } catch (error) {
        console.log('Error in getAllMeals:',error);
    }
}

export const getMealById = (id) => async(dispatch)=>{
   try {
       
   } catch (error) {
    console.log('Error in getMealById:',error);
   }
}

export const createMeal = (meal,router) => async(dispatch)=>{
   try {
      dispatch({type: START_LOADING})
       const {data} = await api.createMeal(meal);
        console.log('data created in Action meal', data);
       //router.push('/meals')
       dispatch({ type:CREATE, payload:data })
       dispatch({type:END_LOADING})
   } catch (error) {
    console.log('Error in createMeal:',error);
   }
}

export const updateMeal = (id,meal,router) => async(dispatch)=>{
   try {
      dispatch({type:START_LOADING});
       const {data} = await api.updateMeal(id,meal);
      //  console.log("Updated Meal",data);
       router.push('/meals')
       dispatch({
          type:UPDATE,
          payload: data
       })
      dispatch({type:END_LOADING}) 
   } catch (error) {
    console.log('Error in updateMeal:',error);
   }
}

export const deleteMeal = (id) => async(dispatch)=>{
   try {
       //dispatch({type:START_LOADING});
       const { message } = await api.deleteMeal(id);
      //  console.log("after deletion",message);
       dispatch({
          type:DELETE,
          payload: id
       })
   } catch (error) {
    console.log('Error in deleteMeal:',error);
   }
}

export const getUserMealInfo = ()=>async(dispatch)=>{
   try{
      dispatch({type:START_LOADING})
       const {data} = await api.getUserMealInfo();  // calling api which is present in api/index
        console.log("Data fetch of user",data);
       dispatch({
          type:FETCH_MEAL_BY_USER,
          payload: data
       })
      dispatch({type:END_LOADING}) 
   }catch(error){
      console.log('Error occurs',error);
   }
}