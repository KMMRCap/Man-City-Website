import React, { useEffect, useState } from "react";
import AdminLayout from './../../../Hoc/AdminLayout';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { Formik, Form } from 'formik'
import FormField from "../../../common/FormField";
import { firebasePlayers, firebaseDB, firebase } from "../../../firebase/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import UploadFile from "../../../common/UploadFile";
import { ToastContainer, toast } from 'react-toastify';

const AddEditPlayer = () => {

    const [pageType, setPageType] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [imageName, setImageName] = useState('')
    const [playerData, setPlayerData] = useState(null)

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const playerId = location.state?.player.id
        if (playerId) {
            setPageType('Edit Player')
            firebaseDB.ref(`players/${playerId}`).once('value').then((snapshot) => {
                const player = snapshot.val()
                setPlayerData(player)
                firebase.storage().ref('players').child(player.image).getDownloadURL()
                    .then(url => {
                        setImageURL(url)
                        setImageName(player.image)
                    }).catch(() => {
                        setImageURL('')
                        setImageName('')
                    })
            })
        }
        else {
            setPageType('Add Player')
            setPlayerData({
                lastname: "",
                name: "",
                number: "",
                position: ""
            })
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const positionOptions = [
        { key: 'Keeper', value: 'Keeper' },
        { key: 'Defence', value: 'Defence' },
        { key: 'Midfield', value: 'Midfield' },
        { key: 'Striker', value: 'Striker' },
    ]

    return (
        <AdminLayout>
            <Box className='editplayers_dialog_wrapper'>
                <Typography component='h2'>{pageType}</Typography>
                {!playerData ?
                    <CircularProgress color='primary' thickness={7} />
                    :
                    <Formik
                        initialValues={{
                            name: playerData.name,
                            lastname: playerData.lastname,
                            number: playerData.number,
                            position: playerData.position
                        }}

                        validate={values => {
                            const errors = {};

                            if (!values.name) {
                                errors.name = 'Required';
                            }
                            if (!values.lastname) {
                                errors.lastname = 'Required';
                            }
                            if (!values.number) {
                                errors.number = 'Required';
                            }
                            if (!values.position) {
                                errors.position = 'Required';
                            }
                            if (!imageName) {
                                errors.image = 'Required'
                            }

                            return errors;
                        }}

                        onSubmit={(values) => {
                            values = { ...values, image: imageName }
                            if (pageType === 'Edit Player') {
                                firebaseDB.ref(`players/${location.state.player.id}`)
                                    .update(values).then(() => {
                                        toast.success('Changed Saved Successfully', {
                                            position: "bottom-right",
                                            autoClose: 2000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                        });
                                    }).catch((err) => {
                                        console.log(err)
                                        toast.error('Update Failed', {
                                            position: "bottom-right",
                                            autoClose: 2000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                        });
                                    })
                            }
                            else {
                                firebasePlayers.push(values).then(() => {
                                    toast.success('New Player Added Successfully', {
                                        position: "bottom-right",
                                        autoClose: 2000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                    });
                                    setTimeout(() => {
                                        navigate('/admin-players')
                                    }, 2000)
                                }).catch((err) => {
                                    console.log(err)
                                    toast.error('Adding New Player Failed', {
                                        position: "bottom-right",
                                        autoClose: 2000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                    });
                                    setTimeout(() => {
                                        navigate('/admin-players')
                                    }, 2000)
                                })
                            }
                        }}
                    >
                        <Form>
                            <UploadFile
                                name='image'
                                dir='players'
                                label='Player Image'
                                imageURL={imageURL}
                                setImageURL={setImageURL}
                                imageName={imageName}
                                setImageName={setImageName}
                            />
                            <FormField label='Player Name' name='name' type='text' />
                            <FormField label='Player Last Name' name='lastname' type='text' />
                            <FormField label='Player Number' name='number' type='number' />
                            <FormField label='Player Position'
                                name='position' options={positionOptions} select />
                            <Box className='admin_submit'>
                                <Button
                                    type='submit'
                                    variant="contained"
                                    sx={{ color: 'white', background: '#222', margin: '1rem 0' }}
                                >{pageType}</Button>
                            </Box>
                        </Form>
                    </Formik>
                }
                <ToastContainer
                    position="bottom-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </Box>
        </AdminLayout>
    );
}

export default AddEditPlayer;