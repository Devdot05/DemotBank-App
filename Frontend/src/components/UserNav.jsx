import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';

const UserNav = ({sidebarDisplay}) => {
  return (
    <>
    
        <nav className="navbar bg-body-tertiary navbar-expand-md fixed-top">
            <div className="container-fluid">
                <button onClick={sidebarDisplay} className='btn'>
                    <MenuIcon/>
                </button>
            <a className="navbar-brand" href="#">
                {/* <img src="/images/my-logo-removebg-preview.png" alt="" width="50px" /> */}
                <h3 className=''>demotBank </h3>
            </a>
            <button className="navbar-toggler bg-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="offcanvas offcanvas-end w-50 rounded-2 text-white text-center" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header">
                <button type="button" className="btn-close text-white bg-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body" id="navbarNav">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#home">Home</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link fs-4" href="#about">About</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link fs-4" href="#work"><i className="fa-solid fa-bell"></i></a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link fs-4" href="#resume"><i className="fa-solid fa-gear"></i></a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link fs-4" href="#contact"><i className="fa-solid fa-circle-user"></i></a>
                    </li>
                </ul>
                
                </div>
            </div>
            </div>
        </nav>
    </>
  )
}

export default UserNav