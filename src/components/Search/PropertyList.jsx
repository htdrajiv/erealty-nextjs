import { useState, useEffect, Fragment } from 'react';

import FilterBar from '../Filter/FilterBar.jsx'
import ImageLoader from "../Misc/ImageLoader";
import axios from 'axios';
import { CardColumns, CardDeck, CardGroup, Card, Carousel, Form, Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import { faBed, faBath, faUtensils, faRupeeSign, faPhone, faPhoneVolume } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Skeleton from 'react-loading-skeleton';
import { cardViewTypes } from '../constants'

const floorMap = { "0": "Ground", "1": "First", "2": "Second", "3": "Third", "4": "Fourth", "5": "Fifth" }

function PropertyCards_Deck(props) {
    let cards = [];
    const { properties, imagesBaseUrl } = props;
    for (var i in properties) {
        let property = properties[i];
        cards.push(
            <div className="col-sm-6" key={i + "_div"}>
                <Card key={i} bg={'light'} border="success" className="mb-3 h-10" >
                    {property.thumbnailImg ? (<div className="cardImageHolderSm"><Card.Img
                        src={`${imagesBaseUrl}/${property.id}/${property.thumbnailImg.split(".")[0]}`} /></div> || <Skeleton style={{ height: "12rem", width: "100%" }} />) : <Skeleton style={{ height: "12rem", width: "100%" }} />}
                    <Card.ImgOverlay>
                        <span style={{ background: 'white', color: 'green' }}>
                            <FontAwesomeIcon icon={faBed} />: {property.featuresMap["BEDROOMS"].value} bed(s) <br />
                            <FontAwesomeIcon icon={faBath} />: {property.featuresMap["BATHROOMS"].value} bath(s) <br />
                            <FontAwesomeIcon icon={faUtensils} />: {property.featuresMap["KITCHENS"].value} kitchen(s) <br />
                        </span>
                    </Card.ImgOverlay>
                    <Card.Body>
                        <Card.Title>
                            <h4 style={{ color: 'green' }}>
                                <FontAwesomeIcon icon={faRupeeSign} />{property.price}
                            </h4>
                        </Card.Title>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted"><b>{property.address.flattenAddress}</b></small>
                    </Card.Footer>
                </Card>
            </div>
        )
    }
    return (
        <Fragment>{cards}</Fragment>
    )
}

function PropertyCards_Row(props) {
    let cards = [];
    const { properties, imagesBaseUrl } = props;

    let floorPlans = (floors) => {
        let floorPlans = [];
        for (const f in floors) {
            let features = [];
            let floor = floors[f];
            for (const fea in floor.features) {
                let feature = floor.features[fea];
                features.push(
                    <span>
                        {feature.name} : {feature.value}
                        <br />
                    </span>
                )
            }
            floorPlans.push(<span>{floorMap[floor.floorNumber]} : {features} </span>)
        }
        return <span>Floor Plans: <br /> {floorPlans}</span>
    }

    for (var i in properties) {
        let property = properties[i];
        cards.push(
            <div className="bottom-padding-1" key={i} style={{ width: "100%" }}>
                <Card bg={''} border="success" className="bm-3" >
                    <Card.Body style={{ padding: "0 0 0 0" }}>
                        {/* <Card.Title>{property.title}</Card.Title> */}
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-6" style={{ padding: "0" }} >
                                    <div className="cardImageHolder">
                                        {property.thumbnailImg ? (<div className=""><Card.Img
                                            src={`${imagesBaseUrl}/${property.id}/${property.thumbnailImg.split(".")[0]}`} /></div> || <Skeleton style={{ height: "12rem", width: "100%" }} />) : <Skeleton style={{ height: "12rem", width: "100%" }} />}
                                        {/* {property.thumbnailImg ? (<ImageLoader baseUrl={imagesBaseUrl} classNames="card-img" name={property.id + "/" + property.thumbnailImg.split(".")[0]}
                                        /> || <Skeleton height={150} width={500} />) : <Skeleton height={150} width={500} />} */}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <Card bg={''} border="light" className="bm-3" >
                                        <Card.Body>
                                            <Card.Title>
                                                <h4 style={{ color: 'green' }}>
                                                    <FontAwesomeIcon icon={faRupeeSign} />{property.price}
                                                </h4>
                                            </Card.Title>
                                            <small>
                                                <FontAwesomeIcon icon={faBed} />: <span className="text-muted">{property.featuresMap["BEDROOMS"].value} bed(s)</span> <br />
                                                <FontAwesomeIcon icon={faBath} />: <span className="text-muted">{property.featuresMap["BATHROOMS"].value} bath(s)</span> <br />
                                                <FontAwesomeIcon icon={faUtensils} />: <span className="text-muted">{property.featuresMap["KITCHENS"].value} Kitchen(s) </span>
                                            </small>
                                            <br /><br />
                                            <h6>
                                                <FontAwesomeIcon icon={faPhoneVolume} /> {property.contact.personalNumber}
                                            </h6>
                                            <small ><b>{property.address.flattenAddress}</b></small>
                                        </Card.Body>

                                    </Card>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        )
    }
    return (
        <Fragment> {cards} </Fragment>
    )
}

function PropertyList(props) {
    const { properties } = props;

    const [imagesBaseUrl, setImagesBaseUrl] = useState("")
    // const [properties, setProperties] = useState(properties);
    const [cardViewType, setCardViewType] = useState(cardViewTypes.DECK)

    useEffect(() => {
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

    return (
        <Fragment>
            <div className="row" style={{ display: "flex" }}>
                <FilterBar setCardViewType={setCardViewType} />
            </div>
            <div className="row overflow-auto" style={{ height: "40rem" }}>
                {(cardViewType === cardViewTypes.DECK)
                    && properties
                    && <PropertyCards_Deck properties={properties} imagesBaseUrl={imagesBaseUrl} />}
                {(cardViewType === cardViewTypes.ROW)
                    && properties
                    && <PropertyCards_Row properties={properties} imagesBaseUrl={imagesBaseUrl} />}
            </div>
        </Fragment>
    )
}

export default PropertyList;

