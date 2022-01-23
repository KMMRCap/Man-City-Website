import React from "react";
import { Box } from "@mui/system";
import { Avatar } from '@mui/material';

const MatchBlock = ({ match }) => {
    return (
        <Box className='match_block'>
            <Box className='match_date'>
                {match.final === 'Yes' ? match.date : `Match start date: ${match.date}`}
            </Box>
            <Box className='match_wrapper'>
                <Box className='match_top'>
                    <Box className='left'>
                        <Avatar
                            alt='pic'
                            className='icon'
                            src={require(`../../../assets/images/team_icons/${match.localThmb}.png`)} />
                            <Box className='team_name'>{match.local}</Box>
                    </Box>
                    <Box className='right'>
                        {match.final === 'Yes' ? match.resultLocal : '-'}
                    </Box>
                </Box>
                <Box className='match_bottom'>
                <Box className='left'>
                        <Avatar
                            alt='pic'
                            className='icon'
                            src={require(`../../../assets/images/team_icons/${match.awayThmb}.png`)} />
                            <Box className='team_name'>{match.away}</Box>
                    </Box>
                    <Box className='right'>
                        {match.final === 'Yes' ? match.resultAway : '-'}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default MatchBlock;