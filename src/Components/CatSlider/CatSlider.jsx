import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import styles from './CatSlider.module.scss'
export default function CatSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    arrows:false
  };

  async function CategoriesSlider(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

 const{data , error , isError ,isLoading}= useQuery(`categories`,CategoriesSlider)
  return (
   <>
   <section className='py-5'>
     <h2 className='text-center py-4 '> Categories</h2>
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
      {
        data?.data.data && (
          <div className="row">
            <Slider {...settings}>
              {
                data.data.data.map((cat) =>(
                  <div className="  col-md-6 col-sm-2">
                  <div className="text-center">
                  <img className='img-fluid' style={{height:"200px"}} src={cat.image} alt={cat.name}/>
                    <h3 className="h6" >{cat.name}</h3>
                  </div>
                  </div>
                ))
              }
            </Slider>
          </div>
        )
      }
     </div>
  </section> 
   </>
  )
}
