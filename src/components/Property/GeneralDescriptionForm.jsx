import { Card, Form, Button, Col, Modal } from 'react-bootstrap'
import { Formik, ErrorMessage, Field, getIn } from 'formik';

function GeneralDescriptionForm(props) {
    const { onPropertyFormFieldsChange, property, formikProps } = props;
    const { errors, isInvalid } = formikProps;
    return (
        <Form.Group controlId="formGridDescription" className="bg-light ">
            <Form.Row>
                <Form.Group as={Col} >
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        isInvalid={!!errors.title}
                        value={property.title}
                        type="text" name="title" required placeholder="Enter Title" onChange={onPropertyFormFieldsChange} />
                    <Form.Control.Feedback type="invalid">
                        Required
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} >
                    <Form.Label>Land Area</Form.Label>
                    <Form.Control
                        value={property.landArea}
                        as="textarea" required name="landArea" onChange={onPropertyFormFieldsChange} />
                    <Form.Control.Feedback type="invalid">
                        Required
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Row >
                <Form.Group as={Col} >
                    <Form.Label>Parking Space</Form.Label>
                    <Form.Control
                        value={property.parkingSpace}
                        required as="textarea" name="parkingSpace" onChange={onPropertyFormFieldsChange} />
                    <Form.Control.Feedback type="invalid">
                        Required
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} >
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        value={property.price}
                        required type="number" name="price" onChange={onPropertyFormFieldsChange} />
                    <Form.Control.Feedback type="invalid">
                        Required
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} >
                    <Form.Label>Built Year</Form.Label>
                    <Form.Control
                        value={property.builtYear}
                        required type="date" name="builtYear" onChange={onPropertyFormFieldsChange} />
                    <Form.Control.Feedback type="invalid">
                        Required
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} >
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        value={property.description}
                        required as="textarea" name="description" onChange={onPropertyFormFieldsChange} />
                    <Form.Control.Feedback type="invalid">
                        Required
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
        </Form.Group>
    )
}

export default GeneralDescriptionForm;