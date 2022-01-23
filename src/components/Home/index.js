import { Box } from "@mui/system";
import React from "react";
import Banner from './Banner';
import Matches from "./Matches";
import MeatPlayers from './MeatPlayers/index';
import Promotion from "./Promotion";

const Home = () => {
    return (
        <Box component='main' className='bck_blue' mt={'90px'}>
            <Banner />
            <Matches />
            <MeatPlayers />
            <Promotion />
        </Box>
    );
}
 
export default Home;