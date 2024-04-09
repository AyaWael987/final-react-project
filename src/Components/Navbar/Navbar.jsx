import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../../Context/Authcontext'
import { CartContext } from '../../Context/CartContext';
import { WishContext } from '../../Context/Wishcontext';
import styles from './Navbar.module.css'

export default function Navbar() {
  const {userToken}=useContext(AuthContext);
  const {setUserToken}=useContext(AuthContext);
  const {numOfCartItem}=useContext(CartContext)
  const {numOfWishtItem}=useContext(WishContext)
  function handleLogOut(){
    setUserToken(null)
    localStorage.removeItem('token')
  }
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap" rel="stylesheet"></link>
  return (
   <>
   <div className={styles.nav1}>
   <nav className="navbar navbar-expand-lg  ">
  <div className="container-fluid">
  <img src={require("../../assets/image (27).png")} className={styles.img1} />
    <Link className="navbar-brand " to="/">Fresh Cart</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {
        userToken &&
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/products">Products</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/brands">Brands</NavLink>
        </li>
        <NavLink className="nav-link" to="/wishlist">WishList
          <span class="position-absolute top-3 end-75 translate-middle badge rounded-pill bg-info">
    {numOfWishtItem}
    <span class="visually-hidden">unread messages</span>
  </span>
          </NavLink>
        <li className="nav-item">
          <NavLink className="nav-link" to="/categories">Categories</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/allorders">My Orders</NavLink>
        </li>
        <li className="nav-item position-relative">
          <NavLink className="nav-link" to="/cart">Cart
          <span class="position-absolute top-3  end-6 translate-middle badge rounded-pill bg-info">
    {numOfCartItem}
    <span class="visually-hidden">unread messages</span>
  </span>
          </NavLink>
        </li>
      </ul>
      }


      <ul className="navbar-nav m-auto mb-2 mb-lg-0 ">
        <li className="nav-item">
          <a className=" text-black fa-brands fa-facebook fs-4 p-2 text-decoration-none" target='_blank' href="https://www.facebook.com/"></a>
        </li>
        <li className="nav-item">
          <a className=" text-black fa-brands fa-instagram fs-4 p-2 text-decoration-none" target='_blank' href="https://www.instagram.com/"></a>
        </li>
        <li className="nav-item">
          <a className=" text-black fa-brands fa-twitter fs-4 p-2 text-decoration-none" target='_blank' href="https://www.twitter.com/"></a>
        </li>
        <li className="nav-item">
          <a className=" text-black fa-brands fa-linkedin fs-4 p-2 text-decoration-none " target='_blank' href="https://www.linkedin.com/"></a>
        </li>
        <li className="nav-item">
          <a className=" text-black fa-brands fa-tiktok  fs-4 p-2 text-decoration-none" target='_blank' href="https://www.tiktok.com/"></a>
        </li>
        <li className="nav-item">
          <a className=" text-black fa-brands fa-youtube fs-4 p-2 text-decoration-none" target='_blank' href="https://www.youtube.com/"></a>
        </li>
      </ul>



      <ul className="navbar-nav me-4 mb-2 mb-lg-0">
        {
          userToken?
          <>
          <li className="nav-item">
          <Link className="nav-link" onClick={handleLogOut} to="/login">Logout</Link>
        </li>
          </>
          :
          <>
        <li className="nav-item">
          <NavLink className="nav-link" to="/register">Register</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </li>
          </>
        }
      </ul>
    </div>
  </div>
</nav>
   </div>
  </>
  )
}
