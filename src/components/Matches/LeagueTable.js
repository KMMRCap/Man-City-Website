import React, { useEffect, useState } from 'react';
import { firebaseDB } from '../../firebase/firebase';
import { firebaseLooper } from './../../firebase/FirebaseFunctions';
import { Box, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';

const LeagueTable = () => {

    const [allPositions, setAllPositions] = useState([]);

    useEffect(() => {
        firebaseDB.ref('positions').once('value').then(snapshot => {
            setAllPositions(firebaseLooper(snapshot))
        })
    }, []);


    const style = {
        cell: {
            padding: '10px 1rem 10px 11px',
            borderBottom: '1px solid #ffffff',
            color: '#ffffff',
            textAlign: 'center'
        }
    }

    return (
        <Box className='league_table_wrapper'>
            <Typography component='h2' className='title'>League Table</Typography>
            <Box sx={{ background: '#98c6e9' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={style.cell}>Pos</TableCell>
                            <TableCell style={style.cell}>Team</TableCell>
                            <TableCell style={style.cell}>W</TableCell>
                            <TableCell style={style.cell}>L</TableCell>
                            <TableCell style={style.cell}>D</TableCell>
                            <TableCell style={style.cell}>Pts</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allPositions.map((position, i) => (
                            <TableRow key={i}>
                                <TableCell style={style.cell}>{i + 1}</TableCell>
                                <TableCell style={style.cell}>{position.team}</TableCell>
                                <TableCell style={style.cell}>{position.w}</TableCell>
                                <TableCell style={style.cell}>{position.d}</TableCell>
                                <TableCell style={style.cell}>{position.l}</TableCell>
                                <TableCell style={style.cell}>{position.pts}</TableCell>
                            </TableRow>
                        ))
                        }
                    </TableBody>
                </Table>
            </Box>
        </Box>
    );
}

export default LeagueTable;