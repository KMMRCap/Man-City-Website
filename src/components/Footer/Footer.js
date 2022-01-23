import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Logo from './../../common/Logo';

const Footer = (props) => {
    return (
        <Box component='footer' className='bck_blue'>
            <Logo />
            <Box className='footer_discl'>
                <Typography variant='span'>Manchester City 2022 All Rights Reserved</Typography>
            </Box>
        </Box>
    );
}

export default Footer;