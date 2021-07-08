import React from 'react';
import { Container, Paper, Typography,List,
   ListItem,
   ListItemIcon,
   ListItemText
} from '@material-ui/core';
import FastfoodSharpIcon from '@material-ui/icons/FastfoodSharp';
import LocalDiningSharpIcon from '@material-ui/icons/LocalDiningSharp';
import {useHistory,useLocation} from 'react-router-dom';

import usestyles from './dashBoardStyles';

const menuItems = [ 
    { text: 'My Meals', icon: <FastfoodSharpIcon color="secondary"/>, path: '/meals' },
    { text: 'Create Meal', icon: <LocalDiningSharpIcon color="secondary"/>, path: '/create' } 
    ]

const DashBoard = () => {
    const history = useHistory();
    const location = useLocation();
    const classes = usestyles();
    
    return (
        <Paper>
            <Container> 
                <div>
                    <Typography variant="h5" color="initial" component='h6'> DashBoard </Typography>
                </div>
                <List>
                    { menuItems.map((item)=>{
                           const { text, icon, path } = item;
                            return(
                                <ListItem onClick={()=>history.push(path)} className={location.pathname === path ? classes.active: null} button key={item.text}>
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText>{text}</ListItemText>
                                </ListItem>
                            ) }) }
                </List>
            </Container>
        </Paper>
    );
};

export default DashBoard;