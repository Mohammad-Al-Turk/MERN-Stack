import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';


const Products = () => {
    //get all products
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/products')
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))
    }, [products])

    return (
        <div>
            {
                products.map((product, i) => {
                    return (
                        <div key={i}>
                            <Link to={`/product/${product._id}`}><h1>{product.title}</h1></Link>
                            <h3>{product.price}</h3>
                            <p>{product.description}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Products;