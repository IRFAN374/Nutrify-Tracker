import { AUTH ,START_LOADING,END_LOADING} from "./userConstants";
import * as api from '../../api/index.js';

export const signIn = (formData,router) => async(dispatch)=>{
    try {
        dispatch({type:START_LOADING})
        const { data } = await api.signIn(formData);
        
        dispatch({
            type:AUTH,
            payload:data
        })
        router.push('/meals');
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log("Error in SignIn Action:",error); 
    }

}
export const signUp = (formData,router) => async(dispatch)=>{
   try {
       dispatch({type:START_LOADING})
       const {data} = await api.signUp(formData);
       console.log("Data received from server", data);
       router.push('/meals');
       dispatch({
           type:AUTH,
           payload: data
       })
       dispatch({type:END_LOADING})
       
   } catch (error) {
       console.log("Error in SignUp Action:",error);
   }   
}
