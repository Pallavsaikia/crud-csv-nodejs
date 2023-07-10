import React, { useRef, MutableRefObject } from 'react'
import './UserAddModal.css'
import { IconAnimate } from '../icon'
import close from '../../assets/icons/close.svg'
import { EditText, SubmitButton } from '../inputfields'
import { Switch } from '../switch'

interface UserAddModalProps {
  onSubmit: (data: CreateUserFormData) => void
  modalVisible: boolean,
  disabled: boolean
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export interface CreateUserFormData {
  firstname: string,
  lastname: string,
  email: string,
  age: number,
  isadult: boolean
}

export const UserAddModal = ({ disabled, modalVisible, setModalVisible, onSubmit }: UserAddModalProps) => {
  const firstname = useRef() as MutableRefObject<HTMLInputElement>
  const lastname = useRef() as MutableRefObject<HTMLInputElement>
  const email = useRef() as MutableRefObject<HTMLInputElement>
  const age = useRef() as MutableRefObject<HTMLInputElement>
  const isAdult = useRef() as MutableRefObject<HTMLInputElement>
  function formSubmitted(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(firstname.current!.value)
    onSubmit({
      firstname: firstname.current.value,
      lastname: lastname.current.value,
      email: email.current.value,
      age: parseInt(age.current.value),
      isadult: isAdult.current.value === "true"

    })
  }

  if (modalVisible) {
    return (
      <div className='modal-shadow'>
        <div className='modal-card'>
          <div className='modal-header'>
            <span>Add User</span>
            <IconAnimate src={close} onClick={(e) => { setModalVisible(false) }} />
          </div>
          <form onSubmit={(e) => formSubmitted(e)}>
            <EditText reference={firstname} placeholder="First Name" top={4}></EditText>
            <EditText reference={lastname} placeholder="Last Name" top={0}></EditText>
            <EditText reference={email} placeholder="Email ID" top={0}></EditText>
            <EditText reference={age} placeholder="Age" type='number' top={0}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => { e.target.value = e.target.value.replace(/\D+/g, '') }}></EditText>
            <div className='div-switch'>
              <Switch reference={isAdult} defaultVal={false} text="Is An Adult?"></Switch>
            </div>
            <SubmitButton disabled={disabled} text="Create" top={5} />
          </form>

        </div>
      </div>
    )
  } else {
    return null
  }

}
