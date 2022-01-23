import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import stripedBG from '../../../assets/images/stripes.png'
import { Container } from '@mui/material';
import Tag from './../../../common/Tag';
import { Fade } from "react-awesome-reveal";
import Cards from './Cards';
import $ from 'jquery'

const MeatPlayers = () => {

    const [show, setShow] = useState(false)

    useEffect(() => {
        const mtp = $('.home_meetplayers')
        if (mtp.offset().top + mtp.height() / 2 < $(window).scrollTop() + $(window).height()) {
            setShow(true)
        }
        if (!show) {
            $(window).scroll(() => {
                if (mtp.offset().top + mtp.height() / 2 < $(window).scrollTop() + $(window).height()) {
                    setShow(true)
                }
            })
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Fade fraction='.3' triggerOnce={true} >
            <Box className='home_meetplayers' sx={{ backgroundImage: `url(${stripedBG})` }}>
                <Container>
                    <Box className='home_meetplayers_wrapper'>
                        <Box className='home_card_wrapper'>
                            <Cards show={show} />
                        </Box>
                        <Box className='home_text_wrapper'>
                            <Box>
                                <Tag
                                    bgColor='#0e1731' color='#fff' comp='h3' size='h1'
                                    add={{
                                        marginBottom: '20px',
                                        fontSize: '5rem'
                                    }}>Meet</Tag>
                            </Box>
                            <Box>
                                <Tag
                                    bgColor='#0e1731' color='#fff' comp='h3' size='h1'
                                    add={{
                                        marginBottom: '20px',
                                        fontSize: '5rem'
                                    }}>The</Tag>
                            </Box>
                            <Box>
                                <Tag
                                    bgColor='#0e1731' color='#fff' comp='h3' size='h1'
                                    add={{
                                        marginBottom: '20px',
                                        fontSize: '5rem'
                                    }}>Players</Tag>
                            </Box>
                            <Box>
                                <Tag
                                    link='true' path='/the-team'
                                    bgColor='#fff' color='#0e1731' comp='h3' size='span'
                                    add={{
                                        marginBottom: '27px',
                                        border: '1px solid #0e1731'
                                    }}>Meet Them Here</Tag>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Fade >
    );
}

export default MeatPlayers;