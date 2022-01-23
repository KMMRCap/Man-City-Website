import { Avatar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import logo from './../assets/images/logos/manchester_city_logo.png'

const Logo = (props) => {
    return (
        <>
            {props.link ?
                <Link to={props.path}>
                    <Avatar
                        alt="Remy Sharp"
                        src={logo}
                        sx={{ width: '4rem', height: '4rem', textAlign: 'center' }} />
                </Link>
                :
                <Avatar
                    alt="Remy Sharp"
                    src={logo}
                    sx={{ width: '4rem', height: '4rem', textAlign: 'center' }} />
            }
        </>
    );
}

export default Logo;