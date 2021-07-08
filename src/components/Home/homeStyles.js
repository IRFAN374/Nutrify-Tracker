import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles ( (theme)=>({
    image:{
       marginLeft: '-5px',
       marginRight: '-5px',
       width: '100%',
       height: '550px',
       border: '5px solid white',
       borderRadius: '20px' ,  
    },
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      },
    overlay: {
        color:'#1f0303',
        position: 'absolute',
        top: '75%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        //transform: translate('-50%', '-50%'),
        backgroundColor: 'rgb(210 181 181 / 43%)',
        marginBottom: '5px'
      },
      container: {
        position: 'relative',
        textAlign: 'center',
        color: 'white'
      }
})); 