import React from 'react'
import './ConfirmDialog.css'

interface ConfirmDeleteDialogProps {
  open: boolean,
  label: string,
  callback: (confirm: boolean) => void
}
export const ConfirmDeleteDialog = ({ open, label, callback }: ConfirmDeleteDialogProps) => {



  function getUI(open: boolean) {
    if (open) {
      return (<div className='parent-confirm-dialog'>


        <div className="confirm-dialog shadow-sm">
          {label ? label : "Are You sure You Want to Delete?"}
          <div className="confirm-dialog-footer">
            <div className="confirm-dialog-cancel" onClick={(e) => { callback(false) }}>
              Cancel
            </div>
            <div className="confirm-dialog-proceed" onClick={(e) => { callback(true) }}>
              Yes
            </div>

          </div>

        </div>
      </div>)
    } else {
      return (<></>)
    }


  }
  return (

    <>
      {getUI(open)}
    </>

  )
}
