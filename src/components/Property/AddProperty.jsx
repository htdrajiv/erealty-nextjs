import React from 'react';
import { Col, Tab, Row, Nav } from 'react-bootstrap'
import AddHomeForSale from './AddHomeForSale'

function AddProperty(props) {
    return (
        <Tab.Container id="add-property-tabs" defaultActiveKey="homeForSale">
            <Row>
                <Col sm={2} style={{ borderRight: "dotted 1px" }}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="homeForSale">Home for Sale</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="landForSale">Land for Sale</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="homeForRent">Home for Rent</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="roomForRent">Flat for Rent</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="homeForSale">
                            <AddHomeForSale />
                        </Tab.Pane>
                        <Tab.Pane eventKey="landForSale">
                            "Land for Sale"
                        </Tab.Pane>
                        <Tab.Pane eventKey="homeForRent">
                            "Home for Rent"
                        </Tab.Pane>
                        <Tab.Pane eventKey="roomForRent">
                            "Flat for Rent"
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}

export default AddProperty;