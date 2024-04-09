import React, { Children, useContext } from 'react'
import { AuthContext } from '../../Context/Authcontext'
import { Navigate } from 'react-router-dom';
// import styles from './Protucted.module.scss'

export default function Protucted({children}) {
  const {userToken} =useContext(AuthContext)
  if(!userToken){
  return <Navigate to="/login"/>}
  return children;
}
