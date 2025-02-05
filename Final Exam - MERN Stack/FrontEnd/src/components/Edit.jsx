import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './EditSpeedy.css';

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [minutes, setMinutes] = useState("");
    const [directions, setDirections] = useState("");
    const [ingredients_one, setIngredientsOne] = useState("");
    const [ingredients_two, setIngredientsTwo] = useState("");
    const [ingredients_three, setIngredientsThree] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8000/api/speedy/${id}`)
            .then(res => {
                const data = res.data;
                setName(data.name);
                setMinutes(data.minutes);
                setDirections(data.directions);
                setIngredientsOne(data.ingredients_one);
                setIngredientsTwo(data.ingredients_two);
                setIngredientsThree(data.ingredients_three);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedSpeedy = { name, minutes, directions, ingredients_one, ingredients_two, ingredients_three };

        axios.put(`http://localhost:8000/api/speedy/${id}`, updatedSpeedy)
            .then(() => navigate('/allspeedys'))
            .catch(err => console.log(err));
    };

    return (
        <div className="edit-speedy-container">
            <h1 className="edit-speedy-title">Edit Speedy Meal</h1>
            <Link to="/allspeedys" className="edit-speedy-link">Go to home</Link>
            <form onSubmit={handleUpdate} className="edit-speedy-form">
                <label className="edit-speedy-label">Dish Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="edit-speedy-input" />

                <label className="edit-speedy-label">Total Minutes</label>
                <input type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} className="edit-speedy-input" />

                <label className="edit-speedy-label">Directions</label>
                <input type="text" value={directions} onChange={(e) => setDirections(e.target.value)} className="edit-speedy-input" />

                <label className="edit-speedy-label">Ingredient One</label>
                <input type="text" value={ingredients_one} onChange={(e) => setIngredientsOne(e.target.value)} className="edit-speedy-input" />

                <label className="edit-speedy-label">Ingredient Two</label>
                <input type="text" value={ingredients_two} onChange={(e) => setIngredientsTwo(e.target.value)} className="edit-speedy-input" />

                <label className="edit-speedy-label">Ingredient Three</label>
                <input type="text" value={ingredients_three} onChange={(e) => setIngredientsThree(e.target.value)} className="edit-speedy-input" />

                <button type="submit" className="edit-speedy-button">Update</button>
            </form>
        </div>
    );
};

export default Edit;
