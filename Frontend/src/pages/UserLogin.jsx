import { useFormik } from 'formik'
import React, { useState } from 'react'
import '../css/Signup.css'
import axios from "axios"
import {useNavigate} from "react-router-dom"




const UserLogin = () => {
    const [profile, setProfile] = useState("")
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)  
    const [currentUserId, setCurrentUserId] = useState(null)
    
    const navigate = useNavigate()
    const login_url = "https://demotbank-app-1.onrender.com/login"

    const user = JSON.parse(localStorage.getItem('users'))
    // console.log(user);
    
    
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            
        },

        onSubmit: (values) =>{
            // console.log(values);
            setLoading(true)
            axios.post(login_url, values , {
                withCredentials: true
            })
            .then((res)=>{
                // console.log(res);
                if(res.status == 200){
                    // console.log("user found", res);
                    localStorage.tokens = res.data.token
                    let user = {
                        fullName: res.data.user.fullName,
                        email: res.data.user.email,
                        phone_number: res.data.user.phoneNumber,
                        userId: res.data.user.id 
                    }
                    setCurrentUserId(res.data.user.id)

                    localStorage.setItem('users', JSON.stringify(user))
                    let userId = user.userId
                    setProfile(res.data.user.fullName)
                    setTimeout(() => {
                        navigate(`/dashboard/${userId}`)
                        setLoading(false)
                        
                    }, 1000);
                    
                }else{
                    
                }
            })
            .catch((err)=>{
                if(err)
                    console.log("Axios error, How can work now",err.response.data.message);
                setMessage(err.response.data.message);
                setLoading(false)
                console.log(err);
                
            })
            
        },  
    })
    // console.log(formik.errors);
  return (
    <>
            {loading? (
                <div className='text-center background vh-100' style={{paddingTop: "300px"}}>
                    <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ):
            (
                <section className='container-fluid background2'>
                    <div className='row col-xl-9 col-xxl-9 col-lg-9 col-md-10 col-11  rounded-5 mx-auto shadow'>
                        <div className='d-none d-md-block col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 bg rounded-5 text-center'>
                            <div className='bg-2 rounded-5'>
                                <h2>Get Demot Account</h2>
                                <p>To signin, please type in the necessary details when needed</p>
                            </div>
                        </div>
                        <form action="" onSubmit={formik.handleSubmit} className='col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 py-4'>
                            <h2 className='text-center'> Sign In </h2>
                            <p className='text-danger text-center'>{message}</p>
                            <label htmlFor="" className=''>Email</label>
                            <input
                                type="email"
                                placeholder='example@gmail.com'
                                className={formik.errors.email ? ' is-invalid form-control shadow-none' : "form-control shadow-none" }
                                name='email'
                                onChange={formik.handleChange}
                            />
                            <label htmlFor="" className='mt-3'>Password</label>
                            <input
                                type="password"
                                placeholder='enter your password'
                                className={formik.errors.password ? 'is-invalid form-control shadow-none' : "form-control shadow-none"}
                                name='password'
                                onChange={formik.handleChange}
                            />
                            <div className='text-end'>
                                <a href="#" className='text-decoration-none'>forget password?</a>
                            </div>
                            <button className='btn btn-success mt-4 w-100' type='submit'>Login</button>
                            <div className='text-center'>
                                <small>Don't have an account before <a href="/signup" className='text-decoration-none fs-6'>Signup up</a></small>
                            </div>
                        </form>
                    </div>
                </section>
            )
            }
    </>
  )
}

export default UserLogin