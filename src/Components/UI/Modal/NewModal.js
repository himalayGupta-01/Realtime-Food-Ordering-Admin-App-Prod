import React from 'react'
import { Modal, Button } from "react-bootstrap";

export default function NewModal(props) {
    return (
        <Modal size={props.size} show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.modelTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                { props.dontShowSubmitButton ? null:
                    <Button variant="primary" onClick={props.operation}>
                        Save Changes
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    )
}
