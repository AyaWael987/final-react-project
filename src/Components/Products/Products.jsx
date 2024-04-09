import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';

// import styles from './Products.module.scss'

export default function Products() {
  const {addToCart}=useContext(CartContext);
  const [searchproducts,setSearchptoducts]=useState('')
  useEffect(()=>{
    document.title="Products page";
  },[])

  async function addProductToCart(id){
    let res= await addToCart(id);
    console.log(res)
  if (res.status =="success"){
    toast.success("Added to Cart",{
      
    })
  }else{
    toast.error("AnAnA Failed")
  }
  }
  async function getProducts(){
    // setloading(true);
      return await axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }

  let {data , isFetching ,error,isLoading ,isError ,refetch} =useQuery('allproducts', getProducts,
{
  // cacheTime:2000,
  // refetchInterval:3000,

});
console.log(data)

  return (
   <>
   <section className='py-5'>
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
     {data?.data.data &&(
      <div className="container">
        <h2 className='text-center'>Produsts</h2>
        <input type="text" onChange={(e)=>setSearchptoducts(e.target.value)} className='form-control my-3' placeholder='Search.....'/>
        <div className="row g-4">
        {data.data.data.filter((product)=>{return searchproducts.toLowerCase()=== '' ? product : product.title.toLowerCase().includes(searchproducts)}).map((product)=>(
            <div key={product.id} className="col-md-3">
           <div className="product mb-3">
          <Link  to={`product-details/${product._id}`} className='text-decoration-none'>
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
           <button className='btn btn-info' onClick={()=>addProductToCart(product.id)}>Add to Cart</button>
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

