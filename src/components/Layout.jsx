import React from 'react';
import Header from './Header/Header.jsx'
import Footer from './Footer/Footer.jsx'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'

function Layout({ children }) {
    return (
        <div id="main-wrapper">
            <Head>
                <title>ERealty</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="">
                <ToastContainer position={toast.POSITION.TOP_RIGHT} style={{ zIndex: 150000 }} />
                <div id="my-app">
                    <Header />
                    <div className="contents">
                        {children}
                    </div>
                    <Footer />
                </div>
            </div>
        </div >
    );
}

export default Layout;