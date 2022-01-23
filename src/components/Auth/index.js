import React from "react";
import { Box } from "@mui/system";
import { Formik, Form } from 'formik'
import { Button, Container, Typography } from "@mui/material";
import { firebase } from '../../firebase/firebase';
import $ from 'jquery'
import { useNavigate } from "react-router-dom";
import FormField from "../../common/FormField";

const Login = () => {

    const navigate = useNavigate()

    return (
        <Container>
            <Box className='signin_wrapper' sx={{ margin: '7rem' }}>
                <Typography component='h2'>Please Login</Typography>
                <Formik
                    initialValues={{
                        loginEmail: '',
                        loginPassword: ''
                    }}

                    validate={values => {
                        const errors = {};

                        if (!values.loginEmail) {
                            errors.loginEmail = 'Required';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.loginEmail)) {
                            errors.loginEmail = 'Wrong Email Address';
                        }

                        if (!values.loginPassword) {
                            errors.loginPassword = 'Required';
                        } else if (values.loginPassword.length < 6) {
                            errors.loginPassword = 'At least 6 chars';
                        }

                        return errors;
                    }}

                    onSubmit={(values) => {
                        firebase.auth().signInWithEmailAndPassword(
                            values.loginEmail,
                            values.loginPassword
                        ).then(() => {
                            navigate('/dashboard')
                            console.log('yes')
                        }).catch((err) => {
                            $('.login-error').html(err.message)
                            console.log('no')
                        })
                    }}
                >
                    <Form>
                        <FormField className='enroll_input'
                            name='loginEmail' type='email' placeholder='Email Address' />
                        <FormField className='enroll_input'
                            name='loginPassword' type='password' placeholder='Password' />
                        <Button
                            type='submit'
                            variant="contained"
                            sx={{ color: 'white', background: '#222', margin: '1rem 0' }}>Login</Button>
                    </Form>
                </Formik>
                <Typography className="login-error" component='p' color='red'></Typography>
            </Box>
        </Container>
    );
}

export default Login;