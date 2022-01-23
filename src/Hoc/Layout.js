import React from "react";
import Header from './../components/Header/Header';
import Footer from './../components/Footer/Footer';

const Layout = (props) => {
    return (
        <>
            <Header user={props.user} />
            {props.children}
            <Footer />
        </>
    );
}

export default Layout;