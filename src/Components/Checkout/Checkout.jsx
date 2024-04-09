import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
// import styles from './Checkout.module.scss'
import * as Yup from 'yup';
import { CartContext } from '../../Context/CartContext';
import axios from 'axios';
import { AuthContext } from '../../Context/Authcontext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function Checkout() {
 const [isOnline,setIsOnline]=useState(false)
  const { cartId , setnumOfCartItem}= useContext(CartContext)
  const navigate = useNavigate();
  const {userToken} = useContext(AuthContext)
  const initialValues ={
    "details": "",
    "phone": "",
    "city": ""
    }


    const validationSchema =Yup.object({
      details: Yup.string().required('details is required'),
      city: Yup.string().required('City is required'),
      phone: Yup.string().required('Phone is required'),
    })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => handlepayment(values)
  })

 async  function handlepayment(shippingAddress){
   const endpoint= isOnline?
   `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`:
   `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`
  
   try{
    const {data} = await axios.post(endpoint ,
      {shippingAddress}, {
      headers:{
          token: userToken,
      }
       } );
       if(data.status == "success"){
         console.log(data);
         toast.success('Order Placed Successfully')
         setnumOfCartItem(0)
        if(isOnline){
          window.location.href =data.session.url;
        }else
         setTimeout(()=>{navigate('/allorders')},5000)
        }else{
        toast.error('Order Placed Failed')
       }
  }catch(error){
    console.log(error)
  }
  }
  return (
   <>
  <section className='py-5 w-75 m-auto'>
    <div className="container">
      <h2>CheckOut</h2>
     <form onSubmit={formik.handleSubmit}>
     <div className="inp my-3">
      <lablel htmlfor="details">Details</lablel>
      <textarea className='form-control my-1' id="details" type="text" placeholder='details...' name="details" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur}></textarea>
      </div>
      <div className="inp my-3">
      <lablel htmlfor="city">City</lablel>
      <input className='form-control my-1' id="city" type="text" placeholder='Your City...' name="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {
      formik.errors.city && formik.touched.city &&  <span className="text text-danger">{formik.errors.city}</span>
     }
      </div>
      <div className="inp my-3">
      <lablel htmlfor="phone">Phone</lablel>
      <input className='form-control my-1' id="phone" type="number" placeholder='phone...' name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}/> 
      {
      formik.errors.phone && formik.touched.phone &&  <span className="text text-danger">{formik.errors.phone}</span>
     }
      </div>
     <div className="btn1 d-flex  justify-content-between pt-3">
    <div className="span">
    <input type="checkbox" className='form-check-input' onChange={()=>setIsOnline(!isOnline)}/> <span>   Is Online Payment....</span>
    </div>
    { isOnline ?
     <button className='btn btn-outline-danger'  type="submit">Online Payment</button>:
     <button className='btn btn-outline-danger ' type="submit">Cash Payment</button> 
    }
     </div>
     </form>
      </div>
  </section>
   </>
  )
}
