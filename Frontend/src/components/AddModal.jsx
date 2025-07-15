import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AddModal = ({show, onClose, account}) => {
  const credential = "https://demotbank-app-1.onrender.com/me"
  const [details, setDetails] = useState([])
  const [user, setUser] = useState([])
  useEffect(()=>{
    axios.get(credential, {
       withCredentials: true
    })
    .then((res)=>{
      console.log(res.data);
      setDetails(res.data.account)
      setUser(res.data.user)
    //   setAccount(res.data.account)
      
    }).catch((err)=>{
      console.log(err);
      
    })
  }, [])
  return (
    <>
        <div className="modal show fade d-block" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <div className="modal-dialog" style={{backgroundColor: '#6699E8'}}>
            <div className="modal-content"  >
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Your Details</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={onClose}></button>
            </div>
            <div className="modal-body">
                <div className='mb-3'>
                    <p>account Name: <strong>{user.fullName}</strong></p>
                    <p>Account Number: <strong>{details.accountNumber}</strong></p>
                </div>
                <div className='mb-3'>
                     
                </div>
            </div>
            <div className="modal-footer">
               
            </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default AddModal