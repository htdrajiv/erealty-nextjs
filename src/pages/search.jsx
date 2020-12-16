import React, { Fragment, useState, useEffect } from 'react';
// import MyMap from '../../plotly/mapbox/MyMap.jsx'
import MyMap from '../components/Mapbox/MyMapBox.jsx'
import { CardColumns, Card, Carousel, Form, Button } from 'react-bootstrap'
import FilterBar from '../components/Filter/FilterBar.jsx'
import ImageLoader from "../components/Misc/ImageLoader";
import axios from 'axios';
import { faBars, faBorderAll, faBed, faBath } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const cardViewType = { "DECK": "DECK", "ROW": "ROW" }

let localFilters = { cardViewType: cardViewType.DECK }

function PropertyCards_Deck(props) {
    let cards = [];
    const { properties } = props;
    for (var i in properties) {
        let property = properties[i];
        cards.push(
            <Card key={i} bg={'light'} border="success" className="mb-3">
                {/* <Card.ImgOverlay> */}
                <Card.Body>
                    <Card.Img src={`/images/properties/${property.thumbnailImg}`} />
                    <Card.Title>{property.title}</Card.Title>
                    <Card.Text>
                        {property.description}
                    </Card.Text>
                    <Card.ImgOverlay>
                        <span style={{ background: 'white' }}>
                            Price: ${property.features.price} <br />
                            <FontAwesomeIcon icon={faBed} />: {property.features.totalBedrooms} <br />
                            <FontAwesomeIcon icon={faBath} />: {property.features.totalBathrooms}
                        </span>
                    </Card.ImgOverlay>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted"><b>{property.address}</b></small>
                </Card.Footer>
                {/* </Card.ImgOverlay> */}
            </Card>
        )
    }
    return (
        <CardColumns>{cards}</CardColumns>
    )
}

function PropertyCards_Row(props) {
    let cards = [];
    const { properties } = props;

    let floorPlans = (floorPlan) => {
        let _floorPlans = [];
        for (const floor in floorPlan) {
            _floorPlans.push(
                <span>
                    {floor}:
                    <FontAwesomeIcon icon={faBed} /> {floorPlan[floor].bedRooms} ,
                    <FontAwesomeIcon icon={faBath} /> {floorPlan[floor].bathRooms} ,
                    Kitchen: {floorPlan[floor].kitchen}
                    <br />
                </span>

            )
        }
        return <span>Floor Plans: <br /> {_floorPlans}</span>
    }


    for (var i in properties) {
        let property = properties[i];
        cards.push(
            <div className="bottom-padding-1" key={i} >
                <Card bg={'light'} border="success" className="bm-3">
                    <Card.Body>
                        <Card.Title>{property.title}</Card.Title>
                        <Card.Text>
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <ImageLoader classNames="card-img" name={"properties/" + property.thumbnailImg}
                                            style={{ height: '100%', width: '100%' }} />
                                    </div>
                                    <div className="col-sm-6">
                                        Price: ${property.features.price} <br />
                                        <FontAwesomeIcon icon={faBed} />: {property.features.totalBedrooms} <br />
                                        <FontAwesomeIcon icon={faBath} />: {property.features.totalBathrooms} <br />
                                        {floorPlans(property.features.floorPlans)} <br />
                                        {property.description}
                                    </div>
                                </div>
                            </div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted"><b>{property.address}</b></small>
                    </Card.Footer>
                </Card>
            </div>
        )
    }
    return (
        <Fragment> {cards} </Fragment>
    )
}

function PropertyCards(props) {
    const [state, setState] = useState({
        properties: null
    });
    let reload = () => {
        setState({
            ...state,
            reload: "JustToReload"
        })
    }

    useEffect(() => {
        axios.get('/api/properties')
            .then(function (response) {
                // handle success
                setState({
                    ...state,
                    properties: response.data.properties
                })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });

    }, [])

    return (
        <Fragment>
            <div className="row" style={{ display: "flex", justifyContent: "flex-end" }}>
                <div className="col-sm-8">
                    <SortBy />
                </div>
                <div className="col-sm-4">
                    <ViewType reload={reload} />
                </div>
            </div>
            <div className="row overflow-auto" style={{ height: "70vh" }}>
                {(localFilters.cardViewType === cardViewType.DECK)
                    && state.properties
                    && <PropertyCards_Deck properties={state.properties} />}
                {(localFilters.cardViewType === cardViewType.ROW)
                    && state.properties
                    && <PropertyCards_Row properties={state.properties} />}
            </div>
        </Fragment>
    )
}

function PropertyCarousel() {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="holder.js/800x400?text=First slide&bg=373940"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="holder.js/800x400?text=Second slide&bg=282c34"
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

const SortBy = (props) => {
    return (
        <Form>
            <Form.Group md="4" controlId="carParkingSpaceFormGrp" className={"form-inline"}>
                <Form.Label>Sort By: </Form.Label>
                <Form.Control as="select"
                    defaultValue="Choose..."
                    onChange={(e) => {
                        console.log(e.target.value)
                    }}
                >
                    <option value="choose">Choose...</option>
                    <option value="lh">Price(Low-High)</option>
                    <option value="hl">Price(High-Low)</option>
                    <option value="na">Newly Added</option>
                </Form.Control>
            </Form.Group>
        </Form>
    )
}

const ViewType = (props) => {
    return (
        <span>
            <Button variant="info" onClick={() => {
                localFilters.cardViewType = cardViewType.ROW;
                props.reload();
            }} className="right-margin-1"> <FontAwesomeIcon icon={faBars} /> </Button>
            <Button variant="info" onClick={() => {
                localFilters.cardViewType = cardViewType.DECK;
                props.reload();
            }}> <FontAwesomeIcon icon={faBorderAll} /> </Button>
        </span>
    )
}

function Search(props) {
    const [state, setState] = useState({
        reloadPage: "JustToReload",
        currentPosition: {
            latitude: 0.0, longitude: 0.0,
        },
        sortBy: ""
    })

    useEffect(() => {
        setCurrentLocation();
        watchUserMovement();
    }, [])

    let setCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                setState({
                    ...state,
                    currentPosition: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                })
            },
            function (error) {
                console.error("Error Code = " + error.code + " - " + error.message);
            }
        );
    }

    let watchUserMovement = () => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(function (position) {
                setState({
                    ...state,
                    currentPosition: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                })
            });
        }
    }

    let reload = () => {
        setState({
            ...state,
            reload: "JustToReload"
        })
    }

    let { currentPosition } = state;
    let propertyData = { scattermapbox: { lat: [], lon: [] } }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <FilterBar />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-5" >
                    <MyMap
                        propertyData={propertyData}
                        currentPosition={currentPosition}
                        height={"75vh"}
                        width={"100%"}
                    />
                </div>
                <div className="col-sm-7" >
                    <PropertyCards {...props} />
                </div>
            </div>
        </div>
    )
}

export default Search;