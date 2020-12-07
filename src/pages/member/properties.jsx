import React, { Fragment } from 'react';
import propertySeeder from '../../seeders/properties.json';
import ImageLoader from "../../components/Misc/ImageLoader";
import { CardColumns, Card, Carousel, Form, Button } from 'react-bootstrap'

function PropertyCards_Row() {
    let cards = [];
    let _card = {};
    for (var d in propertySeeder) {
        cards.push(
            <div className="bottom-padding-1" key={d} >
                <Card bg={'light'} border="success" className="bm-3">
                    <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                            <ImageLoader classNames="card-img" name="home.jpg" style={{ height: '20%', width: '20%' }} />
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </Card.Footer>
                </Card>
            </div>
        )
    }
    return (
        <Fragment> {cards} </Fragment>
    )
}

function MyProperty(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-11">
                    <PropertyCards_Row />
                </div>
                <div className="col-1" style={{ borderLeft: '1px solid grey' }}>

                </div>
            </div>
        </div>
    )
}

export default MyProperty;