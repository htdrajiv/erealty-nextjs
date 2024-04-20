import { Card, Form, Button, Col, Modal } from 'react-bootstrap'
import { Formik, ErrorMessage, Field, getIn } from 'formik';
import { featureCodes } from '../constants';

function FeaturesForm(props) {
    const { onFeaturesFormFieldsChange, formikProps, features } = props;
    let getFeatureValue = (featureCode) => {
        let featureValue = "";
        let feature = features.find(feature => feature.featureCode === featureCode);
        if (typeof feature !== "undefined")
            featureValue = feature.value;
        return featureValue;
    }
    return (
        <Form.Group controlId={"formGridFeatures"} className="bg-light ">
            <Form.Row >
                <Form.Group as={Col} sm="4">
                    <Form.Label>Total No. of BedRooms</Form.Label>
                    <Form.Control
                        value={getFeatureValue(featureCodes.bedroom)}
                        required type="number" name={"bedrooms"} onChange={onFeaturesFormFieldsChange(1, featureCodes.bedroom)} />
                    <Form.Control.Feedback type="invalid">
                        Required
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} sm="4">
                    <Form.Label>Total No. of BathRooms</Form.Label>
                    <Form.Control
                        value={getFeatureValue(featureCodes.bathroom)}
                        required type="number" name={"bathrooms"} onChange={onFeaturesFormFieldsChange(2, featureCodes.bathroom)} />
                    <Form.Control.Feedback type="invalid">
                        Required
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} sm="4">
                    <Form.Label>Total No. of Kitchens</Form.Label>
                    <Form.Control
                        value={getFeatureValue(featureCodes.kitchen)}
                        required type="number" name={"kitchens"} onChange={onFeaturesFormFieldsChange(3, featureCodes.kitchen)} />
                    <Form.Control.Feedback type="invalid">
                        Required
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row >
        </Form.Group>
    )
}

export default FeaturesForm;