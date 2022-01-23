import React, { useState } from "react";
import { Box } from "@mui/system";
import { easePolyOut } from "d3-ease";
import { Animate } from "react-move";
import otamendi from '../../../assets/images/players/Otamendi.png'
import PlayerCard from './../../../common/PlayerCard';

const Cards = (props) => {

    const [cards] = useState([
        { bottom: 15, left: 45 },
        { bottom: 10, left: 30 },
        { bottom: 5, left: 15 },
        { bottom: 0, left: 0 },
    ])
    return (
        <Box>
            {cards.map((card, index) => (
                <Animate
                    key={index}
                    show={props.show}
                    start={{
                        left: 0,
                        bottom: 0
                    }}
                    enter={{
                        left: [card.left],
                        bottom: [card.bottom],
                        timing: { delay: 500, duration: 1000, ease: easePolyOut }
                    }}>
                    {({ left, bottom }) => (
                        <Box sx={{ position: 'absolute', left:`${left}%`, bottom:`${bottom}%` }}>
                            <PlayerCard
                                bgImage={otamendi}
                                number='30'
                                name='Nicolas'
                                lastName='Otamendi' />
                        </Box>
                    )}
                </Animate>
            ))
            }
        </Box >
    );
}

export default Cards;