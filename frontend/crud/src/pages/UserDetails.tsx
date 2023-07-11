import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { deleteByID, getUserByID, updateUserByID } from '../api';
import { UserDetails } from '../data/get-user-by-id';
import { AlertContext, AlertContextType, AlertType, Card, ConfirmDeleteDialog, CreateUserFormData, CustomCreateButton, EditButton, SubmitButton, UserAddModal } from '../components';
import './UserDetails.css'


export const UserDetailsPage = () => {
    const { id } = useParams();
    const [user, setUser] = useState<UserDetails | null>(null)
    const [open, setOpen] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [formDisabled, setFormDisabled] = useState(false)
    const navigate = useNavigate()
    const { updateAlert } = useContext(AlertContext) as AlertContextType
    async function getUserByIDApiCall(id?: string) {
        if (id) {
            const res = await getUserByID(id)
            if (res.success === true) {
                setUser(res.data!.user)

            }
        }
    }

    async function deleteUser(id?: string) {
        if (id) {
            setOpen(true)
        }
    }
    async function confirmDelelteApiCall(confirm: boolean) {
        setOpen(false)
        if (confirm) {
            if (id) {
                const res = await deleteByID(id)
                if (res.success === true) {
                    updateAlert({
                        message: res.message,
                        type: AlertType.success
                    })
                    navigate('/')

                } else {
                    updateAlert({
                        message: res.message,
                    })
                }
            }
        }
    }

    async function updateUser(user: CreateUserFormData) {
        setFormDisabled(true)
        if (id) {
            const res = await updateUserByID(user, id)
            if (res.success === true) {
                setUser(res.data!.user!)
                setModalVisible(false)
                updateAlert({
                    message: res.message,
                    type: AlertType.success
                })
            } else {
                updateAlert({
                    message: res.error![0].message.toString()
                })
            }
            setFormDisabled(false)
        }

    }

    useEffect(() => {
        getUserByIDApiCall(id)
    }, [])
    if (user) {
        return (

            <div className='parent-div'>
                <CustomCreateButton danger={true} text='Delete User' callback={() => { deleteUser(id) }}></CustomCreateButton>
                <div className='userlist-card'>

                    <Card>
                        <div className="card-custom">
                            <div className='header-card'>
                                <h1>
                                    User Details
                                </h1>
                                <div>
                                    <EditButton text='Edit' callback={() => { setModalVisible(true) }}></EditButton>
                                </div>
                            </div>

                            <table className="table table-custom">
                                <tbody>
                                    <tr>
                                        <td><p><strong>User id:</strong></p></td>
                                        <td><p>{user._id}</p></td>
                                    </tr>
                                    <tr>
                                        <td><p><strong>First Name:</strong></p></td>
                                        <td><p>{user.firstname}</p></td>
                                    </tr>
                                    <tr>
                                        <td><p><strong>Last Name:</strong></p></td>
                                        <td><p>{user.lastname}</p></td>
                                    </tr>
                                    <tr>
                                        <td><p><strong>Email:</strong></p></td>
                                        <td><p>{user.email}</p></td>
                                    </tr>
                                    <tr>
                                        <td><p><strong>Age:</strong></p></td>
                                        <td><p>{user.age} yrs</p></td>
                                    </tr>
                                    <tr>
                                        <td><p><strong>Adult:</strong></p></td>
                                        <td><p>{user.isAdult ? "yes" : "no"} </p></td>
                                    </tr>
                                    <tr>
                                        <td><p><strong>Created At:</strong></p></td>
                                        <td><p>{new Date(user.createdAt).toString()}</p></td>
                                    </tr>
                                    <tr>
                                        <td><p><strong>Updated At:</strong></p></td>
                                        <td><p>{new Date(user.updatedAt).toString()}</p></td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </Card>

                </div>

                <UserAddModal data={user} disabled={formDisabled} modalVisible={modalVisible} setModalVisible={setModalVisible} onSubmit={updateUser} />
                <ConfirmDeleteDialog open={open} label='Are you sure you want to delete?' callback={(confirm) => { confirmDelelteApiCall(confirm) }}></ConfirmDeleteDialog>
            </div>
        )
    } else {
        return null
    }

}
