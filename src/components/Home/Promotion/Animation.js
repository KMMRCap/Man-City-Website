import React from "react";
import { Box, Typography } from '@mui/material';
import { Zoom } from "react-awesome-reveal";
import jersey from '../../../assets/images/jersey.jpg'

const Animation = () => {
    return (
        <Box className='promotion_animation'>
            <Box className='left'>
                <Zoom triggerOnce={true}>
                    <Box>
                        <Typography component='span' variant='h1'>Win a</Typography>
                        <Typography component='span' variant='h1'>Jersey</Typography>
                    </Box>
                </Zoom>
            </Box>
            <Box className='right'>
                <Zoom triggerOnce={true}>
                    <Box sx={{ background: `url(${jersey}) no-repeat` }}></Box>
                </Zoom>
            </Box>
        </Box>
    );
}

export default Animation;