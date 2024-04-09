import styles from './Login.module.css'
import React, { useContext, useEffect, useState } from 'react';
import { useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/Authcontext';

export default function Login() {
  const [isloading ,setLoading]=useState(false);
  const [error ,seterror]=useState(null);
  const navigate = useNavigate();
  const {setUserToken}= useContext(AuthContext)


  useEffect(()=>{
    document.title="Login page";
  },[])



  
  const initialValues ={
    email:"",
    password:""
  };

  const validationSchema =Yup.object({
    email: Yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i , 'Invalid Email address').required('email is required'),
    password: Yup.string().matches( /^[A-Z][A-Za-z8-9_]{6,11}$/i , 'Invalid password ' ).required('password is required'),
  })


  const formik = useFormik({
     initialValues,
    validationSchema,
    onSubmit: (values) => handleLogin(values),
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
 async function handleLogin (values){
    console.log(values)
   setLoading(true);
     await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values)
     .then((res) =>{
      console.log(res);
          if(res.data.message == "success"){
      setLoading(false);
      seterror(null);
      localStorage.setItem("token",res.data.token)
      setUserToken(res.data.token);
      console.log(res.data.token);
      navigate("/");

      }
     })
     .catch((err) =>{
      console.log(err);
        seterror(err.response.data.message);
        setLoading(false);
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
   <section className={styles.login} >
   <div className="container ">
<div className="row">
<div className="col-md-7">
    <form onSubmit={formik.handleSubmit} className='w-75 m-auto py-5'>
    <h1 className='mt-3 mb-4'> Login Now </h1>
    {
      error && (
        <div className='alert alert-danger h-25'>{error} </div>
      )
    }
    <p>Welcome! Please Fill Email and Password to sigin in into your acount.</p>
    <div className="inp my-3" >
    <label   htmlFor="email">Email :</label>
      <input id="email" type="email" className='form-control my-1' placeholder='E-mail...' name='email' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
      {
        formik.errors.email && formik.touched.email && <span className="text text-danger">{formik.errors.email}</span>
      }
    </div>

    <div className="inp my-3" > 
    <label   htmlFor="pass">Password :</label>
      <input id="pass" type="password" className='form-control my-1' placeholder='Password' name='password' onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur}/>
     {
      formik.errors.password && formik.touched.password &&  <span className="text text-danger">{formik.errors.password}</span>
     }
    </div>

      <button className="btn btn-info my-2" type="submit" disabled={!(formik.isValid && formik.dirty)} > {isloading ? "loading....." :"Login"}</button>
      <Link className='d-block py-2 text-decoration-none text-black' to="/forget">Forget Password ?</Link>
    </form>
    </div>
    <div className="col-md-5">
    <div className={styles.img1}>
    {/* <img src={require("../../assets/rr.jpg")} className='img-fluid' /> */}
    </div>
    </div>
</div>
   </div>
   </section>
   
  )
}


