import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import MatchBlock from "./MatchBlock";
import { firebaseMatches } from '../../../firebase/firebase'
import { arrayReverser, firebaseLooper } from './../../../firebase/FirebaseFunctions';
import { CircularProgress } from "@mui/material";
import { Bounce } from "react-awesome-reveal";

const Blocks = () => {

    const [matches, setMatches] = useState([])

    useEffect(() => {
        firebaseMatches.limitToLast(6).once('value').then((snapshot) => {
            const matches = firebaseLooper(snapshot)
            setMatches(arrayReverser(matches))
        })
    }, [])

    return (
        <Box className='home_matches' sx={{ position: 'relative' }}>
            {matches?.length === 0 ?
                <CircularProgress size={50}
                    sx={{ position: 'absolute', left: '45%', color: 'black', top: '-2rem' }} />
                :
                matches.map((match) => (
                    <Box className='item' key={match.id}>
                        <Bounce triggerOnce={true}>
                            <Box className='wrapper'>
                                <MatchBlock match={match} />
                            </Box>
                        </Bounce>
                    </Box>
                ))
            }
        </Box>
    );
}

export default Blocks;