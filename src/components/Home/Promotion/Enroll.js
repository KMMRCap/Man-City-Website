import React from "react";
import { Box } from '@mui/system';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Button, Typography } from "@mui/material";
import { Fade } from "react-awesome-reveal";
import { firebasePromotions } from '../../../firebase/firebase'
import { ToastContainer, toast } from 'react-toastify'

const Enroll = () => {
    return (
        <Fade triggerOnce={true}>
            <Box className='enroll_wrapper'>
                <Formik
                    initialValues={{
                        email: '',
                    }}

                    validate={values => {
                        const errors = {};

                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                            errors.email = 'Wrong Email Address';
                        }

                        return errors;
                    }}

                    onSubmit={(values, { resetForm }) => {
                        firebasePromotions.orderByChild('email').equalTo(values.email)
                            .once('value').then((snapshot) => {
                                if (snapshot.val() === null) {
                                    firebasePromotions.push(values)
                                    toast.success('You enrolled successfully', {
                                        position: "bottom-right",
                                        autoClose: 3000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                    });
                                    resetForm({ values: '' })
                                }
                                else {
                                    toast.error('You are already enrolled', {
                                        position: "bottom-right",
                                        autoClose: 3000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                    });
                                }
                            })
                    }}
                >
                    <Form>
                        <Typography
                            className='enroll_title'
                            htmlFor='emailAddress'
                            variant='h5'
                            component='label'>Enter Your Email</Typography>
                        <Box className='enroll_input'>
                            <Field
                                id='emailAddress'
                                placeholder='your email address'
                                name='email'
                                type='email' />
                        </Box>
                        <Typography component='span' sx={{ color: 'red' }}>
                            <ErrorMessage name="email" />
                        </Typography>
                        <Button
                            type='submit'
                            variant="contained"
                            p='5px 12px'
                            sx={{ color: 'white', background: '#222', marginTop: '.5rem' }}>Enroll</Button>
                    </Form>
                </Formik>
                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </Box>
        </Fade >
    );
}

export default Enroll;