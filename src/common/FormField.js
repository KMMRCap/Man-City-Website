import React from 'react'
import { Typography, Box } from '@mui/material';
import { Field, ErrorMessage } from 'formik'

const FormField = (props) => {
    return (
        <Box className={props.className}
            sx={{ position: 'relative', margin: '1rem 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
        >
            {props.label ?
                <Typography sx={{ marginBottom: '.5rem' }}
                    className='label_inputs' component='label'>
                    {props.label}
                </Typography>
                :
                null
            }
            {!props.select ?
                <Field
                    id={props.name}
                    name={props.name}
                    type={props.type}
                    placeholder={props.placeholder} />
                :
                <Field
                    as='select'
                    id={props.name}
                    name={props.name}
                    placeholder={props.placeholder}
                >
                    <option value=''>Select One</option>
                    {props.options?.map((item, index) => (
                        <option key={index} value={item.value}>{item.key}</option>
                    ))}
                </Field>
            }
            <Typography component='span'
                sx={{
                    color: 'red',
                    position: 'absolute',
                    right: props.wrappedSelect ? '3rem' : '-5px',
                    top: props.wrappedSelect ? '-10px' : '50%',
                    fontSize: '12px',
                    transform: 'translate(100%,-50%)'
                }}>
                <ErrorMessage name={props.name} />
            </Typography>
        </Box>
    );
}

export default FormField;