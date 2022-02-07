import React, {useEffect, useState} from 'react';
import {
    Button, Container,
    Table
} from "react-bootstrap";
import axios from "axios";

import CreateUser from "../Components/CreateUser";
import UpdateUser from "../Components/UpdateUser";

function Users() {

    const [show, setShow] = useState(false)
    const handleShow = () => setShow(!show)

    const [showEdit, setShowEdit] = useState(false)
    const handleShowEdit = () => setShowEdit(!showEdit)

    const [valueID, setValueId] = useState(null)
    const [valueName, setValueName] = useState(null)
    const showUpdate = (id, user_name) => {
        handleShowEdit()
        setValueId(id)
        setValueName(user_name)
    }

    const [valueUser, setUserData] = useState([])
    useEffect(() => {
        axios
            .get('http://0.0.0.0:8095/api/users/')
            .then((res) => {
                setUserData(res.data)
            })
    }, [])


    const listUser = valueUser.map((data) => {
        return <tr key={data.id}>
            <td>{data.user_name}</td>
            <td>{data.create_date}</td>
            <td>{data.group_name}</td>
            <td>
                <Button className='me-2' style={{padding:3, paddingRight:20, paddingLeft:20}}
                        onClick={() => handleDelete(data.id)}>Delete</Button>
                <Button style={{padding:3, paddingRight:20, paddingLeft:20}}
                        onClick={() => showUpdate(data.id, data.user_name)}>Edit</Button>
            </td>
        </tr>
    })


    const [groupData, setGroupData] = useState([])
    useEffect(() => {
        axios
            .get('http://0.0.0.0:8095/api/groups/')
            .then(res => setGroupData(res.data))
    }, [])

    const listGroup = groupData.map((data) => {
        return <option value={data.id} key={data.id}>{data.name}</option>;
    })

    const [valueGroup, setGroup] = useState("")
    const changeSelectGroup = event => {
        event.persist()
        setGroup(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

    const handleDelete = (id) => {
        axios.delete(`http://0.0.0.0:8095/api/users/${id}/`)
            .then(() => {
                window.location.href = "http://localhost:3000/users/"
            })
            .catch((error) => {
                alert(error.response.data);
            })
    }

    return (
        <div>
            <Container>
                <Table striped bordered hover style={{textAlign:"center", marginTop:25}}>
                    <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Create data</th>
                        <th>Group</th>
                        <th style={{width: 250}}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listUser}
                    </tbody>
                </Table>
                <Button  style={{width:100, float:"right"}} variant='outline-primary' onClick={handleShow}>New</Button>
            </Container>

            <CreateUser handleShow={handleShow}
                        show={show}
                        valueGroup={valueGroup}
                        changeSelectGroup={changeSelectGroup}
                        listGroup={listGroup}
                        />

            <UpdateUser showEdit={showEdit}
                        valueID={valueID}
                        handleShowEdit={handleShowEdit}
                        valueName={valueName}
                        valueGroup={valueGroup}
                        listGroup={listGroup}
                        changeSelectGroup={changeSelectGroup}
                        />
        </div>
    );
}

export default Users;