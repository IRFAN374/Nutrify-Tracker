import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {Link, useHistory, useLocation} from 'react-router-dom'
import {  AppBar, Typography,Toolbar,Button,Avatar} from '@material-ui/core';
import BrandLogo from '../../images/BrandLogo.png'
import FoodLogo  from '../../images/FoodLogo.gif';
import useStyles from './NavbarStyles';
import {LOGOUT,END_LOADING} from '../../redux/User/userConstants';
import decode from 'jwt-decode';

const Navbar = () => {
    const classes = useStyles();
    const [user,setUser ]=useState( JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logOutHandler = ()=>{
        
        dispatch({
            type: LOGOUT,
        })
        dispatch({
            type:END_LOADING
        })
        history.push('/auth');
        setUser(null);
    }
    
    useEffect(()=>{
       const token = user?.token;
       if(token){
           const decodedToken = decode(token);
           if(decodedToken.exp * 1000 < new Date().getTime()){
               logOutHandler();
           }
       }
       setUser(JSON.parse(localStorage.getItem('profile')));
       
    },[location,dispatch])


    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
               <img className={classes.image} src={BrandLogo} alt="BrandLogo" height="50px"/>
               <img className={classes.image} src={FoodLogo}  alt="FoodLogo" height="100px"/>
            </Link>
            <Toolbar className={classes.toolbar}>
                {
                    user ? (
                       <div className={classes.profile}>
                           <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.userName.charAt(0)}</Avatar>
                           <Typography className={classes.userName} variant="h6">{user.result.userName}</Typography>
                           <Button  color="primary" variant="contained" component={Link} to="/meals" >My Meal</Button>
                           <Button className={classes.logout} color="secondary" variant="contained" onClick={logOutHandler}>LogOut</Button>
                       </div>
                    ):(

                        <Button component={Link} to="/auth" color="primary" variant ="contained" > SignIn </Button>
                    )
                }
            </Toolbar>

        </AppBar>
    );
};

export default Navbar;