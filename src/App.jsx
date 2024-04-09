import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Checkout from './Components/Checkout/Checkout'
import Errorpage from './Components/Errorpage/Errorpage';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Brands from './Components/Brands/Brands';
import Catergories from './Components/Catergories/Catergories';
import Products from './Components/Products/Products';
import Cart from './Components/Cart/Cart';
import Notfound from './Components/Notfound/Notfound';
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register"
import AuthContextProvider from './Context/Authcontext';
import CartProvider from './Context/CartContext'
import { Offline, Online } from "react-detect-offline";
import { QueryClientProvider , QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyOrders from './Components/MyOrders/MyOrders';
import Wishlist from './Components/Wishlist/Wishlist';
import WishProvider from './Context/Wishcontext';
import Forget from './Components/Forget/Forget';
import Reset from './Components/Reset/Reset'
import Afterreset from './Components/Afterreset/Afterreset';
import Brandsdetails from './Components/Brandsdetails/Brandsdetails';
import Protucted from './Components/Protucted/Protucted';


export default function App() {
  const router = createHashRouter ([
    {path :'/', element: <Layout/>,errorElement:<Errorpage />,children:[
      {
        index:true , element:<Home/>
      },
      {
        path:"/cart" , element:<Protucted><Cart/></Protucted>
      },
      {
        path:"/checkout" , element:<Protucted><Checkout/></Protucted>
      },
      {
        path:"/products" , element:<Protucted><Products/></Protucted>
      },
      {
        path:"/allorders" , element:<MyOrders/>
      },
      {
        path:"/product-details/:id" , element:<Protucted><ProductDetails/></Protucted>
      },
      {
        path:"/wishlist" , element:<Protucted><Wishlist/></Protucted>
      },
      {
        path:"/categories" , element:<Protucted><Catergories /></Protucted>
      },
      {
        path:"/brands" , element:<Protucted><Brands/></Protucted>
      },
      {
        path:"/brands/brand-details/:id" , element:<Protucted><Brandsdetails/></Protucted>
      },
      {
        path:"/register" ,element:<Register />
      },
      {
        path:"/finalreset" ,element:<Afterreset />
      },
      {
        path:"/reset" ,element:<Reset/>
      },
      {
        path:"/forget" ,element:<Forget/>
      },
      {
        path:"/login" ,element:<Login />
      },
      {
        path :"*" , element:<Notfound />
      }
    ]}
  ])

  const query = new QueryClient ({});
  return ( 
    <>
    
  <AuthContextProvider>
<CartProvider>
<WishProvider>

 <QueryClientProvider client={query}>
 <RouterProvider router={router}/>
 <ToastContainer/>
 <ReactQueryDevtools initialIsOpen={false} />
 </QueryClientProvider> 
</WishProvider>
</CartProvider>

  </AuthContextProvider>
 
  <div>
    <Online   >
      <div className='alert alert-success position-fixed bottom-0 end-0 z-1 me-2'>
        <h6>You are online helloooo ! <i className="fa-regular fa-face-smile-beam"></i>  </h6>
      </div>
    </Online>
    <Offline >
    <div className='alert alert-danger position-fixed bottom-0 end-0 '>
        <h6>You are offline <i className="fa-regular fa-face-sad-cry"></i> </h6>
      </div>
    </Offline>
  </div>
  </>
  )
}
