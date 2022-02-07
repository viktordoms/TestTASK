import React, {useState} from 'react';
import ModalHeader from "react-bootstrap/ModalHeader";
import {
    Button,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
    Modal,
    ModalBody,
    ModalFooter,
    ModalTitle
} from "react-bootstrap";
import axios from "axios";

function UpdateUser(props) {

    const [editName, setEditName] = useState("")
    const changeEditUsername = event => {
        event.persist()
        setEditName(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

    const handleEdit = (e) => {
        e.preventDefault()
        axios
            .put(`http://0.0.0.0:8095/api/users/${props.valueID}/`, {
                user_name: editName.user_name,
                group: props.valueGroup.group,
            })
            .then(() => {
                props.handleShowEdit();
                window.location.href = "http://localhost:3000/users/"
            })
            .catch((error) => {for (let [key, value] of Object.entries(error.response.data))
                alert(key + ':' + value)
            })
    }

    return (
        <Modal show={props.showEdit} onHide={props.handleShowEdit} onSubmit={(e) => handleEdit(e)}>
            <ModalHeader closeButton style={{alignItems: 'normal', display: 'block'}}>
                <ModalTitle style={{float:'left', marginRight:155, marginLeft:175}}>Edit User</ModalTitle>
            </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <FormLabel>User name</FormLabel>
                            <FormControl type="user_name" id="user_name" name="user_name"
                                         placeholder={props.valueName}
                                         value={editName.user_name}
                                         onChange={changeEditUsername}/>
                        </FormGroup>
                        <Form.Group className="mb-3" style={{marginTop:10}}>
                            <Form.Label htmlFor="disabledSelect">Group</Form.Label>
                            <Form.Select id="group" name="group"
                                         value={props.valueGroup.group}
                                         onChange={props.changeSelectGroup}
                                         >
                                <option disabled selected >Change Group</option>
                                {props.listGroup}
                            </Form.Select>
                        </Form.Group>
                        <ModalFooter>
                            <Button type="submit">Save</Button>
                        </ModalFooter>
                    </Form>
                </ModalBody>
        </Modal>
    );
}

export default UpdateUser;