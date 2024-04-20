import { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';

export function ConfirmAlert(props) {
    const [showAlert, setShowAlert] = useState("false")

    const { onConfirmClick, confirmMessage, onCancelClick } = props;

    return (
        <Alert variant="danger">
            <Alert.Heading>Please Confirm</Alert.Heading>
            <Button variant="light" onClick={onConfirmClick}>
                {props.confirmMessage}
            </Button>
            <Button variant="light" onClick={onCancelClick}>
                Cancel
            </Button>
            {props.message}
        </Alert>
    )
}