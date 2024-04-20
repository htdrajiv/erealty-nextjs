import { Card, Form, Button, Col, Modal } from 'react-bootstrap'
import { Formik, ErrorMessage, Field, getIn } from 'formik';

function AddressForm(props) {
    const { onAddressFormFieldsChange, address, formikProps } = props;
    const { isInvalid, errors } = formikProps;
    return (
        <Form.Group controlId="formGridAddress" className="bg-light ">
            <Form.Row>
                <Form.Group as={Col} >
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        value={address.streetAddress1}
                        required name="streetAddress1" onChange={onAddressFormFieldsChange} placeholder="1234 Main St" />
                    <Form.Control.Feedback type="invalid">
                        Required
                        </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control
                        value={address.streetAddress2}
                        name="streetAddress2" onChange={onAddressFormFieldsChange} placeholder="Apartment, studio, or floor" />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} >
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        value={address.country}
                        required as="select" name="country" onChange={onAddressFormFieldsChange} >
                        <option>Nepal</option>
                        <option>US</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Required
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} >
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        value={address.city}
                        required name="city" onChange={onAddressFormFieldsChange} />
                    <Form.Control.Feedback type="invalid">
                        Required
                                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} >
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        value={address.state}
                        required name="state" onChange={onAddressFormFieldsChange} />
                    <Form.Control.Feedback type="invalid">
                        Required
                                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} >
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                        value={address.zip}
                        name="zip" onChange={onAddressFormFieldsChange} />
                </Form.Group>
            </Form.Row>
        </Form.Group>
    )
}

export default AddressForm;