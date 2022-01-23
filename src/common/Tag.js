import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Tag = (props) => {
    return (
        <>
            {props.link ?
                <Link to={props.path}>
                    <Typography sx={{
                        padding: '5px 10px',
                        display: 'inline-block',
                        fontFamily: 'cursive',
                        color: props.color,
                        background: props.bgColor,
                        boxShadow: '0 0 5px 0px #333',
                        ...props.add
                    }} variant={props.size} component={props.comp}>{props.children}</Typography>
                </Link>
                :
                <Typography sx={{
                    padding: '5px 10px',
                    display: 'inline-block',
                    fontFamily: 'cursive',
                    color: props.color,
                    background: props.bgColor,
                    ...props.add
                }} variant={props.size} component={props.comp}>{props.children}</Typography>}
        </>
    );
}

export default Tag;