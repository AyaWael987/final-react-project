import axios from "axios";
import { createContext, useContext, useState } from "react";
import { AuthContext } from "./Authcontext";

export const CartContext =createContext();

export default function CartProvider ({children}){
const endPoint=`https://ecommerce.routemisr.com/api/v1/cart`;
const {userToken}= useContext (AuthContext);   
const [numOfCartItem, setnumOfCartItem]=useState(0);
const[cartId , setCartId]=useState(null)
async function addToCart(productId){
        try{
           const {data}= await axios.post(endPoint ,{productId},
                {
                headers:{
                    token: userToken,
                }
                 });
                 setnumOfCartItem(data.numOfCartItems)
                // console.log(data)

                 return data;
        }catch(error){
            console.log(error)
        }
    }
async function getCart(){
  try{
    const {data}= await axios.get(endPoint, {headers:{token: userToken} });
    setnumOfCartItem(data.numOfCartItems)
    setCartId(data.data._id)
    return data;
  }catch(error) 
  {
    console.log(error)
  }
}

async function removeFromCart(id){
   try{
    const {data} = await axios.delete(`${endPoint}/${id}`, {
        headers:{
            token: userToken,
        }
         })
         setnumOfCartItem(data.numOfCartItems)
         return data;
   }
   catch(error){
    console.log(error);
   }
        }
async function updateCart(id, count){
   try{
    const {data} = await axios.put(`${endPoint}/${id}`, 
   {count},
    {
        headers:{
            token: userToken,
        }
         })
         setnumOfCartItem(data.numOfCartItems)
         return data;
   }
   catch(error){
    console.log(error);
   }
        }
async function removeCart(){
   try{
    const {data} = await axios.delete(endPoint ,{ headers:{
        token: userToken,
    }})
         setnumOfCartItem(data.numOfCartItems)
         return data;
   }
   catch(error){
    console.log(error);
   }
        }
    return(
     <CartContext.Provider value={{addToCart , numOfCartItem , getCart , removeFromCart ,removeCart ,updateCart , cartId ,setnumOfCartItem  }}>
        {children}
    </CartContext.Provider>
    )
}