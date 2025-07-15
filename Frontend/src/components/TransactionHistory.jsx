import React, { useEffect, useState } from 'react'

const TransactionHistory = ({show, onClose, eachTransaction, currentUserId}) => {
  
    if (!eachTransaction) return null;

    const {
        amount,
        type,
        status,
        description,
        createdAt,
        fromUser,
        toUser,
        fromAccountNumber,
        toAccountNumber,
         
    } = eachTransaction;
        
    console.log(eachTransaction);
    
    const date = new Date(createdAt).toLocaleString();
    const isSender = fromUser?._id?.toString() === currentUserId?.toString();
    const isReceiver = toUser?._id?.toString() === currentUserId?.toString();
    let message = ''
    // let amount = ''
    switch(type) {
      case 'transfer':
      if (isSender) {
        console.log(isSender);
        message = `Transfer to ${toUser?.fullName ?? 'unknown user'}`;
        // amount = `-${tx.amount} `;
      } else if (isReceiver) {
        message = `Transfer from ${fromUser?.fullName ?? 'unknown user'}`;
        // amount = `+${tx.amount} `;
      } else {
        message = `Transfer of`;
      }
      break
      case 'deposit':
      message = `deposited to ${toUser?.fullName}`
      break
      case 'withdrawal':
      message = `withdraw from ${fromUser?.fullName}`
    }
  return (
    <>
      <div className={`modal fade ${show ? 'show d-block' : 'd-none'}`} tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Transaction Receipt</h1>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className='shadow px-1 py-2'>
                  <p className='text-center fs-6'>{message}</p>
                {/* <small>({fromAccountNumber.slice(0,3) + '****' + toAccountNumber.slice(-3)})</small> */}
                <p className='text-center fs-4'>&#8358;{amount}.00</p>
            </div>
            <div className='shadow p-3'>
                <p><strong>Transaction Type:</strong> {type}</p>
                <p><strong>Status:</strong> {status}</p>
                <p><strong>Date:</strong> {date}</p>
                {fromUser && (
                    <p className=''><strong>Sender</strong>: {fromUser.fullName} | {fromAccountNumber.slice(0,3) + '****' + fromAccountNumber.slice(-3)}</p>
                )}
                {toUser && (
                <p><strong>Receiver:</strong> {toUser.fullName} | {toAccountNumber.slice(0,3) + '****' + toAccountNumber.slice(-3)}</p>
                )}
                {description && (
                <p><strong>Description:</strong> {description}</p>
                )}

            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>

    </>
  )
}

export default TransactionHistory