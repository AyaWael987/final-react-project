import React from 'react'
import styles from './Footer.module.css'

export default function Footer() {
  return (
   <>
<div className={styles.footer}>
<div className="container">
  <div className="row">
    <div className="col-md-7">
      <h4 className='text-info'> <img src={require("../../assets/image (27).png")} className={styles.img1} /> Fresh Cart</h4>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum vitae qui eum consectetur, assumenda illum itaque incidunt! Non, dolores nulla.</p>
    </div>
    <div className="col-md-5">
   <div className="text-center">
   <h4>Any Comments</h4>
      <p>We are waiting for Your comments .....</p>
    <textarea className='form-control'></textarea>
    <button className='btn btn-info my-2'>Send</button>
   </div>
    </div>
  </div>
 </div>
</div>
  </>
  )
}
