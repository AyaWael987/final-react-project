import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './MainSlider.module.css'

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };
  const images=[
    {
      src :require("../../assets/slider-image-1 (1).jpeg"),
      name:"slid 1"
    },
    {
      src :require("../../assets/slider-image-2.jpeg"),
      name:"slid 2"
    },
    {
      src :require("../../assets/slider-image-3.jpeg"),
      name:"slid 3"
    }
  ]
  return (
   <>
 <div className={styles.main}>
 <div className="container ju">
  <div className="row g-0 justify-content-center">
  <div className="col-md-6">
  <Slider {...settings}>
    {
      images.map((img)=>(
        <figure className='mb-0'>
        <img src={img.src}
        alt={img.name}
        style={{ width:"100%" ,height:"400px"}}/>
       </figure>
      ))
    }
    </Slider>
  </div>
  <div className="col-md-3">
  <figure className='mb-0'>
      <img src={require("../../assets/slider-image-3.jpeg")}
      style={{ width:"100%" ,height:"200px"}}/>
     </figure>
     <figure className='mb-0'>
      <img src={require("../../assets/slider-image-2.jpeg")}
      style={{ width:"100%" ,height:"200px"}}/>
     </figure>
  </div>
  </div>
  
  </div>
 </div>
  </>
  )
}
