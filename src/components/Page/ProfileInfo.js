import React,{useEffect, useState} from 'react';
import moment from 'moment';

import TodayTwoToneIcon from '@material-ui/icons/TodayTwoTone';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import StorageIcon from '@material-ui/icons/Storage';
import {List,ListItem,ListItemIcon,ListItemText,Box,Typography,CircularProgress} from '@material-ui/core'
import { makeStyles} from '@material-ui/core/styles';

// const iniitalValue ={
//     maxCalorie: 120,
//     todayCalorie:30
// }

  
const useStyles = makeStyles((theme) => ({
    root: { position: 'relative', },
    bottom: { color: 'green', },
    top: { color: 'darkorange', animationDuration: '550ms', position: 'absolute', left: 0, },
    circle: { strokeLinecap: 'round', },
  }));
  
  function CircularProgressLabel(props) {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" className={classes.bottom} size={150} thickness={2} {...props} value={100} />
            <CircularProgress variant="determinate" disableShrink className={classes.top} classes={{ circle: classes.circle, }} size={150} thickness={2} {...props} />
            <Box top={0} left={0} bottom={0} right={0} position="absolute" display="flex" alignItems="center" justifyContent="center" >
                <Typography color="primary" variant="h4" style={{marginLeft:"40px"}} component="h5">
                    {`${Math.round( props.value, )}%`}
                </Typography>
            </Box>
        </Box> 
      </div>
    );
  }
  

const ProfileInfo = ({records,userMaxCalorie}) => {
    
   
    const [progress, setProgress] = useState(0);
   
    const newRecords =[
       { txt:"Date:",info: moment(records._id).format('DD/MM/YYYY'), icon:<TodayTwoToneIcon color="secondary" />},
       { txt:"Total Meal",info: records.count, icon:<FastfoodIcon color="secondary" /> },
       { txt:"Total Calories",info: records.totalCalories, icon:<CheckBoxIcon color="secondary"/>},
       { txt:"Max Calories",info: userMaxCalorie, icon: <StorageIcon color="secondary" /> }
    ]

    useEffect(()=>{
        setProgress({
            ...progress,
            todayCalorie: Math.round((records.totalCalories/userMaxCalorie)*100)
        })
    },[records])
    

    return (
        <div>
            <List key={records._id}>
                <CircularProgressLabel style={{marginLeft:"40px"}} value={progress.todayCalorie} />
                <br />
                {
                    newRecords.map((news)=>{
                        const {txt,info,icon} = news;
                        return (
                            <ListItem>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText>{txt}</ListItemText>
                                <ListItemText>{info}</ListItemText>
                            </ListItem>
                        )
                    })
                }   
            </List>
            
        </div>
    );
};

export default ProfileInfo;