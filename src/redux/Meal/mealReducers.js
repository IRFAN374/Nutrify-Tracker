import {
  FETCH_ALL_MEAL,
  FETCH_MEAL_BY_ID,
  FETCH_MEAL_BY_USER,
  CREATE,
  UPDATE,
  DELETE,
  START_LOADING,
  END_LOADING,
} from './mealConstants';


const initialState ={
    isLoading: true,
    meals:[],
    userInfo:[],
    userMaxCalorie:0
}

const mealReducers = (state = initialState,action)=>{
   switch (action.type) {
       case FETCH_ALL_MEAL:
           return { 
               ...state,
               meals:action.payload.data
           }
        case FETCH_MEAL_BY_USER:
            return {
                ...state,
                userInfo: action.payload.userData,
                userMaxCalorie: action.payload.userMaxCalorie
            }   
       case FETCH_MEAL_BY_ID:
           return { }    
        case CREATE:
            return { 
                ...state,
                // meals:[...state.meals,action.payload]
                meals: state.meals.map((meal)=>(meal._id===action.payload._id ?action.payload:meal))
            } 
        case DELETE:
            return {
                ...state,
                meals: state.meals.filter((meal)=> meal._id!==action.payload )
             }
        case UPDATE:
            return { 
                ...state,
                meals: state.meals.map((meal)=>(meal._id===action.payload._id ?action.payload:meal))
            }  
        case START_LOADING:
            return { 
                ...state,
                isLoading: true
            } 
        case END_LOADING:
            return {
                ...state,
                isLoading: false
             }               
       default:
           return state
   }
}

export default mealReducers;