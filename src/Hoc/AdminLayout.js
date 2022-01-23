import React from "react";
import { Box } from '@mui/material';
import AdminNav from './../components/Admin/nav/AdminNav';

const AdminLayout = (props) => {
    return (
        <Box className='admin_container'>
            <Box className='admin_left_nav'>
                <AdminNav />
            </Box>
            <Box className='admin_right'>{props.children}</Box>
        </Box>
    );
}
 
export default AdminLayout;