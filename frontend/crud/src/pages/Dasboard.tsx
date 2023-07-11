import React, { useState, useEffect, useContext } from 'react'
import { Card, CreateUserFormData, UserAddModal, CustomCreateButton, Table, AlertContext, AlertContextType, AlertType } from '../components'
import './Dashboard.css'
import { createUser, getUsers } from '../api'
import { User } from '../data/userlist'
import { useNavigate } from 'react-router-dom'



export const DasboardPage = () => {
  const [userList, setUserList] = useState<User[]>([])
  const [modalVisible, setModalVisible] = useState(false)
  const [formDisabled, setFormDisabled] = useState(false)
  const navigate = useNavigate()

  const { updateAlert } = useContext(AlertContext) as AlertContextType
  async function getUserApiCall() {
    const res = await getUsers()
    if (res.success === true) {
      setUserList(res.data!.user)
    }
  }
  function viewUser(user: User) {
    navigate('/user/' + user._id)
  }


  async function addUser(user: CreateUserFormData) {
    // console.log(user.isadult)
    setFormDisabled(true)
    const res = await createUser(user)
    if (res.success === true) {
      getUserApiCall()
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
  useEffect(() => {
    getUserApiCall()
  }, [])


  return (
    <div className='parent-div'>
      <CustomCreateButton text='Add User' callback={() => { setModalVisible(true) }}></CustomCreateButton>
      <div className='userlist-card'>
        <Card>
          <Table listObject={userList} actiontext='View' callback={viewUser} />
        </Card>
      </div>
      <UserAddModal disabled={formDisabled} modalVisible={modalVisible} setModalVisible={setModalVisible} onSubmit={addUser} />
    </div>
  )
}
