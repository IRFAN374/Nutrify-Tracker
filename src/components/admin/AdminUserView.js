import React from 'react';
import {Divider,Grid,Container,CircularProgress,AppBar,IconButton,Toolbar} from "@material-ui/core"
import AdminDash from './AdminDash';
import { useSelector } from 'react-redux';
import TodayIcon from '@material-ui/icons/Today';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

import Meal from '../Meal/SingleMeal/Meal';
import moment from 'moment';

const AdminUserView = () => {
    const {mealInfos,isLoading} = useSelector((state)=>state.admin);
    console.log(" meal infos in Admin User views: ",mealInfos);
    const {userMealsDetails} = mealInfos;
    // console.log("mealInfo message", mealInfos.message);
    // console.log("mealInfo details", mealInfos.userMealsDetails);

    /**
     * Structure of MealInfos
     * mealInfos:{
     *   message: "Some Message"
     *   userMealDetails:[  //Group By date --- size of Array === Number Of Day Meal Taken By User
     *      obj1:{
     *         _id: "MealDate",
     *         totalCalorieOnDate: Number,
     *         totalMealOnDate: Number,
     *         mealInfoDate:[   size of Array === Number of Meal Taken By User on Particualer Date===_id
     *            { * MealName, MealType, MealDescription, MealCalories, mealCreatedAt * },
     *            { * MealName, MealType, MealDescription, MealCalories, mealCreatedAt * }
     *         ]
     *      },
     *      obj2:{
     *         _id: "MealDate",
     *         totalCalorieOnDate: Number,
     *         totalMealOnDate: Number,
     *         mealInfoDate:[   size of Array === Number of Meal Taken By User on Particualer Date===_id
     *            { * MealName, MealType, MealDescription, MealCalories, mealCreatedAt * },
     *            { * MealName, MealType, MealDescription, MealCalories, mealCreatedAt * }
     *         ]
     *      },
     *   ]     
     * }
     */

    if(!isLoading && !mealInfos.userMealsDetails){
        return <h1>No Meal History Exist of User</h1>
    }

    return (
        <Container maxWidth="xl">
            <Grid spacing={3} alignItems="stretch" container justify='space-between'>
                <Grid item xs={12} sm={6} md={3}>
                    <AdminDash/>
                </Grid>
                <Grid item xs={12} sm={6} md={9}>
                    { isLoading? (<> <CircularProgress/> <h1>I am Loading ....</h1> </>):(
                        userMealsDetails.map((info)=>(
                        <Container>
                        <AppBar position="relative" style={{color:"white",backgroundColor:"graytext"}}>
                            <Toolbar>
                                <IconButton edge="start"  color="inherit" >
                                    <TodayIcon color="secondary"  /> {moment(info._id).format('DD/MM/YYYY')}
                                </IconButton>
                                <IconButton color="inherit">
                                    <LocalDiningIcon color="secondary" /> {info.totalMealOnDate}
                                </IconButton>
                                <IconButton color="inherit" >
                                    <AssignmentTurnedInIcon color="secondary" /> {info.totalCaloriesOnDate}
                                </IconButton>
                            </Toolbar>
                         </AppBar>
                         <Divider /><hr></hr>
                         <Grid  container alignItems="stretch" spacing={3}>
                             {info.mealInfoDate.map((meal)=>(
                                 <Grid key={meal._id} item xs={12} sm={6} md={4}>
                                     <Meal meal={meal} />
                                 </Grid>
                             ))}
                         </Grid> 
                         <hr></hr>
                         </Container> 

                        ))
                    )}
                    
                </Grid>
            </Grid>
        </Container> 
    );
};

export default AdminUserView;