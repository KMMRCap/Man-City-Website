import React, { useEffect, useState } from "react";
import { firebase } from '../firebase/firebase'
import FileUploader from 'react-firebase-file-uploader'
import { Box, CircularProgress, Typography } from '@mui/material';
import { ErrorMessage } from 'formik';

const UploadFile = (props) => {

    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        if (props.imageURL) {
            props.setImageURL(props.imageURL)
            props.setImageName(props.imageName)
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uploading]);

    const handleUploadStart = () => {
        setUploading(true)
    }
    const handleUploadError = () => {
        setUploading(false)
    }
    const handleUploadSuccess = (imageName) => {
        setUploading(false)
        props.setImageName(imageName)

        firebase.storage().ref(props.dir).child(imageName).getDownloadURL()
            .then(url => {
                props.setImageURL(url)
            })
    }

    const uploadAgain = () => {
        props.setImageURL('')
        props.setImageName('')
        setUploading(false)
    }


    return (
        <Box>
            {!props.imageURL ?
                <Box sx={{ position: 'relative' }}>
                    <Typography component='label' className='label_inputs' sx={{marginBottom:'.5rem'}}>
                        {props.label}
                    </Typography>
                    <FileUploader
                        accept='image/*'
                        name={props.name}
                        id={props.name}
                        randomizeFilename
                        storageRef={firebase.storage().ref(props.dir)}
                        onUploadStart={handleUploadStart}
                        onUploadError={handleUploadError}
                        onUploadSuccess={handleUploadSuccess} />
                    <Typography component='span'
                        sx={{
                            color: 'red',
                            position: 'absolute',
                            right: '-5px',
                            top: '50%',
                            fontSize: '12px',
                            transform: 'translate(100%,-50%)'
                        }}>
                        <ErrorMessage name={props.name} />
                    </Typography>
                </Box>
                :
                null
            }
            {uploading ?
                <Box className='progress' sx={{ textAlign: 'center', margin: '2rem 0' }}>
                    <CircularProgress sx={{ color: '#98c6e9' }} thickness={7} />
                </Box>
                :
                null
            }
            {props.imageURL ?
                <Box className='image_upload_container'>
                    <Box component='img' sx={{ width: '80%' }}
                        src={props.imageURL} alt={props.imageName} />
                    <Box
                        className='remove'
                        onClick={uploadAgain}
                        sx={{ cursor: 'pointer' }}>Remove</Box>
                </Box>
                :
                null
            }
        </Box>
    );
}

export default UploadFile;