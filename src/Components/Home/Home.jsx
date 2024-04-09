import React, { useEffect } from 'react'
import FeaturedProduct from '../FeaturedProduct/FeaturedProduct'
import MainSlider from '../MainSlider/MainSlider'
import CatSlider from '../CatSlider/CatSlider'
// import styles from './Home.module.scss'

export default function Home() {

  useEffect(()=>{
    document.title="Home page";
  },[])
  return (
   <>
   <MainSlider/>
   <CatSlider/>
 <FeaturedProduct/>
   </>
  )
}
