import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/Authcontext'
import { jwtDecode } from "jwt-decode";
// import styles from './MyOrders.module.scss'
import axios from 'axios'
export default function MyOrders() {
 const [orders,setOrders]=useState(null)
  const{_id}=useContext(AuthContext);
  const {id}=jwtDecode(_id)
  async function getMyOrders(){
 try{
const{data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
console.log(id)
console.log(data)
if (data?.length)
{
setOrders(data);
}
else
{
// setOrders(null)
}
}
catch(error){
  console.log(error)
}
  }

  useEffect(()=>{
    getMyOrders()
  },[])
  // <h3>Your City is {order.shippingAddress.city} @ {""} {order.shippingAddress.details}</h3>
  return (
   <>
   <section>
    <div className="container">
      <h2 className='text-center py-5'>My Orders</h2>
     {
      orders ? orders.map((order) =>(
        <div className='row border py-3 my-3'>
          {
            order.cartItems.map((item)=>(
              <div className="col-md-2">
                <img
            className='img-fluid'
            src ={item.product.imageCover}
            alt={item.product.title}
            />
            <h3 className='h6 text-success fw-bolder my-3 '>{item.product.category.name}</h3>
            <h3 className='h6  mb-3 text-black'>{item.product.title.split(" ").slice(0,4).join(" ")}</h3>
            <div className='d-flex justify-content-between text-black '>
            <h4 className='h6'>{item.price} EGP</h4>
           <h4 className='h6 '><i className='fas fa-star fs-6 text-warning'></i> {item.product.ratingsAverage} </h4>
</div>
              </div>
            ))
          }
 <div className="container">
 <div className="row">
   <div className="col-md-4">
     <div className="card text-center my-3 bg-light py-2">
     <h3>City</h3>
        <p>Your City : {order.shippingAddress.city}</p>
     </div>
      </div>
      <div className="col-md-4 ">
     <div className="card text-center my-3 bg-light py-2">
     <h3>Phone</h3>
        <p>Your Phone : {order.shippingAddress.phone}</p>
     </div>
      </div>
      <div className="col-md-4 ">
       <div className="card text-center my-3 bg-light py-2">
       <h3>Details</h3>
        <p>Some Details : {order.shippingAddress.details}</p>
       </div>
      </div>
   </div>
 </div>
        </div>
      )):
      <h1 className='text-center'>There is no orders</h1>
     }
    </div>
   </section>
  </>
  )
}
