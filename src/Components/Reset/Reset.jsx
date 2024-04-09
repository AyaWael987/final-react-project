import React, { useContext, useEffect, useState } from 'react';
import styles from './Reset.module.css'
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
    resetCode:"",
  };

  const validationSchema =Yup.object({
    resetCode :Yup.string().required('code is required')
 })

  const formik = useFormik({
    initialValues,
   validationSchema,
   onSubmit: (values) => handleverfiy(values),
 });





async function handleverfiy (values){
  console.log(values)
 setLoading(true);
   await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",values)
   .then((res) =>{
    console.log(res);
        if(res.data.status == "Success"){
    setLoading(false);
    seterror(null);
    // localStorage.setItem("token",res.data.token)
    // setUserToken(res.data.token);
    // console.log(res.data.token);
    navigate("/finalreset");

    }
   })
   .catch((err) =>{
    console.log(err);
      seterror(err.response.data.message);
      setLoading(false);
   })}

// const initialValues ={
//   resetCode:"",
// };

// const validationSchema =Yup.object({
//   resetCode: Yup.number().required('Code is required')
// })

// const formik = useFormik({
//  initialValues,
//  validationSchema,
//  onSubmit: (values) => handleReset(values),
// });
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap" rel="stylesheet"></link>
// async function handleReset(values){
//   let {data}= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",values)
// if(data.status == "success"){
//  console.log(data);
// }
// }



  return (
   <>
 <section className={styles.reset}>
    <div className="container">
    {
      error && (
        <div className='alert alert-danger'>{error} </div>
      )
    }
      <div className="row">
        <div className="col-md-7">
          <div className={styles.form}>
          <form onSubmit={formik.handleSubmit} >
            <h1>Verify Code</h1>
            <label htmlFor='resetCode'>Enter Code</label>
            <input type="text" id="resetCode" className='form-control my-1' placeholder='Code....' name='resetCode' onChange={formik.handleChange} value={formik.values.resetCode} onBlur={formik.handleBlur} />
            {
        formik.errors.resetCode && formik.touched.resetCode && <span className="text text-danger">{formik.errors.resetCode}</span>
      }
      <button className="btn btn-info my-3" type="submit" >Send</button>
          </form>
          </div>

        </div>
        <div className="col-md-5">
          <div className={styles.img1}></div>
        </div>
      </div>
    </div>
   </section>
   </>
  )
}

