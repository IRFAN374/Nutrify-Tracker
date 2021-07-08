import axios from 'axios';


const API = axios.create({
    baseURL: 'http://localhost:5000'
});
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
       req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})

// Connection between backend and front end  for user Authentication
export const signIn = (formData) => API.post('/user/signin',formData);
export const signUp = (formdata) => API.post('/user/signup',formdata);

// end of backend and front end  for user Authentication


// start of connection between backend and frontend for meal information

// export const getAllMeals = (page) => API.get(`/meal?page=${page}`);
export const getAllMeals = () => API.get(`/meal`);
export const getMealById = (id) => API.get(`/meal/${id}`);
export const createMeal = (meal) => API.post(`/meal`,meal);
export const updateMeal = (id,meal) => API.patch(`/meal/${id}`,meal);
export const deleteMeal = (id) => API.delete(`/meal/${id}`);

export const getUserMealInfo = ()=>API.get('/meal/total');// fetching (totalCalories on DayWise and number of meal) which is group by days format ({data:[{date:string,count:int,total:int}],userMaxCalorie,message})
// end of connection beween meal Information

// admin api for fetching data from backend

export const getUserDetail = () => API.get('/admin');
export const getUserMealDetail = (id) =>API.get(`/admin/${id}`);
export const deleteUserDetail = (id) => API.delete(`/admin/${id}`);
export const getUserName  = (searchQuery) => API.get(`/admin/search?searchQuery=${searchQuery.search}`)
//export const getUserName = (searchQuery)=> API.get(`/admin/search?searchQuery=${searchQuery.search}`)
// end of admin api for fetching data from backend
// upload to github