import React,{useEffect} from 'react';
import { Card, CardActions,ButtonBase 
    ,CardContent, CardMedia, Button, Typography,CardHeader,Avatar,
    IconButton,CircularProgress
} from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link, useHistory } from 'react-router-dom'
import moment from 'moment';
import useStyles from './singleMealStyles';
import HomeImage from '../../../images/HomeImage.jpg'
import { useDispatch } from 'react-redux';
import { deleteMeal } from '../../../redux';


const Meal = ({meal,setCurrentId,isLoading}) => {
     console.log("single meal",meal);
    const classes = useStyles()
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const history=  useHistory();
    // if(!user){
    //     return (
    //         <>
    //         <h1>You are Sign Out, Please Sign in ....</h1>
           
    //         </>
    //     )
    // }
   
    return (
       (isLoading && !meal)?(<> <CircularProgress /> </>):( <Card>
            <CardHeader
               avatar={ <Avatar aria-label="recipe" className={classes.avatar} > {meal.mealType[0].toUpperCase()} </Avatar> }
              action={ <IconButton aria-label="settings"> <MoreVertIcon /> </IconButton> }
              title={meal.mealName}
              subheader={`${moment(meal.createdAt).fromNow()} ${moment(meal.mealDate).format('DD/MM/YYYY')}`}
            />
            <CardMedia className={classes.media} image={HomeImage} title={meal.mealName} />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                {meal.mealDescription}
                </Typography>
            </CardContent>
            {/* onClick={() => { setCurrentId(post._id) }} */}
            <CardActions disableSpacing>
                <IconButton aria-label="Edit Meal" color="primary" component={Link} to="/create" onClick={()=>{ setCurrentId(meal._id) }}>
                   <EditIcon />
                </IconButton>
                <IconButton aria-label="delete food" color="secondary" onClick={()=>dispatch(deleteMeal(meal._id))}>
                   <DeleteIcon />
                </IconButton>
                
            </CardActions>

        </Card>)
    );
};

export default Meal;