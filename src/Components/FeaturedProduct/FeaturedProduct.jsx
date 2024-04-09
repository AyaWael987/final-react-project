import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import { CartContext } from '../../Context/CartContext';
import { WishContext } from '../../Context/Wishcontext';
// import styles from './FeaturedProduct.module.scss'
export default function FeaturedProduct() {
  const [product ,setproduct] = useState([]);
  const [loading ,setloading] = useState(false);
  const {addToCart} =useContext(CartContext);
  const {addToWish} =useContext(WishContext);
  const [changeColor , setChangeColor]=useState(false);
  const handleClick = ()=> {
    setChangeColor(!changeColor) 
  }
  // const [error,seterror]= useState(null)
async function addProductToCart(id){
  let res= await addToCart(id);

  // console.log(res)
if (res.status =="success"){
  toast.success("Added to Cart",{
    
  })
}else{
  toast.error("AnAnA Failed")
}
}
async function addProductToWish(id){
  let res= await addToWish(id);
  handleClick();
//   console.log(res)
// if (res.status =="success"){
//   toast.success("Added to Cart",{
//   })
// }else{
//   toast.error("AnAnA Failed")
// }
}




async function getProducts(){
setloading(true);
  return await axios.get("https://ecommerce.routemisr.com/api/v1/products")
  // .then((res)=>{
  //   console.log(res.data.data);
  //   setproduct(res.data.data);
  //   setloading(false);
  //   // seterror(null);
  // }).catch((err)=>{
  //   console.log(err)
  //   setproduct([]);
  //   setloading(false);
  //   // seterror(err.response.data.message);
  // })
}

let {data , isFetching ,error,isLoading ,isError ,refetch} =useQuery('featuredproduct', getProducts,
{
  // cacheTime:2000,
  // refetchInterval:3000,

});
// console.log(data)
// useEffect(()=>{
//   getProducts()},[])
  return (
   <>
    <section className="py-5">
    {isLoading && (
        <div className='d-flex justify-content-center bg-main vh'>
          <i className='fas fa-spinner fa-spin  fa-5x'></i>
          </div>
      )
    }

    {isError && (
        <div className='alert alert-danger'>
          {error}
          </div>
      )
    }
    {data?.data.data && (
         <div className="container">
         <h2 className='text-center'>Products</h2>
         {/* <button className='btn btn-info text-center' onClick={refetch}>Update</button> */}
         <div className="row g-4">
        {data.data.data.map((product)=>(
            <div key={product.id} className="col-md-3">
           <div className="product mb-3">
          <Link  to={`product-details/${product.id}`} className='text-decoration-none'>
          <img
            className='img-fluid'
            src ={product.imageCover}
            alt={product.title}
            />
            <h3 className='h6 text-success fw-bolder my-3 '>{product.category.name}</h3>
            <h3 className='h6  mb-3 text-black'>{product.title.split(" ").slice(0,4).join(" ")}</h3>
            <div className='d-flex justify-content-between text-black '>
            <h4 className='h6'>{product.price} EGP</h4>
           <h4 className='h6 '><i className='fas fa-star fs-6 text-warning'></i> {product.ratingsAverage} </h4>
            </div>
          </Link>
          <div className="dec d-flex justify-content-between">
          <button className='btn btn-info' onClick={()=>addProductToCart(product.id)}>Add to Cart</button>
           <button className="btn" onClick={()=>addProductToWish(product.id) }><i class="fa-solid fa-heart fs-4"></i></button>
          </div>
          </div>
           </div>
))}
         </div>
       </div>
      )
    }
  </section>
   </>
  )
}
