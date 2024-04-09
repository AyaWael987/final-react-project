import React, { useContext, useEffect, useState } from 'react';
import styles from './Forget.module.css'
import { useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/Authcontext';

export default function Forget() {
  const [isloading ,setLoading]=useState(false);
  const [error ,seterror]=useState(null);
  const navigate = useNavigate();
  // const {setUserToken}= useContext(AuthContext)

  const initialValues ={
    email:"",
  };

  const validationSchema =Yup.object({
   email: Yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i , 'Invalid Email address').required('email is required')
 })

  const formik = useFormik({
    initialValues,
   validationSchema,
   onSubmit: (values) => handleForget(values),
 });




async function handleForget(values){
  let {data}= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",values)
if(data.statusMsg == "success"){
//  document.querySelector('.forgetpassword').classList.add('d-none')
//  document.querySelector('.verfiycode').classList.remove('d-none')
 console.log(data)
 navigate("/reset")
}
}





//   const initialValues2 ={
//     resetCode:"",
//   };

//   const validationSchema2 =Yup.object({
//     resetCode: Yup.number().required('Code is required')
//  })

//   const formik2 = useFormik({
//    initialValues: initialValues2,
//    validationSchema: validationSchema2,
//    onSubmit: (values1) => handleReset(values1),
//  });




// async function handleReset(values1){
//   let {data}= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",values1)
// if(data.status == "success"){
//  console.log(data);
// }
// }

  return (
   <>
   <section className={styles.forget}>
    <div className="container">
      <div className="row">
        <div className="col-md-7">
       <div className={styles.form}>
       <form onSubmit={formik.handleSubmit} >
          <h1 className='mt-3 mb-4'> Ooops  Forget Password </h1>
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
      <button className="btn btn-info my-3" type="submit" >Send</button>
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


   {/* <section className='verfiycode d-none'>
    <div className="container">
    {
      error && (
        <div className='alert alert-danger'>{error} </div>
      )
    }
      <div className="row">
        <div className="col-md-8">
          <form onSubmit={formik2.handleSubmit} >
            <label htmlFor='resetCode'>Verfiy Code</label>
            <input type="number" id="resetCode" className='form-control my-1' placeholder='E-mail...' name='resetCode' onChange={formik2.handleChange} value={formik2.values.resetCode} onBlur={formik2.handleBlur} />
            {
        formik2.errors.resetCode && formik2.touched.resetCode && <span className="text text-danger">{formik2.errors.resetCode}</span>
      }
      <button className="btn btn-danger my-3" type="submit" >Send</button>
          </form>

        </div>
      </div>
    </div>
   </section> */}
   </>
  )
}
