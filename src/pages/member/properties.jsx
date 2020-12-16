import React, { Fragment, useState, useEffect } from 'react';
import ImageLoader from "../../components/Misc/ImageLoader";
import { CardColumns, Card, Carousel, Form, Button } from 'react-bootstrap'
import axios from 'axios';
import { faBed, faBath, faEdit, faTrash, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function PropertyCards_Row(props) {
    let cards = [];
    const { properties } = props;

    let deleteProperty = (propertyId) => {

    }

    let editProperty = (propertyId) => {

    }

    let addImages = () => {

    }

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
                                        <div className="row">
                                            <div className="col-sm">
                                                <ImageLoader classNames="card-img" name={"properties/" + property.thumbnailImg}
                                                    style={{ height: '80%', width: '80%' }} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm">
                                                <Button variant='info' className="right-margin-1"
                                                    data-toggle="tooltip" data-placement="top" title="Edit"
                                                    onClick={() => {
                                                        editProperty(property.id);
                                                    }}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Button>
                                                <Button variant='danger' className="right-margin-1"
                                                    data-toggle="tooltip" data-placement="top" title="Delete"
                                                    onClick={() => {
                                                        deleteProperty(property.id);
                                                    }}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                                <Button variant='success' onClick={() => {
                                                    addImages(property.id);
                                                }}>
                                                    <FontAwesomeIcon icon={faPlusSquare} />Add Images
                                                </Button>
                                            </div>
                                        </div>

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
                        <small className="text-muted">{property.address}</small>
                    </Card.Footer>
                </Card>
            </div>
        )
    }
    return (
        <Fragment> {cards} </Fragment>
    )
}

function Actions(props) {
    return (
        <div className="container top-margin-1" >
            <div className="row">
                <div className="col-sm">
                    <Button variant="success"> <FontAwesomeIcon icon={faPlusSquare} /> Add New Property </Button>
                </div>
            </div>
        </div>
    )
}

function MyProperty(props) {
    const [state, setState] = useState({
        properties: null
    })

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
        <div className="container">
            <div className="row">
                <div className="col-sm-9" >
                    <PropertyCards_Row properties={state.properties} />
                </div>
                <div className="col-sm-3" style={{ borderLeft: '1px solid grey' }}>
                    <Actions />
                </div>
            </div>
        </div>
    )
}

export default MyProperty;