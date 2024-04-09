import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import axios from 'axios'
// import styles from './Catergories.module.scss'

export default function Catergories() {

  const [searchCat,setSearchCat]=useState('')
  useEffect(()=>{
    document.title="Catergories page";
  },[])

  async function getCatergories(){
    // setloading(true);
      return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }

  let {data , isFetching ,error,isLoading ,isError ,refetch} =useQuery('allCatergories', getCatergories,
{
  // cacheTime:2000,
  // refetchInterval:3000,

});
// console.log(data)

  return (
   <>
   <section className='py-5'>
   {isLoading && (
        <div className='d-flex justify-content-center bg-main vh'>
          <i className='fas fa-spinner fa-spin  fa-5x'></i>
          </div>
      )
    }

    {isError && (
        <div className='alert alert-danger'>
          {error}
          </div>
      )
    }
     {data?.data.data &&(
      <div className="container">
        <h2 className='text-center'>Categories</h2>
        <input type="text" onChange={(e)=>setSearchCat(e.target.value)} className='form-control my-3' placeholder='Search.....'/>
        <div className="row">
        {
                data.data.data.filter((cat)=>{return searchCat.toLowerCase()=== '' ? cat : cat.name.toLowerCase().includes(searchCat)}).map((cat) =>(
                  <div className="  col-md-4" key={cat.id}>
                  <div className="dec m-4 border text-center rounded-3">
                  <img className='img-fluid rounded-3' style={{height:"350px"}} src={cat.image} alt={cat.name}/>
                    <h4 className="py-3 px-2 text-danger" >{cat.name}</h4>
                  </div>
                  </div>
                ))
              }
        </div>
      </div>
     )
     }
   </section>
   
   </>
  )
}
