import React, {useState} from "react";
import {
    Button,
    Form,
    FormControl,
    FormGroup,
    FormLabel, Modal,
    ModalBody, ModalFooter,
    ModalTitle,
} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import axios from "axios";

function CreateUser(props) {
    const [valueUsername, setUsername] = useState("")
    const changeInputUsername = event => {
        event.persist()
        setUsername(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://0.0.0.0:8095/api/users/`, {
            user_name: valueUsername.user_name,
            group: props.valueGroup.group,
        })
            .then(() => {
                props.handleShow();
                window.location.href = "http://localhost:3000/users/"
            }).catch((error) => {for (let [key, value] of Object.entries(error.response.data))
                alert(key + ':' + value)
            })
    }

    return (
        <Modal show={props.show} onHide={props.handleShow} onSubmit={handleSubmit}>
            <ModalHeader closeButton style={{alignItems: 'normal', display: 'block'}}>
                <ModalTitle style={{float:'left', marginRight:155, marginLeft:175}}>New User</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <FormLabel>User name</FormLabel>
                        <FormControl type="user_name" id="user_name" name="user_name" placeholder='Enter name'
                                     value={valueUsername.user_name}
                                     onChange={changeInputUsername}/>
                    </FormGroup>
                    <Form.Group className="mb-3" style={{marginTop:10}}>
                        <Form.Label htmlFor="disabledSelect">Group</Form.Label>
                        <Form.Select id="group" name="group" placeholder='Select Group'
                                     value={props.valueGroup.group}
                                     onChange={props.changeSelectGroup}>
                            <option disabled selected>Change Group</option>
                            {props.listGroup}
                        </Form.Select>
                    </Form.Group>
                    <ModalFooter>
                        <Button type="submit">Create</Button>
                    </ModalFooter>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default CreateUser