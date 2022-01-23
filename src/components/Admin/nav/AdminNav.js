import React from "react";
import { Box, ListItem } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { firebase } from '../../../firebase/firebase'

const AdminNav = () => {

    const links = [
        {
            title: 'Matches',
            linkTo: '/admin-matches'
        },
        {
            title: 'Players',
            linkTo: '/admin-players'
        }
    ]

    const handleLogOut = () => {
        firebase.auth().signOut().then(() => {
            console.log('log out successfully')
        }, (err) => {
            console.log(err, 'log out had errors')
        })
    }

    return (
        <Box className='dashboard-navbar'>
            {links.map((item) => (
                <NavLink to={item.linkTo} key={item.title}>
                    <ListItem button={true}
                        sx={{
                            color: '#fff',
                            fontWeight: '300',
                            borderBottom: '1px solid #353535',
                            padding: '14px 2rem !important',
                        }}>
                        {item.title}
                    </ListItem>
                </NavLink>
            ))}
            <ListItem button={true} onClick={handleLogOut}
                sx={{
                    color: 'red',
                    fontWeight: '300',
                    borderBottom: '1px solid #353535',
                    padding: '14px 2rem !important',
                }}>
                LogOut
            </ListItem>
        </Box>
    );
}

export default AdminNav;