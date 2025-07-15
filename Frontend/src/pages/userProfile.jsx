import React from 'react'
import { useParams } from 'react-router-dom'

const userProfile = () => {
   const {id} = useParams
  return (
    <div>user ID: {id}</div>
  )
}

export default userProfile