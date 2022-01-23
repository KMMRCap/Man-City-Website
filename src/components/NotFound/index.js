import React from "react";
import { Box, Typography } from '@mui/material';

const NotFound = () => {
    return (
        <Box className='not_found_container'>
            <Typography component='p' sx={{fontSize:'90px'}}>Sorry :|</Typography>
            <Typography component='p' sx={{fontSize:'90px'}}>Page Not Found</Typography>
        </Box>
    );
}
 
export default NotFound;