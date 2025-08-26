import React, { useState } from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import UserNav from '../components/UserNav'

const Investment = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  const user = JSON.parse(localStorage.getItem('users'))
  let userId = user.userId
  console.log(userId);
  const displaySidebar = () => {
    setShowSidebar(prev => !prev)
    console.log(showSidebar);
    
  }
  return (
    <>
      <section className='d-none d-md-block'>
        <Nav/>
        <Sidebar userId={userId}/>
        <div className='text-center mt-5 pt-5'>Investment is working</div>
      </section>

      <section className='d-md-none'>
        <UserNav sidebarDisplay={displaySidebar}/>
        {showSidebar && <Sidebar userId={userId}/>}
        
        <div className='text-center mt-5 pt-5'>Investment is working</div>
      </section>
    
    </>
  )
}

export default Investment