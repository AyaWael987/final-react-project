import React, { useEffect, useState } from 'react';
import { useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css'

export default function Register() {

useEffect (()=>{
  document.title="Register page";
},[])

  const [isloading ,setLoading]=useState(false);
  const [error ,seterror]=useState(null);
  const navigate= useNavigate();
  const initialValues ={
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""
}

   const validationSchema =Yup.object({
    name: Yup.string().required('name is required'),
    email: Yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i , 'Invalid Email address').required('email is required'),
    phone: Yup.string().matches(/^(002)?01[0125][0-9]{8}$/i , 'Invalid phone ' ).required('Phone is required'),
    password: Yup.string().matches( /^[A-Z][A-Za-z8-9_]{6,11}$/i , 'Invalid password ' ).required('Phone is required'),
    rePassword: Yup.string().oneOf([Yup.ref("password")] , 'password not match' , 'Password not match') .required('Phone is required')
  })





  const formik = useFormik({
     initialValues,
    //  validate: (values)=> handlevalidation(values),
    validationSchema,
    onSubmit: (values) => handleRegister(values),
  });

  // function handlevalidation (values){
  //   let errors={};
  //   if(!values.name){
  //     errors.name="name is reqiured"
  //   }else if (values.name.length <3){
  //     errors.name="name must be more than 3"
  //   }else if (values.name.length >15){
  //     errors.name="name must be less than 15"
  //   }

  //   if(!values.email){
  //     errors.email ="email required"
  //   }else if (
  //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  //   ) {
  //     errors.email = 'Invalid email address';
  //   }

  //   if(values.phone){
  //     errors.phone="phone is reqiured"
  //   }else if (
  //     !/^(002)?01[0125][0-9]{8}$/i.test(values.phone)
  //   ) {
  //     errors.phone = 'Invalid phone ';
  //   }

  //   if(!values.password){
  //     errors.password="password is reqiured"
  //   }else if (values.password.length <3){
  //     errors.password="password must be more than 3"
  //   }else if (values.password.length >15){
  //     errors.password="password must be less than 15"
  //   }else if (
  //     !/^[A-Z][A-Za-z8-9_]{2,11}$/i.test(values.phone)
  //   ) {
  //     errors.password = 'Invalid password address';
  //   }

  //   if(values.repassword){
  //     errors.repassword="password is reqiured"
  //   }else if(values.repassword !== values.password){
  //     errors.repassword="not match"
  //   }


  //   console.log(errors)
  //   return errors;
  // }


<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap" rel="stylesheet"></link>
 async function handleRegister (values){
    console.log(values)
   setLoading(true);
     await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
     .then((res) =>{
      console.log(res)
          if(res.data.message == "success"){
      setLoading(false);
      seterror(null);
      navigate("/Login")
      }
     })
     .catch((err) =>{
      console.log(err)
        seterror(err.response.data.message);
        setLoading(false)

     })
  //  try{
  //   if(data.message == "success"){
  //     setLoading(false)
  //   }

  //  }catch(error){
  //   console.log(error);
  //   seterror(error.response.data.message);
  //   setLoading(false)

  //  }
  }
  return (
   <section  className={styles.register}>
   <div className="container">
   <div className="row">
    <div className="col-md-7">
    <form onSubmit={formik.handleSubmit} className='w-75 m-auto'>
    <h1 className='mt-3 mb-4'> Register Now </h1>
    {
      error && (
        <div className='alert alert-danger'>{error} </div>
      )
    }
     <div className="inp my-2" >
     <label   htmlFor="name" >Name :</label>
      <input id="name" type="text" className='form-control my-1 ' placeholder='Name...' name='name' onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur}/>
     {
      formik.errors.name && formik.touched.name &&  <span className="text text-danger">{formik.errors.name}</span>
     }
     </div>

    <div className="inp my-2" >
    <label   htmlFor="email">Email :</label>
      <input id="email" type="email" className='form-control my-1' placeholder='E-mail...' name='email' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
      {
        formik.errors.email && formik.touched.email && <span className="text text-danger">{formik.errors.email}</span>
      }
    </div>

    <div className="inp my-2" > 
    <label   htmlFor="password">Password :</label>
      <input id="password" type="password" className='form-control my-1' placeholder='Password' name='password' onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur}/>
     {
      formik.errors.password && formik.touched.password &&  <span className="text text-danger">{formik.errors.password}</span>
     }
    </div>

    <div className="inp my-2" >
    <label   htmlFor="rePassword">Confirm Password :</label>
      <input id="rePassword" type="password" className='form-control my-1' placeholder='Confirm Password...' name='rePassword' onChange={formik.handleChange} value={formik.values.rePassword} onBlur={formik.handleBlur}/>
     {
      formik.errors.rePassword && formik.touched.rePassword &&  <span className="text text-danger">{formik.errors.rePassword}</span>
     }
    </div>

     <div className="inp my-2" >
     <label   htmlFor="num">Phone :</label>
      <input id="num" type="tel" className='form-control my-2' placeholder='Phone...' name='phone' onChange={formik.handleChange} value={formik.values.phone} onBlur={formik.handleBlur}/>
      {
        formik.errors.phone && formik.touched.phone && <div className="text text-danger">{formik.errors.phone}</div>
      }
     </div>
      
      <button className="btn btn-info my-2" type="submit" disabled={!(formik.isValid && formik.dirty)}> {isloading ? "loading....." :"Register"}</button>
    </form>
    </div>
    <div className="col-md-5">
    <div className={styles.img1}>
    {/* <img src={require("../../assets/rr.jpg")} className='w-100' /> */}
    </div>
    </div>
   </div>
   </div>
   </section>
  )
}
