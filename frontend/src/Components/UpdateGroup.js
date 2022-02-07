import React, {useState} from 'react';
import axios from "axios";
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
import ModalHeader from "react-bootstrap/ModalHeader";

function UpdateGroup(props) {

    const [editGroup, setEditGroup] = useState(() => {
        return {
            name: "",
            description: "",
        }
    })

    const changeInputGroup = event => {
        event.persist()
        setEditGroup(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

    const handleEdit = (e) => {
        e.preventDefault()
        axios
            .put(`http://0.0.0.0:8095/api/groups/${props.valueID}/`, {
                name: editGroup.name,
                description: editGroup.description,
            })
            .then(() => {
                props.handleShowEdit();
                window.location.href = "http://localhost:3000/groups/"
            })
            .catch((error) => {for (let [key, value] of Object.entries(error.response.data))
                alert(key + ':' + value)
            })
    }

    return (
        <Modal show={props.showEdit} onHide={props.handleShowEdit} onSubmit={(e) => handleEdit(e)}>
            <ModalHeader closeButton style={{alignItems: 'normal', display: 'block'}}>
                <ModalTitle style={{float:'left', marginRight:140, marginLeft:175}}>Edit Group</ModalTitle>
            </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <FormLabel>Name</FormLabel>
                            <FormControl type="name" id="name" name="name"
                                         placeholder={props.valueName}
                                         value={editGroup.name}
                                         onChange={changeInputGroup}/>
                        </FormGroup>
                        <FormGroup style={{marginTop:10}}>
                            <FormLabel>Description</FormLabel>
                            <FormControl type="description" id="description" name="description"
                                         placeholder={props.valueDescription}
                                         value={editGroup.description}
                                         onChange={changeInputGroup}/>
                        </FormGroup>
                        <ModalFooter>
                            <Button type="submit">Save</Button>
                        </ModalFooter>
                    </Form>
                </ModalBody>
        </Modal>
    )
}

export default UpdateGroup;