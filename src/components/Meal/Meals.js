import React, { useState } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Meal from './SingleMeal/Meal';
import useStyles from './mealStyles';


const Meals = ({setCurrentId}) => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const { meals,isLoading} = useSelector((state)=>state.meal)
    //  console.log("meal Info",meals);
    //  console.log("isLoading Value",isLoading)
    // const mealsDataLength = meals.length;
    // console.log("mealsData", mealsDataLength)
   
    if(!meals.length && !isLoading){
        return <h1>No Meal Exist, Please Create Your Meal</h1>
    }
    if(!user && !isLoading){
        return (
             <h1>Hey There, Please Sign In for create Meal...</h1>
        )
    }
  // Go only user exist add condition
    return (
       (isLoading && !meals)?<CircularProgress/>:(
        <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
            {meals.map((meal) => (
                <Grid key={meal._id} item xs={12} sm={12} md={6} lg={6}>
                    <Meal meal={meal} isLoading={isLoading} setCurrentId={setCurrentId}/>
                </Grid>
            ))}
        </Grid>)
    );
};

export default Meals;