import React from 'react';
import {Grid,Container} from "@material-ui/core"
import AdminDash from './AdminDash';
const AdminProfile = () => {
    return (
        <Container maxWidth="xl">
            <Grid spacing={3} alignItems="stretch" container justify='space-between'>
                <Grid item xs={12} sm={6} md={3}>
                    <AdminDash/>
                </Grid>
                <Grid item xs={12} sm={6} md={9}>
                    <h1>Admin profile info is coming soon....</h1>
                </Grid>
            </Grid>
        </Container>        
    );
};

export default AdminProfile;