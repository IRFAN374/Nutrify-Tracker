import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {GoogleLogin}  from 'react-google-login';
import Input from './Input';
import Icon from './Icon';

import useStyles from './authStyles';
import {AUTH} from '../../redux/User/userConstants'
import {signIn,signUp} from '../../redux'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword:'', maxCalories:'', }

const Auth = () => {
    const classes = useStyles();
    const [form, setForm] = useState(initialState);
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmitForm =(event)=>{
        event.preventDefault();
        // console.log("Form data is:",form);
        // console.log("i am ccliked")
        if(isSignUp){
           dispatch(signUp(form,history))
        }else{
           dispatch(signIn(form,history));
        }
        setForm(initialState);
    }

    // start of switch mode from signIn to signUp
    const switchMode = ()=>{
        setForm(initialState);
        setIsSignUp((prevIsSignUp)=>!prevIsSignUp);
        setShowPassword(false);
    }
    // end of Switch Mode
   
    // input change handler
    const handleChange = (event)=>{
       setForm({
           ...form,
           [event.target.name]: event.target.value
       })
    }
    // end of input change handler

    // show password handler 
    const handleShowPassword=()=>{
       setShowPassword((prevShowPassword)=>!prevShowPassword);
    }
    // end of show password
    // email: "irfanmd2503@gmail.com"
    // familyName: "Md"
    // givenName: "Irfan"
    // googleId: "116171827829275035070"
    // imageUrl: "https://lh3.googleusercontent.com/a-/AOh14GiTF1m8w79PdV8uAlHEFQwYxPJp58drjJ4Oorc7ug=s96-c"
    // name: "Irfan Md"
    // start of google sign in authentication
    const googleSuccess= async(res)=>{
       console.log(res);
       const result =  res?.profileObj;
    //    console.log("result is:",result);
       setForm({ ...form, firstName: result.familyName, lastName: result.givenName, email: result.email, password:result.email, confirmPassword: result.email, maxCalories:100 })
    //    console.log("Form Now",form);
       const token = res?.tokenId;
       try {
        setForm({ ...form, firstName: result.familyName, lastName: result.givenName, email: result.email, password:result.email, confirmPassword: result.email, maxCalories:100 })
        dispatch(signUp(form,history))
        history.push('/meals');           
       } catch (error) {
           console.log("Error in google Success",error);
       }
       setForm(initialState);
    }
    // end of google Sign authentication on Success

    // google sign in error when authentication failed
    const googleError =()=>{
        alert("Google Sign In was unsuccessfull, please try again")
    }
    // end of google sign Error  Authentication

    return (
        <Container component="main" maxWidth="xs">
          <Paper elevation={3} className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
               {isSignUp ? 'Sign Up' : 'Sign In'}
            </Typography>
            <form className={classes.form} onSubmit={handleSubmitForm}>
               <Grid container spacing={2}>
                  { isSignUp && (
                          <>
                            <Input name= "firstName" label="First Name" handleChange={handleChange} autoFocus half />
                            <Input name= "lastName" label="Last Name" handleChange={handleChange} half />
                          </>
                      ) }
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />  
                    <Input name="password" label ="Password" handleChange={handleChange} type={showPassword? 'text':'password'} handleShowPassword={handleShowPassword} />
                    { isSignUp && ( 
                            <>
                            <Input name="confirmPassword" label="Confrim Password" handleChange={handleChange} type="password" /> 
                            <Input name="maxCalories" label="Max Calorie" handleChange={handleChange} type="number" />
                           </>
                    ) } 
                </Grid>
                <Button className={classes.submit} type ="submit" color="primary" fullWidth variant="contained">
                    {isSignUp? 'Sign Up': 'Sign In'}
                </Button>
                   {/* disabled={renderProps.disabled} */}
                <GoogleLogin 
                  clientId="841567038039-9clq1abgmkk34cf094ad6fr7olas4oms.apps.googleusercontent.com"
                  render={(renderProps)=>(
                      <Button 
                      color="secondary" 
                      fullWidth 
                      variant="contained" 
                      className={classes.googleButton} 
                      onClick={renderProps.onClick} 
                      startIcon={<Icon/>} > 
                      Google Sign In </Button> 
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleError}
                  cookiePolicy="single_host_origin"
                />
                <Grid container justify="flex-end">
                    <Grid item>
                       <Button  variant="contained" onClick={switchMode}>
                           {
                               isSignUp ? 'Already have an Acoount? Sign In':
                                          "Don't have an account? Sign Up "
                           }
                       </Button>
                    </Grid>
                </Grid>

            </form>
          </Paper>
         
        </Container>
    );
};

export default Auth;