import { Box } from "@mui/system";
import React from "react";
import { Container } from '@mui/material';
import Animation from './Animation';
import Enroll from './Enroll';

const Promotion = () => {
    return (
        <Box className='promotion_wrapper' sx={{background:'#fff'}}>
            <Container>
                <Animation />
                <Enroll />
            </Container>
        </Box>
    );
}
 
export default Promotion;