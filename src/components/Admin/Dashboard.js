import React from "react";
import { Box } from "@mui/system";
import AdminLayout from './../../Hoc/AdminLayout';

const Dashboard = () => {
    return (
        <AdminLayout>
            <Box className='user_dashboard'>
                This is your dashboard
            </Box>
        </AdminLayout>

    );
}

export default Dashboard;