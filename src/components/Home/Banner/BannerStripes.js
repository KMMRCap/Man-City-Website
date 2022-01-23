import React, { useState } from "react";
import { Box } from "@mui/system";
import { easePolyOut } from "d3-ease";
import { Animate } from "react-move";

const BannerStripes = () => {

    const [stripes] = useState([
        {
            background: '#98c5e9',
            left: 20,
            rotate: 25,
            delay: 0
        },
        {
            background: '#fff',
            left: 40,
            rotate: 25,
            delay: 200
        },
        {
            background: '#98c5e9',
            left: 60,
            rotate: 25,
            delay: 400
        }
    ])

    return (
        <Box className='featured_stripes'>
            {stripes.map((item, index) => (
                <Animate
                    key={index}
                    show={true}
                    start={{
                        background: '#fff',
                        opacity: 0,
                        left: 0,
                        rotate: 0
                    }}
                    enter={{
                        background: () => item.background,
                        opacity: [1],
                        left: [item.left],
                        rotate: [item.rotate],
                        timing: { delay: [item.delay], duration: 500, ease: easePolyOut }
                    }}>
                    {({ background, opacity, left, rotate }) => (
                        <Box className='stripe' sx={{
                            background,
                            opacity,
                            transform: `rotate(${rotate}deg) translateX(-${left}%)`,
                            left: `${left}%`
                        }}></Box>
                    )}
                </Animate>
            ))}
        </Box>
    );
}

export default BannerStripes;