import React, { useEffect } from 'react';
import { Grow, Container, Grid } from '@material-ui/core';
import AdminDash from './AdminDash';
import ProfileSction from './ProfileSction';
import { useDispatch } from 'react-redux';

import { getUserDetails } from '../../redux';
const HomeAdmin = () => {
    const dispatch= useDispatch();
    useEffect(()=>{
       dispatch(getUserDetails());
    },[])
    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid spacing={3} alignItems="stretch" container justify='space-between'>
                    <Grid item xs={12} sm={6} md={3} >
                       <AdminDash />
                    </Grid>
                    <Grid item xs={12} sm={6} md={9}>
                        <ProfileSction />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default HomeAdmin;