import React from "react";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import Logo from './../../common/Logo';

const Header = (props) => {
    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#98c5e9', padding: '10px 0' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box className='navbar'>
                    <NavLink to='/'>
                        <Button sx={{ color: 'white' }} variant="text">Home</Button>
                    </NavLink>
                    <NavLink to='/the-team'>
                        <Button sx={{ color: 'white' }} variant="text">The Team</Button>
                    </NavLink>
                    <NavLink to='/matches'>
                        <Button sx={{ color: 'white' }} variant="text">Matches</Button>
                    </NavLink>
                    {props.user ?
                        <NavLink to='/dashboard'>
                            <Button sx={{ color: 'white' }} variant="text">Dashboard</Button>
                        </NavLink>
                        :
                        <NavLink to='/login'>
                            <Button sx={{ color: 'white' }} variant="text">Login</Button>
                        </NavLink>
                    }
                </Box>
                <Logo link={true} path='/' />
            </Toolbar>
        </AppBar>
    );
}

export default Header;