import React, {useState} from 'react';
import axios from 'axios';

const Product=()=>{
    const [title, setTitle]=useState("");
    const [price, setPrice]=useState("");
    const [errors, setErrors] = useState([]);
    const [description, setDescription]=useState("");

    const createProduct=(e)=>{
        e.preventDefault();
        const newProduct={title, price, description};
        axios.post('http://localhost:8000/api/create', {title, price, description})
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
        
    }



    return(
        <div>
        <form onSubmit={createProduct} >
        <label htmlFor="title" >title</label>
        <input type="text" onChange={(e)=>setTitle(e.target.value)} value={title} name='title'/> <br />
        <label htmlFor="">price</label>
        <input type="number" onChange={(e)=>setPrice(e.target.value)} value={price} name='price'/> <br />
        <label htmlFor="">description</label>
        <input type="text"onChange={(e)=>setDescription(e.target.value)} value={description} name='description'/> <br />
        <button type="submit">Create Product</button>
        </form>
        </div>
    )
}
export default Product;