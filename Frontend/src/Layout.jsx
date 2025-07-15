import React from 'react'
import Navbar from './components/Navbar'
import './css/Layout.css'
import { Link } from 'react-router-dom';
import Nav from './components/Nav';

const Layout = () => {
  return (
    <>
      <div className=''>
      </div>
        <Navbar/>
      <main className='container-fluid bg-black'>
          <div className="row section bg-black text-light">
            <div className=' col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
              <div className='h1'>
                <h1>Bank Smarter Anywhere, Anytime</h1>
              </div>
              <div className='my-4'>
                <p className='fs-4 me-3'>Experience seamless banking with demot. Manage your finances effortlessly, no matter where you are all over the world</p>
              </div>
              <div className='mb-3'>
                <button className='btn btn-success'><Link to={'signup'} className='nav-link'>Bank Now</Link></button>
              </div>
            </div>
            <div id="carouselExampleAutoplaying" class="carousel slide carousel-fade col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6" data-bs-ride="carousel">
              <div class="">
                <div class="carousel-item active">
                  <img src="images/bank 1.jpeg" class=" w-full rounded-3 img" alt="..."/>
                </div>
                <div class="carousel-item">
                  <img src="images/bank 2.jpeg" class=" w-full rounded-3 img" alt="..."/>
                </div>
              </div>
            </div>
          </div>
         
          <div className="row text-white  d-flex flex-column flex-sm-row bg-black text-white">
            <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 order-2 order-md-1 text-center">
              <img src="images/bank 3.jpg" alt="" className='image'/>  
            </div>
            <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 order-1 order-md-2">
              <div className='made'>
                <h2 className='fw-bold'>Banking Made Effortless</h2>
                <p>Experience seamless financial management with demotBank. Our banking app offers intuitive features, ensuring your banking needs are met with ease and security. Enjoy hassle-free transactions, instant alerts, and personalized financial insights—all at your fingertips. Simplify your banking experience today with demotBank.</p>
              <div>
                <button className='btn btn-outline-light rounded-pill fs-5'>Contact</button>
              </div>
              </div>
            </div>
          </div>
         
          <div className="row bg-black text-white">
            <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 bg-black">
              <div className='made'>
                <h2 className='fw-bold'>Bank Smarter, Live Better</h2>
                <p>Experience seamless banking with demotBank's intuitive app. Manage your finances effortlessly, anytime, anywhere. Enjoy secure transactions, real-time alerts, and personalized insights that help you make smarter financial decisions. Join demotBank today and take control of your financial future.</p>
                <div className='mt-3'>
                  <button className='btn btn-outline-light rounded-pill fs-5'>Contact</button>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 text-center">
              <img src="images/bank-4.jpg" alt="" className='image'/>  
            </div>
          </div>
         
          <div className="row bg-black text-white  d-flex flex-column flex-sm-row">
            <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 order-2 order-md-1 text-center">
              <img src="images/bank-5.jpg" alt="" className='image'/>  
            </div>
            <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 bg-black order-1 order-md-2">
              <div className='made'>
                <h2 className='fw-bold'>Banking Made Effortless</h2>
                <p>Experience the future of finance with demotBank. Our banking app offers seamless transactions, instant notifications, and secure account management—all at your fingertips. Simplify your financial life and stay in control, anytime, anywhere.</p>
              <div>
                <button className='btn btn-outline-light rounded-pill fs-5'>Contact</button>
              </div>
              </div>
            </div>
          </div>
     

          <div className="row text-white my-5 py-5 px-3" style={{backgroundColor:' #0D0CB5'}}>
            <div className="col-12 text-center">
              <h2 className='font'>Manage Financial Effortlessly</h2>
            </div>
            <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-5" data-aos="zoom-in" data-aos-easing="ease-out-cubic"data-aos-duration="2000">
              <div>
                <img src="/images/bank-6.jpg" alt="" className='w-100 rounded-5' height={'370px'}/>
              </div>
              <div className='mt-3'>
                <h3>Easy Account Management</h3>
                <p>Access and manage your accounts seamlessly with our user-friendly interface.</p>
                <button className='btn btn-outline-light rounded-pill '>More info</button>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-5" data-aos="zoom-in" data-aos-easing="ease-out-cubic"data-aos-duration="2000">
              <div>
                <img src="/images/bank-7.jpg" alt="" className='w-100 vh-50 rounded-5' height={'370px'}/>
              </div>
              <div className='mt-3'>
                <h3>Easy Transactions</h3>
                <p>Transfer money, pay bills, and manage payments effortlessly with just a few taps.</p>
                <button className='btn btn-outline-light rounded-pill '>More info</button>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-5" data-aos="zoom-in" data-aos-easing="ease-out-cubic"data-aos-duration="2000">
              <div>
                <img src="/images/bank-8.jpg" alt="" className='w-100 vh-50 rounded-5' height={'370px'}/>
              </div>
              <div className='mt-3'>
                <h3>Account Security</h3>
                <p>Keep your accounts safe with robust security features like biometric login, two-factor authentication, and real-time fraud alerts.</p>
                <button className='btn btn-outline-light rounded-pill '>More info</button>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-5" data-aos="zoom-in" data-aos-easing="ease-out-cubic"data-aos-duration="2000">
              <div>
                <img src="/images/bank-9.jpg" alt="" className='w-100 vh-50 rounded-5' height={'370px'}/>
              </div>
              <div className='mt-3'>
                <h3>Smart Financial Insights </h3>
                <p>Track your spending, set savings goals, and get personalized insights to help you make smarter financial decisions.</p>
                <button className='btn btn-outline-light rounded-pill '>More info</button>
              </div>
            </div>
            
          </div>
      </main>
    
    </>
  )
}

export default Layout