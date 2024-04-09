import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";



export const AuthContext= createContext(null);


export default function AuthContextProvider({children}){
   const [userToken, setUserToken] = useState(null);
   const [userId,setUserId]=useState(null);
   const token =localStorage.getItem('token')


// const {id}=jwtDecode(token)

useEffect(()=>{
    if(token){ setUserToken(token);
        // setUserId(id);
}
},[])
return (
    <AuthContext.Provider value={{userToken ,setUserToken , _id:userToken }}>
        {children}
    </AuthContext.Provider>
)

}