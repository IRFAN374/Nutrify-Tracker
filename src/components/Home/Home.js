import React from 'react';
import {Link} from 'react-router-dom'
import { Container,Grid,Typography,Button } from '@material-ui/core';
import FoodImage from '../../images/Home.gif'
import useStyles from './homeStyles';

const Home = () => {
    const classes = useStyles();
    return (
        
           <Container maxWidth="xl" className={classes.container}>
               <img className={classes.image} src={FoodImage} />
               {/* <div className={classes.overlay} /> */}
               <Grid className={classes.overlay}>
                   <Typography variant="h5" component="h6">
                       Nutrify Tracker is Meal Nutrition Calorie Tracker.
                   </Typography>
                   <Typography>
                       For Meal Nutrition , Sign Up Here.
                        <Button component={Link} to="/auth" variant="contained" color="primary">
                            SignUp
                        </Button>
                   </Typography>
               </Grid>
           </Container>
        
    );
};

export default Home;