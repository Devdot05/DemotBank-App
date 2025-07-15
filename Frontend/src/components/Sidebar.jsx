import React, { useState } from 'react';
// import '../css/side';
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
            <div className={`sidebar d-flex flex-column p-2`}>
                 <div className='d-block'>
                <p>welcome, {user.fullName}</p>
            </div>
            <div className=' px-4'>
                <h3>Menu</h3>
                <Link to={`/dashboard/${userId}`} className='nav-link'>Dashboard</Link>
                <Link to={`/allTransaction/${userId}`} className='nav-link'>Transaction</Link>
                <Link to={`/goal`} className='nav-link'>My Goal</Link>
                <Link to={`/investment`} className='nav-link'>Investment</Link>
            </div>
            </div>
        </>
    );
};

export default Sidebar;
