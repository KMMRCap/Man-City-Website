import React, { useEffect, useState } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material';
import { firebasePlayers, firebase } from '../../firebase/firebase'
import { firebaseLooper } from './../../firebase/FirebaseFunctions';
import stripes from '../../assets/images/stripes.png'
import PlayerCard from '../../common/PlayerCard';
import { Fade } from 'react-awesome-reveal';

const TheTeam = () => {

    const [loading, setLoading] = useState(true);
    const [allPlayers, setAllPlayers] = useState([]);

    useEffect(() => {
        firebasePlayers.once('value').then(snapshot => {
            const players = firebaseLooper(snapshot)
            let promises = []
            for (let key in players) {
                promises.push(
                    new Promise((resolve, reject) => {
                        firebase.storage().ref('players').child(players[key].image)
                            .getDownloadURL().then(url => {
                                players[key].url = url
                                resolve()
                            })
                    })
                )
            }
            Promise.all(promises).then(() => {
                setLoading(false)
                setAllPlayers([...players])
            })
        })
    }, []);

    const handleShowPlayersByCategory = (category) => (
        allPlayers ?
            allPlayers.map((player,i)=>{
                return player.position === category ?
                <Fade triggerOnce direction='left' delay={i * 200} key={i}>
                    <PlayerCard 
                        name={player.name}
                        lastName={player.lastname}
                        number={player.number}
                        bgImage={player.url}
                    />
                </Fade>
                :
                null
            })
        :
        null
    )

    return (
        <Box className='the_team_container' sx={{ background: `url(${stripes}) repeat` }}>
            {loading ?
                <CircularProgress color='primary' thickness={7} />
                :
                <Box>
                    <Box className='team_category_wrapper'>
                        <Typography component='span' className='title'>Keepers</Typography>
                        <Box className='team_cards'>
                            {handleShowPlayersByCategory('Keeper')}
                        </Box>
                    </Box>
                    <Box className='team_category_wrapper'>
                        <Typography component='span' className='title'>Defence</Typography>
                        <Box className='team_cards'>
                            {handleShowPlayersByCategory('Defence')}
                        </Box>
                    </Box>
                    <Box className='team_category_wrapper'>
                        <Typography component='span' className='title'>Midfield</Typography>
                        <Box className='team_cards'>
                            {handleShowPlayersByCategory('Midfield')}
                        </Box>
                    </Box>
                    <Box className='team_category_wrapper'>
                        <Typography component='span' className='title'>Strikers</Typography>
                        <Box className='team_cards'>
                            {handleShowPlayersByCategory('Striker')}
                        </Box>
                    </Box>
                </Box>
                
            }
        </Box>
    );
}

export default TheTeam;