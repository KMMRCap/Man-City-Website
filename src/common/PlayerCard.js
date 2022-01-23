import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'

const PlayerCard = (props) => {
    return (
        <Box className='player_card_wrapper'>
            <Box
                className='player_card_thmb'
                sx={{ background: `#f2f9ff url(${props.bgImage})` }}></Box>
            <Box className='player_card_nfo'>
                <Box className='player_card_number'>
                    {props.number}
                </Box>
                <Box className='player_card_name'>
                    <Typography comp='span'>{props.name}</Typography>
                    <Typography comp='span'>{props.lastName}</Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default PlayerCard;