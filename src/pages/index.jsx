import React, { useState, useEffect } from 'react';
import { Button, Dropdown, FormControl, Modal, Form, InputGroup, Spinner } from 'react-bootstrap'
import { useRouter } from 'next/router';


function Home(props) {
    const router = useRouter();
    const [state, setState] = useState({
        searchText: "",
        redirectToSearch: false
    })

    let handleSearchTextChange = (event) => {
        setState({
            ...state,
            searchText: event.target.value
        })
    }

    let handleSearch = (event) => {
        setState({
            ...state,
            redirectToSearch: true
        })
    }

    let createHeader = () => {
        return (
            <header>
                <div className="header-area ">
                    <div className="header-top_area d-none d-lg-block">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-5 col-md-5 ">
                                    <div className="header_left">
                                        <p>Welcome to E-Real Estate</p>
                                    </div>
                                </div>
                                <div className="col-xl-7 col-md-7">
                                    <div className="header_right d-flex">
                                        <div className="short_contact_list">
                                            <ul>
                                                <li><a href="#"> <i className="fa fa-envelope"></i> info@erealty.com</a></li>
                                                <li><a href="#"> <i className="fa fa-phone"></i> +1 641-919-3867</a></li>
                                            </ul>
                                        </div>
                                        <div className="social_media_links">
                                            <a href="#">
                                                <i className="fa fa-linkedin"></i>
                                            </a>
                                            <a href="#">
                                                <i className="fa fa-facebook"></i>
                                            </a>
                                            <a href="#">
                                                <i className="fa fa-google-plus"></i>
                                            </a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="sticky-header" className="main-header-area">
                        <div className="container">
                            <div className="header_bottom_border">
                                <div className="row align-items-center">
                                    <div className="col-xl-3 col-lg-2">
                                        <div className="logo">
                                            <a href="index.html">
                                                <img src="img/logo.png" alt="" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-7">
                                        <div className="main-menu  d-none d-lg-block">

                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="mobile_menu d-block d-lg-none"></div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </header>
        )
    }

    let createSliderArea = () => {
        return (
            <div className="slider_area">
                <div className="single_slider  d-flex align-items-center slider_bg_1">
                    <div className="container">
                        <div className="row ">
                            <div className="col-xl-10 offset-xl-1">
                                <div className="slider_text text-center justify-content-center">
                                    <h3>Find your best Property</h3>
                                </div>
                                <div className="property_form">
                                    <InputGroup.Prepend>
                                        <InputGroup className="mb-2">
                                            <FormControl onChange={handleSearchTextChange} id="home_search_text" placeholder="Enter an Address..." />
                                            <InputGroup.Prepend>
                                                <Button variant="success" type="button" onClick={handleSearch}>
                                                    Search
                                                    </Button>
                                            </InputGroup.Prepend>
                                        </InputGroup>
                                    </InputGroup.Prepend>
                                    {/* <Form onSubmit={this.handleSearch.bind(this)}>

                                    </Form> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    let createContactActionArea = () => {
        return (
            <div className="contact_action_area">
                <div className="container">
                    <div className="row">
                        <div className="col-2" />
                        <div className="col-10">
                            <div className="">
                                <h3> Add your property for Sale</h3>
                            </div>
                        </div>
                        <div className="col-2" />
                    </div>
                </div>
            </div>
        )
    }

    if (state.redirectToSearch) {
        router.push({
            pathname: '/search',
            query: { searchText: state.searchText },
        })

    }
    let header = createHeader();
    let slider = createSliderArea();
    let contactActionArea = createContactActionArea();
    return (
        <div>
            {/* {header} */}
            {slider}
            {contactActionArea}
        </div>
    )
}


export default Home;