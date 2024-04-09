import React, { useContext, useEffect, useState } from 'react';
import styles from './Afterreset.module.css'
import { useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/Authcontext';

export default function Afterreset() {

  const [isloading ,setLoading]=useState(false);
  const [error ,seterror]=useState(null);
  const navigate = useNavigate();
  // const {setUserToken}= useContext(AuthContext)

  const initialValues ={
    email:"",
    newPassword: ""
  };

  const validationSchema =Yup.object({
    email: Yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i , 'Invalid Email address').required('email is required'),
    newPassword: Yup.string().matches( /^[A-Z][A-Za-z8-9_]{6,11}$/i , 'Invalid password ' ).required('password is required'),
 })

  const formik = useFormik({
    initialValues,
   validationSchema,
   onSubmit: (values) => habdleReset(values),
 });





async function habdleReset (values){
  console.log(values)
 setLoading(true);
   await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",values)
   .then((res) =>{
    console.log(res);
        if(res.data.status == "Success"){
    setLoading(false);
    seterror(null);
    // localStorage.setItem("token",res.data.token)
    // setUserToken(res.data.token);
    // console.log(res.data.token);
    navigate("/login");

    }
   })
   .catch((err) =>{
    console.log(err);
      seterror(err.response.data.message);
      setLoading(false);
   })}





  return (
  <>
  <section className={styles.forget}>
    <div className="container">
      <div className="row">
        <div className="col-md-7">
       <div className={styles.form}>
       <form onSubmit={formik.handleSubmit} >
          <h1 className='mt-3 mb-4'> Ooh Final Step.... </h1>
    {
      error && (
        <div className='alert alert-danger'>{error} </div>
      )
    }
            <label htmlFor='email'>Enter Your E-mail</label>
            <input type="email" id="email" className='form-control my-1' placeholder='E-mail...' name='email' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
            {
        formik.errors.email && formik.touched.email && <span className="text text-danger">{formik.errors.email}</span>
      }
            <label htmlFor='newPassword'>New Password</label>
            <input type="password" id="newPassword" className='form-control my-1' placeholder='Password...' name='newPassword' onChange={formik.handleChange} value={formik.values.newPassword} onBlur={formik.handleBlur} />
            {
        formik.errors.newPassword && formik.touched.newPassword && <span className="text text-danger">{formik.errors.newPassword}</span>
      }
      <br/>
      <button className="btn btn-danger my-3" type="submit" >Reset Password</button>
          </form>
       </div>

        </div>
        <div className="col-md-5">
        <div className={styles.img1}>
    {/* <img src={require("../../assets/rr.jpg")} className='img-fluid' /> */}
    </div>
        </div>
      </div>
    </div>
   </section>
  </>
  )
}
