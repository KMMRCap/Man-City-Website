import { Box } from "@mui/system";
import React from "react";
import BannerStripes from './BannerStripes';
import BannerContent from './BannerContent';

const Banner = () => {
    return (
        <Box className='featured_wrapper'>
            <BannerStripes />
            <BannerContent />
        </Box>
    );
}

export default Banner;