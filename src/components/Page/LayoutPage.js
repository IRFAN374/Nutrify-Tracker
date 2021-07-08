import React, { useEffect, useState } from 'react';
import Meals from '../Meal/Meals';
import DashBoard from './DashBoard';
import CreateMeal from './CreateMeal';
import {  
    Grow, 
    Container,
    Grid,
} from '@material-ui/core';

import useStyles from './layoutStyles';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'

import {getAllMeals} from '../../redux'
import Profile from './Profile';
const LayoutPage = ({currentId, setCurrentId}) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
   // const mealData = useSelector((state)=>state.meal);
  
    useEffect(()=>{
       dispatch(getAllMeals());
    },[dispatch,currentId,setCurrentId])
    if(!user){
       return (
         <h1>Please SignIn or SignUp for Creating Meals</h1>)
    }
    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid className={classes.gridContainer}  spacing={3} alignItems="stretch" container justify='space-between'>
                    <Grid item xs={12} sm={4} md={3}>
                        <DashBoard  />
                    </Grid>
                    <Grid item xs={12} sm={4} md={6}>
                       <Meals setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                        <Profile />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default LayoutPage;