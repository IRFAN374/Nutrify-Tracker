import { AUTH,LOGOUT,START_LOADING,END_LOADING } from "./userConstants";

const initialState={
   authData:null,
   isLoading:false
}

const userReducers = (state=initialState,action)=>{
   switch (action.type) {
       case AUTH:
           localStorage.setItem('profile',JSON.stringify( { ...action?.payload } ))
           return {
              ...state,
              authData: action.payload
           }
        case LOGOUT:
           localStorage.clear();
            return {
                ...state,
                authData: null
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


export default userReducers;
