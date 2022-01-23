import React, { useEffect, useState } from "react";
import { Box, Typography } from '@mui/material';
import { firebaseMatches } from '../../firebase/firebase'
import { arrayReverser, firebaseLooper } from './../../firebase/FirebaseFunctions';
import LeagueTable from './LeagueTable';
import MatchesList from "./MatchesList";

const Matches = () => {

    const [allMatches, setAllMatches] = useState([]);
    const [filteredMatches, setFilteredMatches] = useState([]);
    const [playedFilter, setPlayedFilter] = useState('All');
    const [resultFilter, setResultFilter] = useState('All');

    useEffect(() => {
        firebaseMatches.once('value').then(snapshot => {
            const matches = firebaseLooper(snapshot)
            setAllMatches(arrayReverser(matches))
            setFilteredMatches(arrayReverser(matches))
        })
    }, []);

    const firstFilter = [
        { name: 'All', value: 'All' },
        { name: 'Played', value: 'Yes' },
        { name: 'Not Played', value: 'No' },
    ]

    const secondFilter = [
        { name: 'All', value: 'All' },
        { name: 'W', value: 'W' },
        { name: 'D', value: 'D' },
        { name: 'L', value: 'L' },
    ]

    const handleFirstFilter = (value) => {
        const list = allMatches.filter(match => {
            return match.final === value
        })
        if (value === 'All') {
            setFilteredMatches(allMatches)
        }
        else {
            setFilteredMatches(list)
        }
        setPlayedFilter(value)
        setResultFilter('All')
    }

    const handleSecondFilter = (value) => {
        const list = allMatches.filter(match => {
            return match.result === value
        })
        if (value === 'All') {
            setFilteredMatches(allMatches)
        }
        else {
            setFilteredMatches(list)
        }
        setPlayedFilter('All')
        setResultFilter(value)
    }


    return (
        <Box className='the_matches_container'>
            <Box className='the_matches_wrapper' sx={{ marginBottom: '3rem' }}>
                <Box className='left'>
                    <Box className='match_filters'>
                        <Box className="match_filters_box">
                            <Box className='tag'>Show Match</Box>
                            <Box className='cont'>
                                {firstFilter.map((item, i) => (
                                    <Typography
                                        component='p'
                                        className={
                                            `option 
                                            ${playedFilter === item.value ? 'active' : ''}`
                                        }
                                        key={i}
                                        onClick={() => handleFirstFilter(item.value)}
                                    >
                                        {item.name}
                                    </Typography>
                                ))}
                            </Box>
                        </Box>
                        <Box className="match_filters_box">
                            <Box className='tag'>Result Game</Box>
                            <Box className='cont'>
                                {secondFilter.map((item, i) => (
                                    <Typography
                                        component='p'
                                        className={
                                            `option 
                                            ${resultFilter === item.value ? 'active' : ''}`
                                        }
                                        key={i}
                                        onClick={() => handleSecondFilter(item.value)}
                                    >
                                        {item.name}
                                    </Typography>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                    <MatchesList filteredMatches={filteredMatches} />
                </Box>
                <Box className='right'>
                    <LeagueTable />
                </Box>
            </Box>
        </Box>
    );
}

export default Matches;