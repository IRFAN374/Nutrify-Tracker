import React from 'react';
import {Container,Box,Grid,Typography} from '@material-ui/core';
import useStyles from './footerStyles';

const Footer = () => {
    const classes = useStyles();
    return (
        <footer>
            <Container maxWidth="xl">
              <Grid className={classes.footer} container spacing={5} elevation={6}>
                 <Grid item xs={12}>
                 <Typography variant="h4" component="h6" >Design and Developed By: Md Irfan</Typography>
                <Typography variant="h6" component="h6" >Copyright © AddSkill Project : Nutrify Tracker </Typography>
                 </Grid>
              </Grid>
            </Container>
        </footer>
    );
};

export default Footer;