import { 
    START_LOADING,
    END_LOADING,
    FETCH_USER_DETAILS,
    FETCH_USER_MEAL_DETAILS,
    DELETE_USER,
    FETCH_USER_NAME,
} from './adminConstants';

const intitialState ={
    isLoading: true,
    numOfUser:0,
    userInfos:[],
    mealInfos:{}
}

const adminReducers = (state=intitialState,action)=>{
    switch (action.type) {
        case FETCH_USER_DETAILS:
            return {
                ...state,
                numOfUser: action.payload.totalUser,
                userInfos:action.payload.userDetails
            }
        case FETCH_USER_MEAL_DETAILS:
            return {
                ...state,
                mealInfos: action.payload
            }
        case FETCH_USER_NAME:
            return {
                ...state,
                userInfos: action.payload.userNameList
            }    
        case DELETE_USER:
            return {
                ...state,
                numOfUser: state.numOfUser - 1,
                userInfos: state.userInfos.filter((userId)=> userId._id !==action.payload)
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

export default adminReducers;