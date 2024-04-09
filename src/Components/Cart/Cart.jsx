import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import styles from './Cart.module.css'

export default function Cart() {
  const {getCart , numOfCartItem , removeFromCart ,removeCart , updateCart} = useContext(CartContext);
  const [cartDetails ,setCartDetails ] =useState(null)
  async function getCartDetails(){
    const data =await getCart();
    if(data.status == "success"){
      setCartDetails(data)
    }
    else{
      setCartDetails(null)
    }
    // setCartDetails(data);
    // console.log(data)
  }

  async function removefromcart(id){
    const data =await removeFromCart(id)
    // console.log(data)
    if (data.status =="success"){
      toast.success(" Remove from Cart Successfully",{ })
      setCartDetails(data);
    }else{
      toast.error("AnAnA Failed")
    }
  }
  async function removecart(){
    const data =await removeCart()
    if (data.message =="success"){
      toast.success(" Remove Cart Successfully",{ })
      setCartDetails(null);
    }else{
      toast.error("AnAnA Failed")
    }
  }
async function updatecart(id , count){
 const data= await updateCart(id ,count)
 console.log(data)
 if (data.status =="success"){
  toast.success(" updated ",{ })
  setCartDetails(data);
}else{
  toast.error("AnAnA Failed")
}
}
  useEffect(()=> {
    getCartDetails();
  },[])

  console.log(cartDetails)
  return (
    
   <section className='py-5'>
    <div className="container">
      <h2 className='mb-5'>Shopping Cart</h2>
      {
        cartDetails ? (
    <section className='bg-light p-5'>
      <div className='d-flex justify-content-between mb-3'>
        <h3>Total Price : <span className='text-success'>{cartDetails.data.totalCartPrice}</span></h3>
        <h3>Total Items : <span className='text-success'>{numOfCartItem}</span></h3>
      </div>
      <button className='btn btn-outline-danger my-2' onClick={removecart}>Clear The Cart</button>
    {(
      cartDetails.data.products.map((product)=>(
        <div className="row border-bottom py-3 my-3">
        <div className="col-md-1">
          <figure >
            <img className='img-fluid' src={product.product.imageCover}/>
          </figure>
        </div>
        <div className="col-md-9">
          <h3 className='h5 fw-bold'>{product.product.title}</h3>
          <h4 className='h6 text-success'>{product.price} EGP</h4>
          <button className='btn btn-danger my-3 ' onClick={()=>removefromcart(product.product.id)}><i className='fa fa-trash me-2'></i> Remove </button>
        </div>
        <div className="col-md-2">
          <button className='btn btn-outline-danger' onClick={()=>updatecart(product.product.id ,product.count + 1)}>+</button>
          <span className='mx-3'>{product.count}</span>
          <button className='btn btn-outline-success' onClick={()=>updatecart(product.product.id ,product.count - 1)}>-</button>
        </div>
      </div>
      )))}
      <Link className='btn btn-success w-100' to={'/checkout'}>Checkout</Link>
    </section>
     ) : <div className='alert alert-secondary'> <h3>There is No products</h3>
     <Link to="/">Click me</Link>
     </div>}
    </div>
   </section>
  )
}
