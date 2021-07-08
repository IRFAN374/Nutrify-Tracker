import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  footer: {
    borderRadius: 15,
    backgroundColor:'white',
    color:'#010d10',
    textAlign: 'center',
    marginTop: '30px',
    marginBottom: '30px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  } 
}));
