import React, { useEffect, useState } from "react";
import AdminLayout from './../../../Hoc/AdminLayout';
import { firebasePlayers } from "../../../firebase/firebase";
import { arrayReverser, firebaseLooper } from './../../../firebase/FirebaseFunctions';
import Tag from './../../../common/Tag';
import {
    Box, CircularProgress, TableContainer, Paper, Table,
    TableHead, TableRow, TableCell, TableBody
} from '@mui/material';
import { Link } from "react-router-dom";

const AdminPlayers = () => {

    const [loading, setLoading] = useState(true)
    const [allPlayers, setAllPlayers] = useState([])

    useEffect(() => {
        firebasePlayers.once('value').then((snapshot) => {
            const players = firebaseLooper(snapshot)
            setAllPlayers(arrayReverser(players))
            setLoading(false)
        })
    }, []);


    return (
        <AdminLayout>
            <Box className='admin_progress'>
                {loading ?
                    <CircularProgress color='primary' thickness={7} />
                    :
                    <>
                        <Tag link={true} path='/admin-players/add-player' color='black'
                            bgColor='green' size='span' comp='span'>Add Player</Tag>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>First Name</TableCell>
                                        <TableCell>Last Name</TableCell>
                                        <TableCell>Number</TableCell>
                                        <TableCell>Position</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allPlayers ?
                                        allPlayers.map((player, i) => (
                                            <TableRow key={i}>
                                                <TableCell>
                                                    <Link to={`/admin-players/edit-player/${player.id}`}>
                                                        {player.name}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    <Link to={`/admin-players/edit-player/${player.id}`} state={{ player }}>
                                                        {player.lastname}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    {player.number}
                                                </TableCell>
                                                <TableCell>
                                                    {player.position}
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

export default AdminPlayers;