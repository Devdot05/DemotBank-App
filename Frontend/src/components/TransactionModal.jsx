import React from 'react';
import TransferForm from './TransferForm';
import DepositForm from './DepositForm';
import WithdrawForm from './WithdrawForm';

function TransactionModal({ show, onClose, type, accountNumber, getAccount }) {
  const getTitle = () => type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Transaction';

  // const handleSuccess = () => {
  //   alert('Transaction successful!');
  //   onClose();
  // };
// console.log(onClose);

  return (
    <>
      {show && <div className="modal-backdrop fade show"></div>}

      <div className={`modal fade ${show ? 'show d-block' : 'd-none'}`} tabIndex="-1" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{getTitle()}</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              {type === 'transfer' && <TransferForm fromAccountNumber={accountNumber} transactionType={type} onTransactionComplete={getAccount} onClose={onClose}/>}
              {type === 'deposit' && <DepositForm toAccountNumber={accountNumber} onTransactionComplete={getAccount} onClose={onClose} />}
              {type === 'withdraw' && <WithdrawForm fromAccountNumber={accountNumber} onTransactionComplete={getAccount} onClose={onClose} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TransactionModal;
