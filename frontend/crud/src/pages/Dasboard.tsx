import React, { useState, useEffect } from 'react'
import { Card, CreateUserFormData, UserAddModal, CustomCreateButton, Table } from '../components'
import './Dashboard.css'
import { createUser, getUsers } from '../api'
import { User } from '../data/userlist'



export const Dasboard = () => {
  const [userList, setUserList] = useState<User[]>([])
  const [modalVisible, setModalVisible] = useState(false)
  const [formDisabled, setFormDisabled] = useState(false)
  async function getUserApiCall() {
    const res = await getUsers()
    if (res.success === true) {
      setUserList(res.data!.user)
    }
  }
  function viewUser(user: User) {
    console.log(user)
  }
  async function addUser(user: CreateUserFormData) {
    setFormDisabled(true)
    const res = await createUser(user)
    if (res.success === true) {
      getUserApiCall()
      setModalVisible(false)
    } else {
      console.log(res.error![0].message)
    }
    setFormDisabled(false)
  }
  useEffect(() => {
    getUserApiCall()
  }, [])


  return (
    <div>
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
