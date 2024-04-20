import React, { useState } from 'react';
import { Card, Form, Button, Modal, Col } from 'react-bootstrap'

const featureFormJson = {
    featureCode: {
        type: "select"
    },
    name: {
        type: "text"
    },
    value: {
        type: "text"
    }
}

function FeatureBuilder(props) {
    const [state, setState] = useState({

    })
    let buildForm = () => {
        let elements = [];
        for (const formJson in featureFormJson) {
            elements.push(

                <Form.Group as={Col} controlId="formGridTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" onChange={onPropertyFormFieldsChange} placeholder="Enter Title" onChange />
                </Form.Group>

            )
        }
        return (
            <Form.Row>
                {elements}
            </Form.Row>
        )
    }

    return (
        <Form.Group controlId="formGridDescription">
            {buildForm}
        </Form.Group>
    )
}