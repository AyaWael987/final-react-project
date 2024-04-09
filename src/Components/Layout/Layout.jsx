import React from 'react';
// import styles from './Layout.module.scss';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx'
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
   <>
   <Navbar />
   <Outlet />
   <Footer />
   </>
  )
}
