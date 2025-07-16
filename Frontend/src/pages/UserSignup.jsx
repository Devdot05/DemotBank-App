import { useFormik } from 'formik'
import React from 'react'
import '../css/Signup.css'
import axios from "axios"
import * as yup from "yup"
import { Link, useNavigate } from "react-router-dom"
import { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
 




const UserSignup = () => {
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)


    // Declaring regex values for yup validation
    let lower = new RegExp(`(?=.*[a-z])`)
    let upper = new RegExp(`(?=.*[A-Z])`)
    // const number = /^0\d{10}$/;
    let number = new RegExp(`(?=.*[0-9])`)
    let length = new RegExp(`(?=.{8,})`)

    const register_url = "https://demotbank-app-1.onrender.com/user/register"
    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            phoneNumber: '',
            password: '',
            
        },

        onSubmit: (values) =>{
            console.log(values);
            axios.post(register_url, values, {withCredentials: true})
            .then((res)=>{
                setLoading(true)
                console.log(res);
                
                if(res.data.status === 400) {
                    console.log(res.data.message);
                    setMessage(res.data.message)
                }else{
                    console.log(res);
                    setTimeout(() => {
                        navigate('/login')
                        setLoading(false)
                    }, 1000);
                }
               
                
            }).catch((err)=>{
                console.log(err, 'error occur');
                setMessage(err.response.data.message)
                
            })
            
        },

        validationSchema: yup.object({
            fullName: yup.string().transform(value => value.trim()).matches(/^[a-z ,.'-]+$/i,"Must be at least 2 characters").required("Full Name is required"),
            phoneNumber: yup.string().transform(value => value.trim()).matches(/^0\d{10}$/,"Must be a valid phone number").required("Phone number is required"),
            email: yup.string().transform(value => value.trim()).email("Must be a valid email").required("email is require"),
            password: yup
            .string()
            .transform(value => value.trim())
            .matches(lower, "Must contain lower case letter")
            .matches(upper, "Must contain upper case letter")
            .matches(number, "Must contain number")
            .matches(length, "Must not less than 8 character")
            .required("Password field is require")
        })
        
    })
    // console.log(formik.errors);
  return (
    <>  
        {loading ? (
            <div className='text-center background vh-100' style={{paddingTop: "300px"}}>
                <div class="spinner-border text-light" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        ): (

        <section className='container-fluid background'>
            <div className='mb-2 col-2 text-end'>
                <Link to={'/'} className='nav-link text-light'><ArrowBackIcon/></Link>
            </div>
            <div className='row col-xl-9 col-xxl-9 col-lg-9 col-md-10 col-11 col-sm-11 rounded-5 mx-auto shadow '>
               
                <div className='col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 bg rounded-5 text-center d-none d-md-block'>
                    <div className='bg-2 rounded-5'>
                        <h2>Get a Demo Account</h2>
                        <p>to signup, please type in the necessary details beside</p>
                    </div>
                </div>
                <form action="" onSubmit={formik.handleSubmit} className='col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 py-2 form rounded-5'>
                    <h2 className='text-center pt-3'>Register your account </h2>
                    <p className='text-danger'>{message}</p>
                    <div>
                        <label htmlFor="" className='mt-3'>Full Name</label> 
                        <input
                            type="text"
                            placeholder='FirstName and LastName'
                            className={formik.errors.fullName ? "is-invalid form-control  shadow-none" : "form-control  shadow-none" }
                            name='fullName'
                            onChange={formik.handleChange}
                            value={formik.values.fullName}
                            onBlur={formik.handleBlur}
                        />
                        <small className='text-danger'>{formik.touched.fullName && formik.errors.fullName}</small>
                    </div>
                    <div>
                        <label htmlFor="" className='mt-3'>Email</label>
                        <input
                            type="email"
                            placeholder='example@gmail.com'
                            className={formik.errors.email ? ' is-invalid form-control shadow-none' : "form-control shadow-none" }
                            name='email'
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && <small  className='text-danger'>{formik.errors.email} </small>}
                    </div>
                    <div>
                        <label htmlFor="" className='mt-3'>Phone</label>
                        <input
                            type="tel"
                            placeholder='enter phone number'
                            className={formik.errors.phoneNumber ? 'is-invalid form-control shadow-none' : "form-control shadow-none"}
                            name='phoneNumber'
                            onChange={formik.handleChange}
                            value={formik.values.phoneNumber}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.phoneNumber && <small className='text-danger'>{formik.errors.phoneNumber}</small>}
                    </div>
                    <div>
                        <label htmlFor="" className='mt-3'>Password</label>
                        <input
                            type="text"
                            placeholder='enter your password'
                            className={formik.errors.password ? 'is-invalid form-control shadow-none' : "form-control shadow-none"}
                            name='password'
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && <small className='text-danger'>{formik.errors.password}</small>}
                        <button className='btn btn-success mt-4 w-100' type='submit'>Submit</button>
                        <small>Already have an account <a href="/login">Login here</a></small>
                    </div>
                </form>
            </div>
        </section>
        )
        }
    </>
  )
}

export default UserSignup