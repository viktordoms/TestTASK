import React, {useEffect, useState} from 'react';
import {Button, Container, Table} from "react-bootstrap";
import axios from "axios";


import CreateGroup from "../Components/CreateGroup";
import UpdateGroup from "../Components/UpdateGroup";

function Groups() {

    const [show, setShow] = useState(false)
    const handleShow = () => setShow(!show)

    const [showEdit, setShowEdit] = useState(false)
    const handleShowEdit = () => setShowEdit(!showEdit)

    const [valueID, setValueId] = useState(null)
    const [valueName, setValueName] = useState(null)
    const [valueDescription, setValueDescription] = useState(null)
    const showUpdate = (id, name, description) => {
        handleShowEdit()
        setValueId(id)
        setValueName(name)
        setValueDescription(description)
    }

    const [groupData, setGroupData] = useState([])
    useEffect(() => {
        axios
            .get('http://0.0.0.0:8095/api/groups/')
            .then(res => setGroupData(res.data))
    }, [])

    const listGroup = groupData.map((data) => {
        return <tr key={data.id}>
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>{data.description}</td>
            <td>
                <Button className='me-2' style={{padding: 3, paddingRight: 20, paddingLeft: 20}}
                        onClick={() => handleDelete(data.id)}>Delete</Button>
                <Button style={{padding: 3, paddingRight: 20, paddingLeft: 20}}
                        onClick={() => showUpdate(data.id, data.name, data.description)}>Edit</Button>
            </td>
        </tr>
    })

    const handleDelete = (id) => {
        axios.delete(`http://0.0.0.0:8095/api/groups/${id}/`)
            .then(()=> {
                window.location.href = "http://localhost:3000/groups/"
            })
            .catch((err) => {
                console.log(err)
                alert(err.response.data);
            })
    }

    return (
        <div>
            <Container>
                <Table striped bordered hover style={{textAlign: "center", marginTop: 25}}>
                    <thead>
                    <tr>
                        <th style={{width:60}}>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th style={{width: 250}}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listGroup}
                    </tbody>
                </Table>
                <Button style={{width: 100, float: "right"}} variant='outline-primary' onClick={handleShow}>New</Button>
            </Container>

            <CreateGroup handleShow={handleShow}
                         show={show}
            />

            <UpdateGroup showEdit={showEdit}
                         valueID={valueID}
                         handleShowEdit={handleShowEdit}
                         valueName={valueName}
                         valueDescription={valueDescription}
            />
        </div>
    );
}

export default Groups;