import {combineReducers} from 'redux';

import mealReducers from './Meal/mealReducers';
import userReducers from './User/userReducers';
import adminReducers from './Admin/adminReducers';

const rootReducers = combineReducers({
    meal: mealReducers,
    auth: userReducers,
    admin: adminReducers
})

export default rootReducers;