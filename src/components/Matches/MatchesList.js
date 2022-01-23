import React from "react";
import { Box, Typography } from '@mui/material';
import { NodeGroup } from "react-move";
import { easePolyOut } from "d3-ease";

const MatchesList = (props) => {

    return (
        <Box>
            <NodeGroup
                data={props.filteredMatches}
                keyAccessor={d => d.id}
                start={() => ({
                    opacity: 0,
                    x: -200
                })}
                enter={(d, i) => ({
                    opacity: [1],
                    x: [0],
                    timing: { duration: 500, delay: i * 50, ease: easePolyOut }
                })}
                update={(d, i) => ({
                    opacity: [1],
                    x: [0],
                    timing: { duration: 500, delay: i * 50, ease: easePolyOut }
                })}
                leave={(d, i) => ({
                    opacity: [0],
                    x: [-200],
                    timing: { duration: 500, delay: i * 50, ease: easePolyOut }
                })}
            >
                {(nodes) => (
                    <Box>
                        {nodes.map(({ key, data, state: { opacity, x } }) => (
                            <Box
                                key={key}
                                className='match_box_big'
                                sx={{
                                    opacity,
                                    transform: `translateX(${x}px)`
                                }}
                            >
                                <Box className='block_wraper'>
                                    <Box className='block'>
                                        <Box className='icon' component='img'
                                            src={require(`../../assets/images/team_icons/${data.localThmb}.png`)} />
                                        <Box className='team'>{data.local}</Box>
                                        <Box className='result'>{data.resultLocal}</Box>
                                    </Box>
                                    <Box className='block'>
                                        <Box className='icon' component='img'
                                            src={require(`../../assets/images/team_icons/${data.awayThmb}.png`)} />
                                        <Box className='team'>{data.away}</Box>
                                        <Box className='result'>{data.resultAway}</Box>
                                    </Box>
                                </Box>
                                <Box className='block_wraper nfo'>
                                    <Box>
                                        <Typography component='strong'>Date:</Typography>
                                        {data.date}
                                    </Box>
                                    <Box>
                                        <Typography component='strong'>Stadium:</Typography>
                                        {data.stadium}
                                    </Box>
                                    <Box>
                                        <Typography component='strong'>Referee:</Typography>
                                        {data.referee}
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                )}
            </NodeGroup>
        </Box >
    );
}

export default MatchesList;