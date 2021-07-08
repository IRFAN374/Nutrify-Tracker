import React, { useEffect, useState } from 'react';
import { Paper, Typography,Container ,Button, TextField, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Grid, }from '@material-ui/core';

import useStyles from './createMealStyles'
import DashBoard from './DashBoard';
import Profile from './Profile';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {createMeal,updateMeal} from '../../redux'
const initialState = {
    mealName:'',
    mealType:'',
    mealDescription:'',
    mealDate:'',
    mealCalories:'',
}

const CreateMeal = ({currentId, setCurrentId}) => {
    const [mealForm, setMealForm ] = useState(initialState);
    const classes = useStyles()
    const dispatch = useDispatch();
    const history = useHistory();
    const mealInfo = useSelector((state)=>(currentId ? state.meal.meals.find((meal)=>meal._id===currentId): null));

    // console.log("mealInfo",mealInfo);

    useEffect(()=>{
       if(mealInfo) setMealForm(mealInfo);
    },[mealInfo])

    const handleSubmit = (event)=>{
        event.preventDefault();
        if(currentId === 0){
            dispatch(createMeal(mealForm,history));
            history.push('/meals')
        }else {
            dispatch(updateMeal(currentId,mealForm,history));  
            history.push('/meals'); 
        }
        clear();
    }
    const clear = () =>{
        setCurrentId(0);
        setMealForm(initialState)
    }
    return (
        <Container maxWidth="xl">
            <Grid className={classes.gridContainer} spacing={3} alignItems="stretch" container justify='space-between'>
            <Grid  item xs={12} sm={4} md={3}>
               <DashBoard />
            </Grid>
            <Grid item xs={12} sm={4} md={6}>
                <Paper className={classes.paper} elevation={6} >
                    <form className={`${classes.root} ${classes.form}`} autoComplete="off" noValidate onSubmit={handleSubmit}>
                        
                        <Typography variant="h6">
                            {currentId? 
                            `Update MealName: ${mealInfo.mealName}`
                            : 'Add New Meal'}
                        </Typography>
                        <Button style={{marginLeft: '20px'}} variant="contained"  color="secondary"  onClick={()=>setCurrentId(0)}>Reset</Button>
                        <TextField name='mealDate' fullWidth value={mealForm.mealDate} type='date' variant='outlined' onChange={(event)=>setMealForm({...mealForm,mealDate: event.target.value})} />
                        
                        <TextField name="mealName" variant="outlined" label="Meal Name" fullWidth value={mealForm.mealName} onChange={(e) => setMealForm({ ...mealForm, mealName: e.target.value })} />
                        <TextField name="mealDescription" multiline rows={4} variant="outlined" label="Meal Description" fullWidth value={mealForm.mealDescription} onChange={(e) => setMealForm({ ...mealForm, mealDescription: e.target.value })} />
                        <FormControl className={classes.field}>
                            <FormLabel color="secondary">Meal Cateogry</FormLabel>
                            <RadioGroup value={mealForm.mealType} onChange={(event)=>setMealForm({...mealForm,mealType:event.target.value})}>
                                <FormControlLabel value="BreakFast" control={<Radio/>} label="BreakFast"/>
                                <FormControlLabel value="Lunch" control={<Radio/>} label="Lunch"/>
                                <FormControlLabel value="Dinner" control={<Radio/>} label="Dinner"/>
                                <FormControlLabel value="Other" control={<Radio/>} label="Other"/>
                            </RadioGroup>
                        </FormControl>
                        <TextField type="number" name="mealCalories" variant="outlined" label="Meal Calories" fullWidth value={mealForm.mealCalories} onChange={(e) => setMealForm({ ...mealForm, mealCalories: e.target.value })} />
                        
                        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
                           {currentId ? `Update`: `Submit`}
                        </Button>
                        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

                    </form>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
                <Profile/>
            </Grid>
            </Grid>
        </Container>
    );
};

export default CreateMeal;