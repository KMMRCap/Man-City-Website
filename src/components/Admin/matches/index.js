import React, { useEffect, useState } from "react";
import AdminLayout from './../../../Hoc/AdminLayout';
import { firebaseMatches } from "../../../firebase/firebase";
import { arrayReverser, firebaseLooper } from './../../../firebase/FirebaseFunctions';
import { Link } from "react-router-dom";
import Tag from './../../../common/Tag';
import {
    Box, CircularProgress, Typography,
    TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody
} from '@mui/material';

const AdminMatches = () => {

    const [allMatches, setAllMatches] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        firebaseMatches.once('value').then((snapshot) => {
            const matches = firebaseLooper(snapshot)
            setAllMatches(arrayReverser(matches))
            setLoading(false)
        })
    }, [])

    return (
        <AdminLayout>
            <Box className='admin_progress'>
                {loading ?
                    <CircularProgress color='primary' thickness={7} />
                    :
                    <>
                        <Tag link={true} path='/admin-matches/add-match' color='black'
                            bgColor='green' size='span' comp='span'>Add Match</Tag>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Match</TableCell>
                                        <TableCell>Result</TableCell>
                                        <TableCell>Final</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allMatches ?
                                        allMatches.map((match, i) => (
                                            <TableRow key={i}>
                                                <TableCell>{match.date}</TableCell>
                                                <TableCell>
                                                    <Link to={`/admin-matches/edit-match/${match.id}`} state={{ match }}>
                                                        {match.away}
                                                        <Typography component='strong'> - </Typography>
                                                        {match.local}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    {match.resultAway}
                                                    <Typography component='strong'> - </Typography>
                                                    {match.resultLocal}
                                                </TableCell>
                                                <TableCell>
                                                    {match.final === 'Yes' ?
                                                        <Typography className='matches_tag_red' component='span'>Final</Typography>
                                                        :
                                                        <Typography className='matches_tag_green' component='span'>Not played yet</Typography>
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        ))
                                        :
                                        null
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                }
            </Box>
        </AdminLayout>
    );
}

export default AdminMatches;