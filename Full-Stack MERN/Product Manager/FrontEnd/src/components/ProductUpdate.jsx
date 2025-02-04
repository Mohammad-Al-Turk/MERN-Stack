import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ProductUpdate = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}`)
        .then(res => {
            setTitle(res.data.title);
            setPrice(res.data.price);
            setDescription(res.data.description);
            setLoading(false);
        })
        .catch(err => { 
            console.log(err);
            setLoading(false);
        });
    }, [id]); 

    const updateProduct = (e) => {
        e.preventDefault(); 

        axios.put(`http://localhost:8000/api/products/${id}`, { title, price, description })
        .then(res => {
            console.log(res.data);
            navigate("/");
        })
        .catch(err => { 
            console.log(err);
            if (err.response && err.response.data.errors) {
                setErrors(err.response.data.errors);
            }
        });
    };

    if (loading) return <h2>Loading...</h2>;

    return (
        <div>
            <h1>Update Product</h1>
            <form onSubmit={updateProduct}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                {errors.title && <p>{errors.title.message}</p>}
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
                {errors.price && <p>{errors.price.message}</p>}
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                {errors.description && <p>{errors.description.message}</p>}
                <button>Update Product</button>
            </form>
        </div>
    );
};

export default ProductUpdate;





















