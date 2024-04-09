import { WishContext } from '../../Context/Wishcontext';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';
import React, { useContext , useState , useEffect} from 'react';
// import styles from './Wishlist.module.scss'

export default function Wishlist() {

  const [wishDetails ,setwishDetails ] =useState(null);
  const {getWish ,setnumOfWishItem , numOfWishtItem , removeFromWish ,addToWish } =useContext(WishContext);
  const {addToCart} =useContext(CartContext);
  async function addProductToCart(id){
    let res= await addToCart(id);
    // console.log(res)
  if (res.status =="success"){
    toast.success("Added to Cart",{});
    // setwishDetails(res);
  }else{
    toast.error("AnAnA Failed")
  }
  }
async function getWishDetails(){
const data = await getWish();
if (data?.status =="success"){
  console.log(data)
  setwishDetails(data);
}else{
  setwishDetails(null)
}
}
async function removefromwish(id){
const data = await removeFromWish(id);
if (data.status =="success"){
  setwishDetails(data);
  toast.success(" Remove from Wish Successfully",{ })
}else{
  toast.error("AnAnA Failed")
}
}

useEffect(()=> {
  getWishDetails();
},[])

  return (
   <>
    <section className='py-5'>
    <div className="container">
      <h2 className='mb-5'>Wish List</h2>
      {
        wishDetails ? (
    <section className='bg-light p-5'>
      <div className='d-flex justify-content-between mb-3'>
        <h3>Total Items : <span className='text-success'>{numOfWishtItem}</span></h3>
      </div>
      {/* <button className='btn btn-outline-danger my-2' onClick={removecart}>Clear The Wish</button> */}
    {(
      wishDetails.data.map((product)=>(
        <div className="row border-bottom py-3 my-3">
        <div className="col-md-1">
          <figure >
            <img className='img-fluid' src={product.imageCover}/>
          </figure>
        </div>
        <div className="col-md-9">
          <h3 className='h5 fw-bold'>{product.title}</h3>
          <h4 className='h6 text-success'>{product.price} EGP</h4>
          <button className='btn btn-danger my-3 ' onClick={()=>removefromwish(product.id)}><i className='fa fa-trash me-2'></i> Remove </button>
        </div>
        <div className="col-md-2">
          <button className='btn btn-outline-success' onClick={()=>addProductToCart(product.id)}>Add to Cart</button>
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
   </>
  )
      }
