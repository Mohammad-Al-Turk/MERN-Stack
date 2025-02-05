import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Speedys.css';

const Speedys = () => {
    const [speedys, setSpeedys] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/allspeedly')
            .then(res => setSpeedys(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="container">
            <h1>Speedy Meals</h1>
            <h3>Find inspiration with these delicious meals!</h3>
            <Link to="/create" className="back-link"> Add New Dish</Link>
            <h2>Speedy Meals List</h2>
            <table className="speedys-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Minutes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {speedys.map((speedy, i) => (
                        <tr key={i}>
                            <td>{speedy.name}</td>
                            <td>{speedy.minutes} min</td>
                            <td>
                                <Link to={`/details/${speedy._id}`} className="details-btn"> Details</Link>
                                <Link to={`/edit/${speedy._id}`} className="edit-btn">Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Speedys;
