import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


const ById=()=> {
    const [product, setProduct]=useState({});
    const {id}=useParams();
    const navigate = useNavigate();


    useEffect(()=>{
        axios.get(`http://localhost:8000/api/products/${id}`)
        .then(res => setProduct(res.data))
        .catch(err=>console.log(err))
      
      },[id])
    const deleteProduct = () => {
        axios.delete(`http://localhost:8000/api/products/${id}`)
        .then(res => console.log(res))
        .then(navigate("/"))
        
        .catch(err => console.log(err))

    }

      
  return (
    <div>
        <h1>Product Details</h1>
        <p>Title: {product.title}</p>
        <p>Price: {product.price}</p>
        <p>Description: {product.description}</p>
        <Link to = {`/products/${product._id}`}>Update Form</Link>
        <button onClick={deleteProduct}>Delete</button>
    </div>
  )
}
export default ById;