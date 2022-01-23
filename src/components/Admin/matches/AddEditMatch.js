import { React, useEffect, useState } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import { Formik, Form } from 'formik'
import { Typography, Box, Button } from '@mui/material';
import FormField from '../../../common/FormField';
import { useLocation, useNavigate } from 'react-router-dom';
import { firebaseTeams, firebaseDB, firebaseMatches } from '../../../firebase/firebase'
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import { firebaseLooper } from './../../../firebase/FirebaseFunctions';

const AddEditMatch = () => {

    const [pageType, setPageType] = useState('')
    const [options, setOptions] = useState([])
    const [matchData, setMatchData] = useState(null)
    const [teams, setTeams] = useState([])

    const location = useLocation()
    const navigate = useNavigate()

    const noInitialValue = {
        away: '', date: '', final: '', local: '', stadium: '',
        referee: '', result: '', resultAway: '', resultLocal: '',
    }

    useEffect(() => {
        const matchId = location.state?.match.id
        if (!matchId) {
            setPageType('Add Match')
            setMatchData(noInitialValue)
        }
        else {
            firebaseDB.ref(`matches/${matchId}`).once('value').then((snapshot) => {
                const match = snapshot.val()
                setMatchData(match)
            })
            setPageType('Edit Match')
        }
        firebaseTeams.once('value').then((snapshot) => {
            let teamOptions = []
            snapshot.forEach((childSnapshot) => {
                teamOptions.push({
                    key: childSnapshot.val().shortName,
                    value: childSnapshot.val().shortName,
                })
            })
            setOptions([...teamOptions])
            setTeams([...firebaseLooper(snapshot)])
        })
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const resultOptions = [
        { key: 'W', value: 'W' },
        { key: 'D', value: 'D' },
        { key: 'L', value: 'L' },
        { key: 'n/a', value: 'n/a' },
    ]

    const gamePlayedOptions = [
        { key: 'Yes', value: 'Yes' },
        { key: 'No', value: 'No' },
    ]

    return (
        <AdminLayout>
            <Box className='editmatch_dialog_wrapper'>
                {!matchData ?
                    <CircularProgress color='primary' thickness={7} />
                    :
                    <>
                        <Typography component='h2'>{pageType}</Typography>
                        <Formik
                            initialValues={{
                                date: matchData.date,
                                local: matchData.local,
                                resultLocal: matchData.resultLocal !== '-' ?
                                    matchData.resultLocal : '',
                                away: matchData.away,
                                resultAway: matchData.resultAway !== '-' ?
                                    matchData.resultAway : '',
                                referee: matchData.referee,
                                stadium: matchData.stadium,
                                result: matchData.result,
                                final: matchData.final
                            }}

                            validate={values => {
                                const errors = {};

                                if (!values.date) {
                                    errors.date = 'Required';
                                }
                                if (!values.local) {
                                    errors.local = 'Required';
                                }
                                if (!values.away) {
                                    errors.away = 'Required';
                                }
                                if (!values.referee) {
                                    errors.referee = 'Required';
                                }
                                if (!values.stadium) {
                                    errors.stadium = 'Required';
                                }
                                if (!values.result) {
                                    errors.result = 'Required';
                                }
                                if (!values.final) {
                                    errors.final = 'Required';
                                }
                                if (values.final === 'Yes') {
                                    if (!values.resultLocal) {
                                        errors.resultLocal = 'Required';
                                    }
                                    if (!values.resultAway) {
                                        errors.resultAway = 'Required';
                                    }
                                } else {
                                    values.resultLocal = ''
                                    values.resultAway = ''
                                    values.result = 'n/a'
                                }

                                return errors;
                            }}

                            onSubmit={(values) => {
                                let newValues = {}
                                teams.forEach((team) => {
                                    if (team.shortName === values.local) {
                                        newValues = { ...newValues, localThmb: team.thmb }
                                    }
                                    if (team.shortName === values.away) {
                                        newValues = { ...newValues, awayThmb: team.thmb }
                                    }
                                })
                                values = {...values, ...newValues }
                                if (pageType === 'Edit Match') {
                                    firebaseDB.ref(`matches/${location.state.match.id}`)
                                        .update(values).then(() => {
                                            toast.success('Changes Saved Successfully', {
                                                position: "bottom-right",
                                                autoClose: 2000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                            });
                                        }).catch((err) => {
                                            console.log(err, 'update failed')
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
                                    firebaseMatches.push(values).then(() => {
                                        toast.success('New Match Added Successfully', {
                                            position: "bottom-right",
                                            autoClose: 2000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                        });
                                        setTimeout(() => {
                                            navigate('/admin-matches')
                                        }, 2000)
                                    }).catch((err) => {
                                        console.log(err)
                                        toast.error('Adding New Match Failed', {
                                            position: "bottom-right",
                                            autoClose: 2000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                        });
                                        setTimeout(() => {
                                            navigate('/admin-matches')
                                        }, 2000)
                                    })
                                }
                            }}
                        >
                            <Form>
                                <FormField label='Event Date' name='date' type='date' />
                                <Box className='select_team_layout'>
                                    <Typography component='label' className='label_inputs'>Local</Typography>
                                    <Box className='wrapper'>
                                        <FormField className='left' wrappedSelect
                                            name='local' options={options} select />
                                        <FormField name='resultLocal' type='number' />
                                    </Box>
                                </Box>
                                <Box className='select_team_layout'>
                                    <Typography component='label' className='label_inputs'>Away</Typography>
                                    <Box className='wrapper'>
                                        <FormField className='left' wrappedSelect
                                            name='away' options={options} select />
                                        <FormField name='resultAway' type='number' />
                                    </Box>
                                </Box>
                                <Box className='split_fields'>
                                    <FormField label='Referee' placeholder='Match Referee'
                                        name='referee' type='text' />
                                    <FormField label='Stadium' placeholder='Match Stadium'
                                        name='stadium' type='text' />
                                </Box>
                                <Box className='split_fields' sx={{ marginBottom: '0' }}>
                                    <FormField label='Team Result'
                                        name='result' options={resultOptions} select />
                                    <FormField label='Game Played'
                                        name='final' options={gamePlayedOptions} select />
                                </Box>
                                <Box className='admin_submit'>
                                    <Button
                                        type='submit'
                                        variant="contained"
                                        sx={{ color: 'white', background: '#222', margin: '1rem 0' }}
                                    >{pageType}</Button>
                                </Box>
                            </Form>
                        </Formik>
                    </>
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

export default AddEditMatch;