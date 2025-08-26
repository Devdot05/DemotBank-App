import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import UserNav from '../components/UserNav'
import '../css/Dashboard.css'
// import '../css/Sidebar.css'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import TransactionModal from '../components/TransactionModal'
import AddModal from '../components/AddModal'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import CallMadeIcon from '@mui/icons-material/CallMade';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TransactionHistory from '../components/TransactionHistory'
import Nav from '../components/Nav'


const Dashboard = () => {
  const credential = "https://demotbank-app-1.onrender.com/me"

  const {id} = useParams()
  const navigate = useNavigate()

  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [account, setAccount] = useState('')
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [showDetails, setShowDetails] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0);
  const [showBalance, setShowBalance] = useState(true)
  const [getRecent, setGetRecent] = useState([])
  const [currentUserId, setCurrentUserId] = useState(null)
  const [showTransaction, setShowTransaction] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [showSidebar, setShowSidebar] = useState(false)
  const [loading, setLoading] = useState(false)


  const user = JSON.parse(localStorage.getItem('users'))
  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
    
    
    
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
  };

  const toggleVisibility = () => {
      setShowBalance(prev => !prev)
  };

  useEffect(()=>{
    // console.log(close);
    const txId = JSON.parse(localStorage.getItem('txId'))
    // console.log(txId);
    
     fetchAccount()
     fetchRecentTransaction()
  }, [refreshKey])

  const fetchAccount = () => {
    axios.get(credential, {
      withCredentials: true
     })
    .then((res)=>{
       
      setAccount(res.data.account)
      setCurrentUserId(res.data.user.id)
      
    }).catch((err)=>{
      if(err.response.status === 401) {
        navigate('/login')
      };
      
    })
  }

  const handleMoneyAdded = () => {
    setShowDetails(true)
    
  }

  const close = () => {
    setShowDetails(false)
    // console.log(showDetails);
    
  }
    //To make the balance update in fronted
  const handleTransactionComplete = () => {
     console.log("Transaction complete! Refreshing...")
  setRefreshKey(prev => prev + 1);
};

  const fetchRecentTransaction = () => {
    setLoading(true)
    axios.get(`https://demotbank-app-1.onrender.com/transaction/recent`, {withCredentials: true})
    .then((res)=> {
       
      setTimeout(() => {
        setGetRecent(res.data)
        setLoading(false)
      }, 1000);
      
    }).catch((err)=>{
      console.log(err);
      if(err.message){
        console.log(err.message);
        
      }
      
    })
  }

  const handleShowTransaction = (tx) => {
    setShowTransaction(true)
    setSelectedTransaction(tx);
    // console.log(showTransaction);
    
  }

  const closeTx = () => {
    setShowTransaction(false)
    setSelectedTransaction(null)
  }

  const handleTransactionHistory = () => {
    navigate(`/allTransaction/${currentUserId}`)
  }

  const displaySidebar = () => {
    setShowSidebar(prev => !prev)
    console.log(showSidebar);
    
  }
 
   useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString("en-NG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = currentTime.toLocaleTimeString("en-NG", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,  
  });

  
  
 
  return (
    <>

       
      {/* Big size*/}
        <Nav/>
      <section className='container-fluid sec_dash d-none d-md-block'>
        <div className=''>
          <Sidebar userId={currentUserId}/>
        </div>
        <div className=' row col-lg-12 col-xl-9 col-xxl-9 my-4'>
          <div className='col-6 mt-2'>
            <h5>Welcome! {user.fullName}</h5>
          </div>
           <div className='col-6 mx-auto text-center bg-primary text-light rounded-pill'>
            <div className=' gap-3 d-flex mt-2 ms-3'>
              <p>{formattedTime}</p>
              <p>{formattedDate}</p>
            </div>
          </div>
        </div>
        <div className='row bg-info rounded-4 p-4 col-lg-12 col-xl-9 col-xxl-9'>
          <div className="col-8">
            <div className="col-6 col-sm-8">
              <p>Total Balance</p>
            </div>
            {loading ? (
              <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
              </div>
            ): 
            (
              <h3>{showBalance ? `₦${account.balance}` : '*****'}</h3>
                  
            )}
          </div>
          <div className='col-4 mb-2'>
            <button className='btn btn-secondary' onClick={handleMoneyAdded}> <AddIcon/> Add Money</button>
          </div>
          <div className="col-10">
            <button className="btn btn-success me-2" onClick={() => openModal('transfer')}> <CompareArrowsIcon/>&nbsp; Transfer</button>
            <button button className="btn btn-primary me-2" onClick={() => openModal('deposit')}> <CallReceivedIcon/>&nbsp; Deposit</button>
            <button className="btn btn-warning" onClick={() => openModal('withdraw')}><CallMadeIcon/>&nbsp; Withdraw</button>
          </div>
          <div className='col-2 p-2'>
            <button className='btn btn-info' onClick={toggleVisibility}>{showBalance ?<VisibilityIcon/> : <VisibilityOffIcon/>}</button>
            </div>
          {showModal && (
        <TransactionModal type={modalType} onClose={closeModal} accountNumber={account.accountNumber} show={showModal} getAccount ={handleTransactionComplete}/>
      )}
            {showDetails && (
          <AddModal  onClose={close}  show={showDetails}/>
        )}
        </div>
        <div>
          <div className='text-center col-12 col-lg-12 col-xl-9 col-xxl-9'>
            <h2 className="text-lg font-bold mb-2">Recent Transactions</h2>
          </div>
          <div className='col-12 col-lg-12 col-xl-9 col-xxl-9 d-flex justify-content-end mbtn da'>
            <button onClick={()=>handleTransactionHistory()} className='btn btn-outline-dark'>view all transaction</button>
          </div>

          <div className="">
          {loading ? (
            <div className='text-center'>
              <div class="spinner-border text-dark" role="status">
              <span class="visually-hidden">Loading...</span>
              </div>
            </div>

          ): getRecent.length === 0 ? (
            <p>No transaction yet</p>
          ):( 
            getRecent.map((tx) => {
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
                 
                <div key={tx._id} className="row col-lg-12 col-xl-9 col-xxl-9 p my-1">
                  
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
      </section>
        
      {showModal && (
        <TransactionModal type={modalType} onClose={closeModal} accountNumber={account.accountNumber} show={showModal} getAccount ={handleTransactionComplete}/>
      )}
      {showDetails && (
        <AddModal  onClose={close}  show={showDetails}/>
      )}
      {
        showTransaction && selectedTransaction && (
        <TransactionHistory show={showTransaction} onClose={closeTx} currentUserId={currentUserId} getRecent={getRecent} eachTransaction = {selectedTransaction}/>
      )}
    
          


      {/* Small Screen */}
      <section className='container-fluid d-block d-md-none pt-5'>
        <div className='sidb'>
          <UserNav sidebarDisplay = {displaySidebar} />
        </div>
        <div className=''>
          {showSidebar && <Sidebar userId={currentUserId}/>}
        </div>
        
        <div className=' row mt-4 col-lg-12 col-xl-9 col-xxl-9 text-center'>
          <div className='col-12'>
            <h5>Welcome! {user.fullName}</h5>
          </div>
          <div className='col-10 mx-auto text-center bg-primary text-light rounded-pill'>
            <div className='pt-2'>
              <p><span>{formattedTime}</span>&nbsp; &nbsp; &nbsp;<span>{formattedDate}</span></p>
              
            </div>
          </div>
        </div>
          <div className="row bg-info mt-2 rounded-4 pt-4 pb-3 mx-1">
              <div className="col-6 col-sm-8">
                <p>Total Balance</p>
              </div>
            <div className='col-6 col-sm-4'>
              <button className='btn btn-secondary' onClick={handleMoneyAdded}> <AddIcon/> Add Money</button>
            </div>
            <div className="col-8">
            {loading ? (
              <div class="spinner-border text-light" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            ): 
            (
              <h3>{showBalance ? `₦${account.balance}` : '*****'}</h3>
                  
            )}
          </div>
            <div className='col-4 p-2'>
            <button className='btn btn-info' onClick={toggleVisibility}>{showBalance ?<VisibilityIcon/> : <VisibilityOffIcon/>}</button>
            </div>
          </div>
          <div className="row">
            <button button className="col-11 mx-auto gap-3 bg-white  rounded-4 p-2 border border-1 my-2 d-flex" onClick={() => openModal('transfer')}> 
              <div className=' btn btn-success mt-2' style={{height: '50px'}}>
                <CompareArrowsIcon/>
              </div>
              <div className='text-start' style={{padding: 0}}>
                 <h5>Transfer</h5>
                 <p>Send money to other </p>
              </div>
              
            </button>
            <button button className="col-11 mx-auto gap-3 bg-white  rounded-4 p-2 border border-1 my-2 d-flex" onClick={() => openModal('deposit')}> 
              <div className=' btn btn-primary mt-2' style={{height: '50px'}}>
                <CallReceivedIcon/>
              </div>
              <div className='text-start' style={{padding: 0}}>
                 <h5>Deposit</h5>
                 <p>Add money to the account </p>
              </div>
            </button>
            <button button className="col-11 mx-auto gap-3 bg-white  rounded-4 p-2 border border-1 my-2 d-flex" onClick={() => openModal('withdraw')}> 
              <div className=' btn btn-warning mt-2' style={{height: '50px'}}>
                <CallMadeIcon/>
              </div>
              <div className='text-start' style={{padding: 0}}>
                 <h5>Withdraw</h5>
                 <p>Take money out</p>
              </div>
            </button>
          </div>
          
        {showModal && (
        <TransactionModal type={modalType} onClose={closeModal} accountNumber={account.accountNumber} show={showModal} getAccount ={handleTransactionComplete}/>
        )}
            {showDetails && (
          <AddModal  onClose={close}  show={showDetails}/>
        )}
        {/* {
          showTransaction && selectedTransaction && currentUserId && (
            <TransactionHistory show={showTransaction} onClose={closeTx} currentUserId={currentUserId} getRecent={getRecent} eachTransaction = {selectedTransaction}/>
          )
        } */}
        {/* </div> */}
         
        <div>
          <div className='text-center my-3'>
            <h2 className="text-lg font-bold mb-2">Recent Transactions</h2>
          </div>
          <div className='d-flex justify-content-end col-11 mx-auto pb-2'>
            <button onClick={()=>handleTransactionHistory()} className='btn btn-outline-dark'>view all transaction</button>
          </div>

          <div className="">
          {loading ? (
            <div className='text-center'>
              <div class="spinner-border text-dark" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>
            </div>
          ): getRecent.length === 0 ? (
            <p>No transaction yet</p>

          ):(
            getRecent.map((tx) => {
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
                    
                    message = `You transfer to ${to?.fullName?.slice(0,5) + '.....' ?? 'unknown user'}`;
                    amount = `-${tx.amount} `;
                  } else if (isReceiver) {
                    message = `You received from ${from?.fullName?.slice(0,5) + '.....' ?? 'unknown user'}`;
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
                <div key={tx._id} className="row col-11 mx-auto p my-1">
                  
                  <button className='btn border border-2 w-100' onClick={() => handleShowTransaction(tx)}>
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
      </section>
      
      
         
    </>
  )
}

export default Dashboard