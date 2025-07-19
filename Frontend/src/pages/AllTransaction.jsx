import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import TransactionHistory from '../components/TransactionHistory'
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AllTransaction = () => {
    const {currentUserId} = useParams()
    const [transaction, setTransaction] = useState([])
    const [showTransaction, setShowTransaction] = useState(false)
    const [selectedTransaction, setSelectedTransaction] = useState(null)
    const [loading, setLoading] = useState(false)
    const url = 'https://demotbank-app-1.onrender.com/transaction/transactions'
    useEffect(()=> {
        setLoading(true)
        // console.log(currentUserId);
        axios.get(url, {withCredentials: true})
        .then((res)=>{
            // console.log(res);
            setTimeout(() => {
              setLoading(false)
              setTransaction(res.data)
            }, 1000);
            
        })
        .catch((err) => {
            console.log(err);
            
        })
    }, [])

      const handleShowTransaction = (tx) => {
    setShowTransaction(true)
    setSelectedTransaction(tx);
    console.log(showTransaction);
    
  }

  const closeTx = () => {
    setShowTransaction(false)
    setSelectedTransaction(null)
  }
  return (
    <>
      <div>
        <h2 className="text-lg font-bold my-2 text-center">Transactions History</h2>
        <div className='col-11 col-md-10 col-lg-9 col-xl-9 col-xxl-9 mx-auto'>
          <p><Link to={`/dashboard/${currentUserId}`}><ArrowBackIcon/></Link></p>
 
        </div>

        <div className="">
        {loading ? (
          <div className='text-center'>
            <div class="spinner-border text-dark" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
          </div>
        ):transaction.length === 0 ? (
          <div className='center'>
            <p>No transaction yet</p>
          </div>

        ):(
          transaction.map((tx) => {
            const from = tx.fromUser;
            const to = tx.toUser;
            const isSender = from?._id?.toString() === currentUserId?.toString();
            const isReceiver = to?._id?.toString() === currentUserId?.toString();
            const date = new Date(tx.createdAt).toLocaleString();
            let message = '';
            let amount = '';
            let icon;
            switch (tx.type) {
              case 'transfer':
                if (isSender) {
                  // console.log(isSender);
                  message = `You transfer to ${to?.fullName.slice(0,4) + '.....' ?? 'unknown user'}`;
                  amount = `-${tx.amount} `;
                } else if (isReceiver) {
                    
                  message = `You received from ${from?.fullName.slice(0,4) + '.....' ?? 'unknown user'}`;
                    
                  amount = `+${tx.amount} `;
                  
                } else {
                   
                  message = `Transfer of`;
                }
                  icon = <CompareArrowsIcon className='text-success'/>
                  break;
                case 'deposit':
                  message = `You deposited`;
                  icon = <CallReceivedIcon className='text-primary'/>
                  amount = `+${tx.amount} `;
                  break;
                case 'withdrawal':
                  message = `You withdrew`;
                  icon = <CallMadeIcon className='text-warning'/>
                  amount = `-${tx.amount} `;
                  break;
                default:
                  message = `Unknown transaction type`;
              }
 
              return (
                <div key={tx._id} className="row col-11 col-md-10 col-lg-9 col-xl-9 col-xxl-9 mx-auto my-1">
                  <button className='btn border w-100' onClick={() => handleShowTransaction(tx)}>
                    <div className='row'>
                      <div className='col-1 my-3'>{icon}</div>
                      <div className='col-11'>
                        <div className='d-flex justify-content-between'>
                          <p className="">{message}</p>
                          <p>&#8358;{amount}</p>
                        </div>
                        <div className='d-flex justify-content-between align-item-center'>
                          <small className="">{date}</small>
                          <small className="">{tx.status}</small>
                        </div>

                      </div>
                    </div>
                  </button>
                </div>
              );
            })
          )
          }
          </div>
        </div>

         {
            showTransaction && selectedTransaction && (
              <TransactionHistory show={showTransaction} onClose={closeTx} currentUserId={currentUserId} eachTransaction = {selectedTransaction}/>
            )
          }
    </>
  )
}

export default AllTransaction