import React, { useState, useEffect } from 'react';
import Router from 'next/router'
import ImageLoader from "../../components/Misc/ImageLoader";
import { Card, Form, Button, ListGroup } from 'react-bootstrap'
import axios from 'axios';
import { faBed, faBath, faEdit, faTrash, faRupeeSign, faUtensils } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Skeleton from 'react-loading-skeleton';
import { useSession } from 'next-auth/client'
import { ConfirmAlert } from '../Misc/Alerts'

const floorMap = { "0": "Ground", "1": "First", "2": "Second", "3": "Third", "4": "Fourth", "5": "Fifth" }

function SearchProperty(props) {
    const [validated, setValidated] = useState(false);

    return (
        <div className="container top-margin-1 bottom-margin-1">
            <div className="row">
                <div className="col-sm">
                    <Form noValidate validated={validated}>
                        <Card >
                            <Card.Header>
                                Search
                            </Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Form.Group controlId="formGridTitle">
                                        <Form.Row>
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control required type="text" name="title" placeholder="Enter Title" />
                                        </Form.Row>
                                    </Form.Group>
                                </ListGroup.Item>
                            </ListGroup>
                            <Card.Footer>
                                <Button type='submit' variant="info">Apply</Button>
                            </Card.Footer>
                        </Card>
                    </Form>
                </div>
            </div>
        </div>
    )
}

function PropertyList(props) {
    const [session, loading] = useSession()
    const [properties, setProperties] = useState([])
    const [imagesBaseUrl, setImagesBaseUrl] = useState("")

    useEffect(() => {
        if (loading) return;
        if (!loading && !session) return;
        axios.get('/api/property?email=' + session.user.email)
            .then(function (response) {
                // handle success
                setProperties(response.data.data.response)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });

        axios.get('/api/s3/image')
            .then(function (response) {
                setImagesBaseUrl(response.data.returnData.url)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });

    }, [])

    let deleteProperty = (propertyId) => {
        if (!confirm("Press OK to proceed with delete.")) return;
        const headers = {
            'Content-Type': "application/json"
        }
        axios.delete('/api/property?id=' + propertyId, {}, headers)
            .then(function (response) {
                // handle success
                axios.delete('/api/s3/uploader?propertyId=' + propertyId)
                    .then(function (response) {
                        Router.reload(window.location.pathname);
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    .then(function () {

                    })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    let editProperty = (propertyId) => {

    }

    let onImageSelection = () => {

    }

    let floorPlans = (floors) => {
        let floorPlans = [];
        for (const f in floors) {
            let features = [];
            let floor = floors[f];
            for (const fea in floor.features) {
                let feature = floor.features[fea];
                features.push(
                    <span key={fea}>
                        {feature.name} : {feature.value} &nbsp;
                    </span>
                )

            }
            features.push(<br key={f + "_featuresBr"} />)
            floorPlans.push(<span key={f + "_featuresSpan"}>{floorMap[floor.floorNumber]} Floor <br key={f + "_floorNumberBr"} />{features} </span>)
        }
        return <span>{floorPlans}</span>
    }
    let cards = [];

    for (var i in properties) {
        let property = properties[i];
        cards.push(
            <div className="bottom-padding-1 top-margin-1 bottom-margin-1" key={i}>
                <Card bg={'light'} border="success" className="bm-3" >
                    <Card.Body>
                        <Card.Title>{property.title}</Card.Title>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="row">
                                        <div className="col-sm">
                                            <div className="cardImageHolder">
                                                {property.thumbnailImg ? (<div className="cardImageHolder"><ImageLoader baseUrl={imagesBaseUrl} classNames="card-img" name={property.id + "/" + property.thumbnailImg.split(".")[0].trim()}
                                                /></div> || <Skeleton height={150} />) : <Skeleton height={150} />}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm">

                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <h4 style={{ color: 'green' }}>
                                        <FontAwesomeIcon icon={faRupeeSign} />{property.price}
                                    </h4> <br />
                                    <FontAwesomeIcon icon={faBed} />: {property.featuresMap["BEDROOMS"].value} bed(s) <br />
                                    <FontAwesomeIcon icon={faBath} />: {property.featuresMap["BATHROOMS"].value} bath(s)<br />
                                    <FontAwesomeIcon icon={faUtensils} />: {property.featuresMap["KITCHENS"].value} Kitchen(s)
                                        {/* {floorPlans(property.floors)} <br key={i + "_floorsBr"} />
                                    {property.description} */}
                                    <br /><br />
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
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted"><b>{property.address.flattenAddress}</b></small>
                    </Card.Footer>
                </Card>
            </div>
        )
    }

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3">
                        <SearchProperty />
                    </div>
                    <div className="col-sm-8">
                        <h4>Properties</h4>
                        <div style={{ height: '40rem', overflowY: 'scroll' }}>
                            {cards.length > 0 ? cards : <div> You have no property saved yet.</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropertyList;