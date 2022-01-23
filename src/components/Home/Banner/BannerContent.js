import React from "react";
import { Box } from "@mui/material";
import { Animate } from "react-move";
import { easePolyOut } from 'd3-ease';
import player from '../../../assets/images/featured_player.png'

const BannerContent = () => {
    return (
        <Box className="featured_text">
            <Animate
                show={true}
                start={{
                    opacity: 0,
                    rotate: 0
                }}
                enter={{
                    opacity: [1],
                    rotate: [360],
                    timing: { delay: 500, duration: 1000, ease: easePolyOut }
                }}
            >
                {({ opacity, rotate }) => (
                    <Box
                        className="featured_number"
                        sx={{
                            opacity,
                            transform: `rotateY(${rotate}deg)`
                        }}>3</Box>
                )}
            </Animate>
            <Animate
                show={true}
                start={{
                    opacity: 0
                }}
                enter={{
                    opacity: [1],
                    timing: { delay: 500, duration: 1000, ease: easePolyOut }
                }}
            >
                {({ opacity }) => (
                    <Box
                        className="featured_player"
                        sx={{
                            opacity,
                            background: `url(${player})`
                        }}></Box>
                )}
            </Animate>
            <Animate
                show={true}
                start={{
                    opacity: 0,
                    right: 100
                }}
                enter={{
                    opacity: [1],
                    right: [0],
                    timing: { delay: 500, duration: 1000, ease: easePolyOut }
                }}
            >
                {({ opacity, right }) => (
                    <Box
                        className='featured_first'
                        sx={{
                            opacity,
                            transform: `translateX(${right}%)`
                        }}>League</Box>
                )}
            </Animate>
            <Animate
                show={true}
                start={{
                    opacity: 0,
                    right: 100
                }}
                enter={{
                    opacity: [1],
                    right: [0],
                    timing: { delay: 500, duration: 1000, ease: easePolyOut }
                }}
            >
                {({ opacity, right }) => (
                    <Box
                        className='featured_first'
                        sx={{
                            opacity,
                            transform: `translateX(${right}%)`
                        }}>Championships</Box>
                )}
            </Animate>
        </Box>
    );
}

export default BannerContent;