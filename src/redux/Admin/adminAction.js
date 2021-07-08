import { 
    FETCH_USER_DETAILS,
    START_LOADING,
    END_LOADING,
    FETCH_USER_MEAL_DETAILS,
    DELETE_USER,
    FETCH_USER_NAME,
} from './adminConstants';
import * as api from '../../api/index';

// define function for action perform by admin

export const getUserDetails =()=> async(dispatch)=>{
   try {
       dispatch({type: START_LOADING}); // going to reducers
       const {data} = await api.getUserDetail();
    //    console.log("Data is:",data);
       dispatch({type:FETCH_USER_DETAILS,payload: data}) // dispatching info to reducers
       dispatch({type: END_LOADING})// going to reducers
   } catch (error) {
       console.log("Error in fetching userDetails info from DB")
   }
}

export const getUserMealDetails =(id)=> async(dispatch)=>{
    try {
        dispatch({type:START_LOADING});
        const {data} = await api.getUserMealDetail(id);
        console.log("user Meal Detail in Action",data);
        dispatch({
            type: FETCH_USER_MEAL_DETAILS,
            payload: data
        })
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log("Error in fetching user Meals Details from DB");
    }
}

export const deleteUserByAdmin = (id) => async(dispatch)=>{
    try {
        dispatch({type: START_LOADING});
        await api.deleteUserDetail(id);
        dispatch({type: DELETE_USER, payload:id});
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log("Error in deleting user by Admin");
    }
}

export const getUserNameByAdmin = (search) => async(dispatch)=>{
    try {
        dispatch({type: START_LOADING});
        console.log("Search before API",search);
        const {data} = await api.getUserName(search)
        //const {data} = await api.getUserName(search);
        console.log("info in Admin getUserNameAdmin result",data);
       dispatch({type:FETCH_USER_NAME, payload:data})
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log("Error in fetching userName by Admin");
    }
}

// end of action perform by admin