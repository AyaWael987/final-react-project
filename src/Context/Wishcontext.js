import { createContext, useContext , useState } from "react";
import { AuthContext } from "./Authcontext";
import axios from "axios";

export const WishContext =createContext();
export default function WishProvider({children}){
    const endpoint="https://ecommerce.routemisr.com/api/v1/wishlist";
    const [numOfWishtItem, setnumOfWishItem]=useState(0);
    const[wishId , setWishId]=useState(null)
    const {userToken}=useContext(AuthContext)
    async function addToWish(productId){
        try{
            const {data} = await axios.post(endpoint,{productId}, {
                headers:{
                    token: userToken,
                }
                 });
                 setnumOfWishItem(data.count);
                 console.log(data)
        }
        catch(error){
            console.log(error)
        }
    }

    async function removeFromWish(id){
        try{
         const {data} = await axios.delete(`${endpoint}/${id}`, {
             headers:{
                 token: userToken,
             }
              })
              setnumOfWishItem(data.count)
              console.log(data)
              return data;
        }
        catch(error){
         console.log(error);
        }
             }

             async function getWish(){
                try{
                  const {data}= await axios.get(endpoint, {headers:{token: userToken} });
                  setnumOfWishItem(data.count)
                  setWishId(data.data._id)
                  return data;
                }catch(error) 
                {
                  console.log(error)
                }
              }
    return(
        <WishContext.Provider value={{addToWish , numOfWishtItem , setnumOfWishItem , removeFromWish , getWish}}>
            {children}
        </WishContext.Provider>
    )
}