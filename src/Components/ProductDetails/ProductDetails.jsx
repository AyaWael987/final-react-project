import axios from 'axios'
import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import styles from './ProductDetails.module.scss'
import {Helmet} from "react-helmet";
import Slider from 'react-slick';
import { toast } from 'react-toastify';
import { CartContext } from '../../Context/CartContext';
export default function ProductDetails() {
  const {id}= useParams();
  const {addToCart}=useContext(CartContext);
// console.log(x);
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

  async function getProductsDetails(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

 const{data , isError ,error ,isLoading}= useQuery("ProductDetails" , getProductsDetails)

 const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

  return (
   <>
  <section className='py-5'>
    {isLoading &&  (
        <div className='d-flex justify-content-center bg-main vh'>
          <i className='fas fa-spinner fa-spin  fa-5x'></i>
          </div>
      ) }

    <div className="container">
      {
        isError && (
          <div className='alert alert-danger'>
            {error}
            </div>
        )
      }
      {data?.data.data &&
       <div className="row align-items-center">
       <div className="col-md-3">
         {/* <img className ="img-fluid" src={data.data.data.imageCover} alt=""/> */}
    
         <Slider {...settings}>
    {
      data.data.data.images.map((img)=>(
        <figure>
            <img className ="img-fluid" src={img} alt=""/>
        </figure>
      ))
    }
    </Slider>
       </div>
       <div className="col-md-9">
       <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{data.data.data.title}</title>
               <meta name="keywords" content={data.data.data.slug}/>
            </Helmet>
        </div>
         <h3>{data.data.data.title}</h3>
         <p className='text-muted'>{data.data.data.description}</p>
         <div className='d-flex justify-content-between text-black '>
          <div>
          <h3 className='h6'>{data.data.data.category.name}</h3>
           <h4 className='h6'>{data.data.data.price} EGP</h4>
          </div>
          <h4 className='h6 '><i className='fas fa-star fs-6 text-warning'></i> {data.data.data.ratingsAverage} </h4>
           </div>
           <button className='btn btn-info ' onClick={()=>addProductToCart(id)}> Add to Cart </button>
          
       </div>
     </div>
      }
    </div>
  </section>
  </>
  )
}
