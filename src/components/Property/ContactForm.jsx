import { Card, Form, Button, Col, Modal } from 'react-bootstrap'
import { Formik, ErrorMessage, Field, getIn } from 'formik';

function ContactForm(props) {
    const { onContactFormFieldsChange, contact, formikProps } = props;
    const { isInvalid, errors } = formikProps;
    return (
        <Form.Group controlId="formGridAddress" className="bg-light ">
            <Form.Row>
                <Form.Group as={Col} >
                    <Form.Label>Personal Phone No.</Form.Label>
                    <Form.Control
                        value={contact.personalNumber}
                        required name="personalNumber" onChange={onContactFormFieldsChange} placeholder="Personal Number" />
                    <Form.Control.Feedback type="invalid">
                        Required
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Home Phone No.</Form.Label>
                    <Form.Control
                        value={contact.homeNumber}
                        name="homeNumber" onChange={onContactFormFieldsChange} placeholder="Home Number" />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Office Phone No.</Form.Label>
                    <Form.Control
                        value={contact.officeNumber}
                        name="officeNumber" onChange={onContactFormFieldsChange} placeholder="Office Number" />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} >
                    <Form.Label>Contact Email Address</Form.Label>
                    <Form.Control
                        value={contact.emailAddress}
                        required type="email" placeholder="abc@xyz.com" name="emailAddress" onChange={onContactFormFieldsChange} >
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Required
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
        </Form.Group>
    )
}

export default ContactForm;