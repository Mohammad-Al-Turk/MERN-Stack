import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './CreatesSpeedy.css';  

const CreatesSpeedy = () => {
    const [name, setName] = useState("");
    const [minutes, setMinutes] = useState("");
    const [directions, setDirections] = useState("");
    const [ingredients_one, setingredients_one] = useState("");
    const [ingredients_two, setIngredients_two] = useState("");
    const [ingredients_three, setIngredients_three] = useState("");
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate(); 

    const CreateData = (e) => {
        e.preventDefault();
        const newSpeedy = { name, minutes, directions, ingredients_one, ingredients_two, ingredients_three };

        axios.post('http://localhost:8000/api/create', newSpeedy)
            .then(res => {
                console.log(res);
                navigate('/allspeedys'); 
            })
             .catch(err=>{
                console.log( err.response.data); // This is the response from the backend
                            const errorResponse = err.response.data; // Get the errors from err.response.data
                            const errorArr = []; // Define a temp error array to push the messages in
                            for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                                errorArr.push(errorResponse[key].message)
                            }
                            // Set Errors
                            setErrors(errorArr);
                        })            

        setName("");
        setMinutes("");
        setDirections("");
        setingredients_one("");
        setIngredients_two("");
        setIngredients_three("");
    };

    return (
        <div className="creates-speedy-container">
            <h1 className="creates-speedy-title">Speedy Meals</h1>
            <h3 className="creates-speedy-subtitle">Add the next culinary masterpiece</h3>
            <Link to="/allspeedys" className="creates-speedy-link">Go to home</Link>
            <form onSubmit={CreateData} className="creates-speedy-form">
                <label htmlFor="title" className="creates-speedy-label">Dish Name</label>
                <input type="text" onChange={(e) => setName(e.target.value)} value={name} name='name' className="creates-speedy-input" /> <br />

                <label htmlFor="" className="creates-speedy-label">Total Minutes</label>
                <input type="number" onChange={(e) => setMinutes(e.target.value)} value={minutes} name='minutes' className="creates-speedy-input" /> <br />

                <label htmlFor="" className="creates-speedy-label">Directions</label>
                <input type="text" onChange={(e) => setDirections(e.target.value)} value={directions} name='directions' className="creates-speedy-input" /> <br />

                <label htmlFor="title" className="creates-speedy-label">Ingredient One</label>
                <input type="text" onChange={(e) => setingredients_one(e.target.value)} value={ingredients_one} name='ingredients_one' className="creates-speedy-input" /> <br />

                <label htmlFor="" className="creates-speedy-label">Ingredient Two</label>
                <input type="text" onChange={(e) => setIngredients_two(e.target.value)} value={ingredients_two} name='ingredients_two' className="creates-speedy-input" /> <br />

                <label htmlFor="" className="creates-speedy-label">Ingredient Three</label>
                <input type="text" onChange={(e) => setIngredients_three(e.target.value)} value={ingredients_three} name='ingredients_three' className="creates-speedy-input" /> <br />

                <button type="submit" className="creates-speedy-button">Create Product</button>
            </form> 
             {errors.map((err, index) => <p key={index}>{err}</p>)}
        </div>
    );
};

export default CreatesSpeedy;
