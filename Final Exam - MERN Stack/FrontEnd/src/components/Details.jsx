import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './Details.css'; 

const Details = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [speedy, setSpeedy] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/speedy/${id}`)
            .then(res => setSpeedy(res.data))
            .catch(err => console.log(err));
    }, [id]);

    const deleteSpeedy = () => {
        axios.delete(`http://localhost:8000/api/speedy/${id}`)
            .then(() => {
                navigate('/allspeedys');
            })
            .catch(err => console.log(err));
    };

    if (!speedy) return <div className="loading">Loading...</div>;

    return (
        <div className="details-container">
            <Link to="/allspeedys" className="back-link"> Go to Home</Link>
            <div className="card">
                <h1 className="title">{speedy.name}</h1>
                <h3 className="time"> {speedy.minutes} minutes</h3>
                <p className="directions"> Directions: {speedy.directions}</p>
                <ul className="ingredients-list">
                    <li> {speedy.ingredients_one}</li>
                    <li> {speedy.ingredients_two}</li>
                    <li> {speedy.ingredients_three}</li>
                </ul>
                <button className="delete-btn" onClick={deleteSpeedy}> Delete</button>
            </div>
        </div>
    );
};

export default Details;
