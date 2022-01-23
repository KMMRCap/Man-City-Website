import { Container } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Tag from "../../../common/Tag";
import Blocks from './Blocks';

const Matches = () => {
    return (
        <Box className='home_matches_wrapper'>
            <Container>
                <Tag
                    comp='h2'
                    size='h4'
                    color='#fff'
                    bgColor='#0e1731'>Matches</Tag>

                <Blocks />

                <Tag
                    comp='span'
                    size='h6'
                    color='#222'
                    bgColor='#fff'
                    link='true'
                    path='/matches'>See More Matches</Tag>
            </Container>
        </Box>
    );
}

export default Matches;