import React from 'react';
import {List,ListItem,ListItemIcon,ListItemText,Typography,Paper,Container} from "@material-ui/core";
import PeopleIcon from '@material-ui/icons/People';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme)=>({
    active:{
        background: '#d3d8d6'
    }
}));

const AdminDash = () => {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    
    const adminMenus =[
        { txt:"User List", icon:<PeopleIcon color="secondary" />  ,path:"/admin"},
        { txt:"Profile", icon:<AccountBoxIcon color="secondary" />,path:"/profile"},
    ]
    return (
        <Paper>
            <Container maxWidth="sm">
            <Typography variant="h5" color="initial" component='h6'> Admin DashBoard </Typography>
            <List>
                {
                    adminMenus.map((menu)=>{
                        const { txt, icon, path} = menu
                        return (
                            <ListItem key={path} button className={location.pathname === path ? classes.active:null} onClick={()=>history.push(path)}>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText>{txt}</ListItemText>
                            </ListItem>
                        )
                    })
                }
            </List>
            </Container>
        </Paper>
    );
};

export default AdminDash;