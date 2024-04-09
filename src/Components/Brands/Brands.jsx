import React, { useEffect , useState} from 'react'
// import styles from './Brands.module.scss'
import { useQuery } from 'react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function Brands() {

  const [searchbrands,setSearchbrands]=useState('')
  useEffect(()=>{
    document.title="Brands page";
  },[])


  async function getBrands(){
    // setloading(true);
      return await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
  }

  let {data , isFetching ,error,isLoading ,isError ,refetch} =useQuery('allbrands', getBrands,
{
  // cacheTime:2000,
  // refetchInterval:3000,

});
console.log(data)

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
        <h2 className='text-center'>Brands</h2>
        <input type="text" onChange={(e)=>setSearchbrands(e.target.value)} className='form-control my-3' placeholder='Search.....'/>
        <div className="row">
        {
                data.data.data.filter((brands)=>{return searchbrands.toLowerCase()=== '' ? brands : brands.name.toLowerCase().includes(searchbrands)}).map((brands) =>(
                  <div className="col-md-4" key={brands._id}>
                     <Link  to={`brand-details/${brands._id}`} className='text-decoration-none'>
                  <div className="dec m-4 border text-center rounded-3">
                  <img className='img-fluid rounded-3' src={brands.image} alt={brands.name}/>
                    <h4 className="py-3 px-2 text-danger" >{brands.name}</h4>
                  </div>
                  </Link>
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
