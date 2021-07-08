import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {IconButton,TableRow,Paper,Container,Divider,AppBar,Button,TextField ,TableHead, Table ,CircularProgress,TableBody,TableCell,TableContainer } from '@material-ui/core';
import { useDispatch, useSelector} from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import RateReviewIcon from '@material-ui/icons/RateReview';
import {Link,useHistory, useLocation} from 'react-router-dom';


import moment from 'moment';
import {getUserMealDetails,getUserDetails,deleteUserByAdmin,getUserNameByAdmin } from '../../redux';

import useStyles from './styles';

const StyledTableCell = withStyles((theme) => ({
    head: { backgroundColor: theme.palette.common.black, color: theme.palette.common.white, },
    body: { fontSize: 14, },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: { '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover, }, },
  }))(TableRow);

  
/**
 *  userCreatedAt: 2021-07-03T08:44:24.757Z,
    _id: 60e0262e3257604e50d7db54,
    userName: 'shyam Narayan',
    password: '$2a$12$CZBc2wXGB4F5yRbqJP9jYe3vJTsumRJuhLurG0yeq0v95EAmoEgbG',
    email: 'shyam@gmail.com',
    userMaxCalorie: 1200,
 */

function useQuery(){
  return new URLSearchParams(useLocation().search)
}


const ProfileSction = () => {
    // const userDetails = useSelector();
    const [userId,setUserId] = useState(0);
    const history = useHistory();
    const dispatch = useDispatch();
    const classes= useStyles();
    const [ search, setSearch] = useState('');

    const {isLoading,userInfos,numOfUser} = useSelector((state)=>state.admin);
    const userMealInfo = useSelector((state)=>state.admin.mealInfos);
    const query = useQuery();
    const searchQuery = query.get('searchQuery');

    const tableHeader = ["S.No.","UserName","Email","MaxCalorie","DateOfSign","Fetch User Meal","Edit User","Delete User"]
    
    console.log("Loading: ",isLoading);
    console.log("userInfos: ",userInfos);
    console.log("num of users: ",numOfUser);
    console.log("User meal infos: ", userMealInfo);
    
    useEffect(()=>{
       console.log("userId",userId);
       if(userId) {
         dispatch(getUserMealDetails(userId))
         history.push("/userMealAdmin");
        }; 
    },[userId])
    
    const handleKeyPress = (event)=>{
         if(event.keyCode === 13){
           searchUser();
         }
    }
    const searchUser = ()=>{
        if(search.trim()){
          console.log("I am going to be called")
           dispatch(getUserNameByAdmin({search}));
           console.log("After callled")
           history.push(`/admin/search?searchQuery=${search || 'none'}`)
        }else{
          dispatch(getUserDetails());
           history.push('/admin')
        }
    }

    // useEffect(()=>{
    //   userInfos = userInfos.filter((user)=> {
    //     if(user.userName.includes(search)){
    //       return user;
    //     }
    //   })
    // },[search])

    if(!userInfos && !numOfUser && !isLoading){
        return (
            <h1>No User Exist in the DB</h1>
        )
    }
    return (
        isLoading?(<> <CircularProgress /> <h1>Loading....</h1> </>):(
         <Container>
             <Divider/>
              <AppBar className={classes.appBarSearch}  position="static" color="inherit">
                  <TextField onKeyDown={handleKeyPress} name="search" value={search} onChange={(event)=>setSearch(event.target.value)} variant="outlined" label="Search Name" fullWidth   />
                 <Button className={classes.searchButton} variant="contained" color="primary" onClick={searchUser} > Search </Button> 
              </AppBar>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        { tableHeader.map((header)=>( <StyledTableCell align="right">{header}</StyledTableCell> )) }
                    </TableRow>
                </TableHead>
                <TableBody>
                {userInfos.map((row,index) => {
                    const {userName,email,userMaxCalorie,userCreatedAt,_id} = row;
                    return(
                        <StyledTableRow key={_id}>
                            <StyledTableCell component="th" scope="row">
                                {index}
                            </StyledTableCell>
                            <StyledTableCell align="right">{userName}</StyledTableCell>
                            <StyledTableCell align="right">{email}</StyledTableCell>
                            <StyledTableCell align="right">{userMaxCalorie}</StyledTableCell>
                            <StyledTableCell align="right">{moment(userCreatedAt).format('DD/MM/YYYY')}</StyledTableCell>
          
                            <StyledTableCell align="right">
                              <IconButton  onClick={()=>setUserId(_id)}>
                                <RateReviewIcon style={{color:"green"}} /> 
                              </IconButton>
                            </StyledTableCell>
                            
                            <StyledTableCell align="right">
                              <IconButton onClick={()=>setUserId(_id)}>
                                <EditIcon color="primary"/>  
                              </IconButton>
                            </StyledTableCell>
                          
                            <StyledTableCell align="right">
                              <IconButton onClick={()=>dispatch(deleteUserByAdmin(_id))}>
                                <DeleteIcon color="secondary"/> 
                              </IconButton> 
                            </StyledTableCell>
                            
                        </StyledTableRow>
                    )}
                )}
                </TableBody>
                </Table>
            </TableContainer>

         </Container>
        )
    );
};

export default ProfileSction;