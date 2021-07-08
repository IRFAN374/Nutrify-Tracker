import React, { useState,useEffect } from 'react';
import {Paper, AppBar,TextField,Button,Divider,CircularProgress,Grid,Typography} from '@material-ui/core'
import {useSelector,useDispatch} from 'react-redux'
import useStyles from './profileStyles';
import {getUserMealInfo} from '../../redux';
import ProfileInfo from './ProfileInfo';
import moment from 'moment';

const Profile = () => {
    const [search, setSearch] = useState('');
    const classes = useStyles();
    const dispatch = useDispatch();
    const [date,setDate] = useState(new Date());
    const {isLoading,userInfo,userMaxCalorie} = useSelector((state)=>state.meal)
    
    const [newRecords,setNewRecords] = useState(userInfo.find((records)=>moment(records._id).format('DD/MM/YYYY') === moment(date).format('DD/MM/YYYY')));
    // console.log("user Info",userInfo);
    // console.log("Loading ", isLoading);
    // console.log("max Calorie", userMaxCalorie);

//     var formatedDate = `${date.getDate()+1}/${date.getMonth()}/${date.getFullYear()}`
//    console.log("Date is",formatedDate);
    //  console.log("Date is data Array",data[0])
    const searchMeal=()=>{

    }
    const handleKeyPress = ()=>{

    }
    useEffect(()=>{
      dispatch(getUserMealInfo());     
    },[])
    // if(!isLoading){
    //      <h1>Loading ---</h1>
    // }
    let todayRecords = userInfo.find((records)=>moment(records._id).format('DD/MM/YYYY') === moment(date).format('DD/MM/YYYY'));
    useEffect(()=>{
        todayRecords = userInfo.find((records)=>moment(records._id).format('DD/MM/YYYY') === moment(date).format('DD/MM/YYYY'));
    },[todayRecords])
    // if(!todayRecords){
    //     return<h1>No Records founds for Today</h1>
    // }
    //console.log("today ",todayRecords)
    return (
        // Start of user Profile info ,it display number of foods, Calorie Taken on Day, Max Calorie and Chart Bar
        isLoading?(<><CircularProgress/><h1>loading .....</h1></>):(<Paper className={classes.gridContainer}>
           <AppBar className={classes.appBarSearch} position="static" color="inherit">
               <TextField name='date' fullWidth value={date} type='date' variant='outlined' onChange={(event)=>setDate(event.target.value)} />
              <div>
                {todayRecords?(<Grid key={todayRecords._id}>
                    <ProfileInfo userMaxCalorie={userMaxCalorie}  date={date} records={todayRecords} />
                </Grid>):<Typography variant="h5" color="secondary">* No Records found on Date: {moment(date).format('DD/MM/YYYY')}</Typography>}
             </div>
           </AppBar>   
           <hr/>
           {/* End of user profile info */}
           
           {/* For Search Food on the Basis of mealName */}
           <Divider/>
              <AppBar className={classes.appBarSearch} position="static" color="inherit">
                  <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Food" fullWidth value={search} onChange={(event)=>setSearch(event.target.value)} />
                 <Button className={classes.searchButton} variant="contained" color="primary" onClick={searchMeal} > Search </Button> 
              </AppBar>
            {/* End of Search Food  */}
        </Paper>)
    );
};

export default Profile;