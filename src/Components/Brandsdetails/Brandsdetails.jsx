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

export default function Brandsdetails() {

  const {id}= useParams();

  async function getBrandsDetails(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    
  }

 const{data , isError ,error ,isLoading}= useQuery("BrandsDetails" , getBrandsDetails);
console.log(data);


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

         <div className="container">
         <div className="row g-4">
            <div key={data.data.data._id} className="col-md-2">
           <div className="brand mb-3">
          <img
            className='img-fluid'
            src ={data.data.data.image}
            alt={data.data.data.name}
            />
            <h3 className='h6 text-success fw-bolder my-3 '>{data.data.data.name}</h3>
          </div>
           </div>

         </div>
       </div>

  </section>
  </>
  )
}
