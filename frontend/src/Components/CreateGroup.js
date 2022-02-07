import React, {useState} from 'react';
import axios from "axios";
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


function CreateGroup(props) {
    const [valueGroup, setGroup] = useState("")
    const changeInputGroup = event => {
        event.persist()
        setGroup(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://0.0.0.0:8095/api/groups/`, {
            name: valueGroup.name,
            description: valueGroup.description,
        })
            .then(() => {
                props.handleShow();
                window.location.href = "http://localhost:3000/groups/"
            }).catch((error) => {for (let [key, value] of Object.entries(error.response.data))
            alert(key + ':' + value)
            })
    }

    return (
            <Modal show={props.show} onHide={props.handleShow} onSubmit={handleSubmit}>
                <ModalHeader closeButton style={{alignItems: 'normal', display: 'block'}}>
                    <ModalTitle style={{float:'left', marginRight:140, marginLeft:175}}>New Group</ModalTitle>
                </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <FormLabel>Name</FormLabel>
                                <FormControl type="name" id="name" name="name"
                                             placeholder='Enter name'
                                             value={valueGroup.name}
                                             onChange={changeInputGroup}/>
                            </FormGroup>
                            <FormGroup style={{marginTop:10}}>
                                <FormLabel>Description</FormLabel>
                                <FormControl type="description" id="description" name="description"
                                             placeholder='Enter description'
                                             value={valueGroup.description}
                                             onChange={changeInputGroup}/>
                            </FormGroup>
                            <ModalFooter>
                                <Button type="submit">Create</Button>
                            </ModalFooter>
                        </Form>
                    </ModalBody>
            </Modal>
    )
}

export default CreateGroup;