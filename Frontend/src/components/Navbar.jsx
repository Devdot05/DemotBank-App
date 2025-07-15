import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
<nav class="navbar bg-col navbar-expand-md fixed-top text-black">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <Link to={"/"} className='nav-link text-light'>demotBank</Link>
      </a>
      <button class="navbar-toggler bg-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-end w-50 rounded-2 bg-black vh-100 text-white text-center" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <button type="button" class="btn-close text-white bg-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body" id="navbarNav">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
              <Link class="nav-link active text-white" aria-current="page" to={"/signup"}>signup</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link text-white" to={"/login"}>Login</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link text-white" to={"/about"}>About</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link text-white" to={"/contact"}>Contact</Link>
            </li>
          </ul>
          
        </div>
      </div>
    </div>
  </nav>
  )
}

export default Navbar