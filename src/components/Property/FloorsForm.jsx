import { useState, Fragment } from 'react'
import { Card, Form, Button, Col, Modal } from 'react-bootstrap'
import { Formik, ErrorMessage, Field, getIn } from 'formik';
import { featureCodes } from '../constants';

let floorNum = 2;
let floorOptions = [];
while (floorNum < 100) {
    floorOptions.push(<option key={floorNum}>{floorNum}</option>)
    floorNum++;
}

function FloorsForm(props) {
    const { onFloorsFormFieldsChange, sliceFloorsOnNumberOfFloorsChange, floors } = props;
    const [state, setState] = useState({
        numberOfFloors: 0
    })

    let onFloorChange = (e) => {
        setState({
            ...state,
            numberOfFloors: e.target.value
        }, sliceFloorsOnNumberOfFloorsChange(e.target.value))
    }

    let getFeatureValue = (floors, featureCode) => {
        let featureValue = "";
        let feature = {};
        if (typeof floors !== "undefined") {
            feature = floors.features.find(feature => feature.featureCode === featureCode);
            if (typeof feature !== "undefined")
                featureValue = feature.value;
        }
        return featureValue;
    }

    let prepareFloors = () => {
        let numberOfFloors = state.numberOfFloors;
        let _floors = [];
        for (let i = 2; i <= numberOfFloors; i++) {
            let thisFloor = floors.find(floor => {
                return floor.floorNumber === i
            })
            _floors.push(
                <Card bg={'light'} className="bm-3 bottom-margin-1" key={i}>
                    <Card.Header key={i + "_propertyFloorHeader"}>
                        {"Floor Number " + i}
                    </Card.Header>
                    <Card.Body key={i + "_propertyFloorBody"}>
                        <Form.Group controlId={i + "_formGridFeatures"}>
                            <Form.Row >
                                <Form.Group as={Col} sm="2">
                                    <Form.Label>No. of BedRooms</Form.Label>
                                    <Form.Control
                                        value={getFeatureValue(thisFloor, featureCodes.bedroom)}
                                        required type="number" name={i + "_bedrooms"} onChange={onFloorsFormFieldsChange(i, featureCodes.bedroom)} />
                                    <Form.Control.Feedback type="invalid">
                                        Required
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} sm="3">
                                    <Form.Label>No. of Common Rooms</Form.Label>
                                    <Form.Control
                                        value={getFeatureValue(thisFloor, featureCodes.sittingRoom)}
                                        required type="number" name={i + "_commonRooms"} onChange={onFloorsFormFieldsChange(i, featureCodes.sittingRoom)} />
                                    <Form.Control.Feedback type="invalid">
                                        Required
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} sm="2">
                                    <Form.Label>No. of BathRooms</Form.Label>
                                    <Form.Control
                                        value={getFeatureValue(thisFloor, featureCodes.bathroom)}
                                        required type="number" name={i + "_bathrooms"} onChange={onFloorsFormFieldsChange(i, featureCodes.bathroom)} />
                                    <Form.Control.Feedback type="invalid">
                                        Required
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} sm="2">
                                    <Form.Label>No. of Kitchens</Form.Label>
                                    <Form.Control
                                        value={getFeatureValue(thisFloor, featureCodes.kitchen)}
                                        required type="number" name={i + "_kitchens"} onChange={onFloorsFormFieldsChange(i, featureCodes.kitchen)} />
                                    <Form.Control.Feedback type="invalid">
                                        Required
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} sm="3">
                                    <Form.Label>No. of Store Rooms</Form.Label>
                                    <Form.Control
                                        value={getFeatureValue(thisFloor, featureCodes.storeRoom)}
                                        required type="number" name={i + "_storeRooms"} onChange={onFloorsFormFieldsChange(i, featureCodes.storeRoom)} />
                                    <Form.Control.Feedback type="invalid">
                                        Required
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row >
                        </Form.Group>
                        <Form.Group>
                            <Form.Row >
                                <Form.Group as={Col}>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" as="textarea" name={i + "_description"} />
                                </Form.Group>
                            </Form.Row>
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer key={i + "_propertyFloorFooter"}>

                    </Card.Footer>
                </Card >
            )
        }
        return (
            <Fragment>
                {_floors}
            </Fragment>
        );
    }

    let groundFloor = floors.find(floor => {
        return floor.floorNumber === 1;
    })

    return (
        <Form.Group controlId="formGridFloors">
            Enter Details for Each Floor:
            <Form.Group as={Col} >
                <Form.Row>
                    <Card bg={'light'} className="bm-3 bottom-margin-1" >
                        <Card.Header key={"1_propertyFloorHeader"}>
                            {"Ground Floor:"}
                        </Card.Header>
                        <Card.Body key={"0_propertyFloorBody"}>
                            <Form.Group controlId={"1_formGridFeatures"}>
                                <Form.Row >
                                    <Form.Group as={Col} sm="2">
                                        <Form.Label>No. of BedRooms</Form.Label>
                                        <Form.Control
                                            value={getFeatureValue(groundFloor, featureCodes.bedroom)}
                                            required type="number" name={"1_bedrooms"} onChange={onFloorsFormFieldsChange(1, featureCodes.bedroom)} />
                                        <Form.Control.Feedback type="invalid">
                                            Required
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} sm="3">
                                        <Form.Label>No. of Common Rooms</Form.Label>
                                        <Form.Control
                                            value={getFeatureValue(groundFloor, featureCodes.sittingRoom)}
                                            required type="number" name={"1_commonRooms"} onChange={onFloorsFormFieldsChange(1, featureCodes.sittingRoom)} />
                                        <Form.Control.Feedback type="invalid">
                                            Required
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} sm="2">
                                        <Form.Label>No. of BathRooms</Form.Label>
                                        <Form.Control
                                            value={getFeatureValue(groundFloor, featureCodes.bathroom)}
                                            required type="number" name={"1_bathrooms"} onChange={onFloorsFormFieldsChange(1, featureCodes.bathroom)} />
                                        <Form.Control.Feedback type="invalid">
                                            Required
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} sm="2">
                                        <Form.Label>No. of Kitchens</Form.Label>
                                        <Form.Control
                                            value={getFeatureValue(groundFloor, featureCodes.kitchen)}
                                            required type="number" name={"1_kitchens"} onChange={onFloorsFormFieldsChange(1, featureCodes.kitchen)} />
                                        <Form.Control.Feedback type="invalid">
                                            Required
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} sm="3">
                                        <Form.Label>No. of Store Rooms</Form.Label>
                                        <Form.Control
                                            value={getFeatureValue(groundFloor, featureCodes.storeRoom)}
                                            required type="number" name={"1_storeRooms"} onChange={onFloorsFormFieldsChange(1, featureCodes.storeRoom)} />
                                        <Form.Control.Feedback type="invalid">
                                            Required
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row >
                            </Form.Group>
                            <Form.Group>
                                <Form.Row >
                                    <Form.Group as={Col}>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" as="textarea" name={"1_description"} />
                                    </Form.Group>
                                </Form.Row>
                            </Form.Group>

                        </Card.Body>
                        <Card.Footer key={"1_propertyFloorFooter"}>

                        </Card.Footer>
                    </Card >
                </Form.Row>
                <Form.Row>
                    <Form.Label>Add Floors</Form.Label>
                    <Form.Control name="floors" as="select" defaultValue="Choose..." onChange={onFloorChange} >
                        <option>Choose...</option>
                        {floorOptions}
                    </Form.Control>
                </Form.Row>
            </Form.Group>
            {prepareFloors()}
        </Form.Group>
    )
}

export default FloorsForm;