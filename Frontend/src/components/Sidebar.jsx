import React, { useState } from 'react';
import '../css/sidebar.css';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Sidebar = ({userId}) => {
    // const [expanded, setExpanded] = useState(false);

    // const toggleSidebar = () => {
    //     setExpanded(!expanded);
    // };

    const user = JSON.parse(localStorage.getItem("users"))
    // const userId = user.userId
    

    return (
        <>
            <div className="position-fixed start-0 bg-white vh-100 d-flex flex-column p-2" style={{width:'200px', top: "60px", zIndex:10, borderRight: "1px solid #ddd"}}>
            <div className=' px-4'>
                <h3>Menu</h3>
                <Link to={`/dashboard/${userId}`} className='nav-link d-flex align-item-center mt-3 '>Dashboard</Link>
                <Link to={`/allTransaction/${userId}`} className='nav-link d-flex align-item-center mt-3 '>Transaction</Link>
                <Link to={`/goal`} className='nav-link d-flex align-item-center mt-3 '>My Goal</Link>
                <Link to={`/investment`} className='nav-link d-flex align-item-center mt-3 '>Investment</Link>
            </div>
            </div>
        </>
    );
};

export default Sidebar;
