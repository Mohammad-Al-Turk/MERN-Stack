import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PlanetDetails = () => {
  const { id } = useParams();
  const [planet, setPlanet] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlanet = () => {
      axios.get(`https://swapi.dev/api/planets/${id}/`)
        .then(response => {
          setPlanet(response.data);
          setError(null);
        })
        .catch(err => {
          setError(err);
        });
    };

    fetchPlanet();
  }, [id]);

  return (
    <div className="planet-details">
        {error ? (
            <div className="error-message">
                <h2>These aren't the droids you're looking for</h2>
                <img src="https://th.bing.com/th/id/R.b858f7959fd31ec3ba68fdfde38b3905?rik=miunlVG%2fyVPC1A&riu=http%3a%2f%2fimages5.fanpop.com%2fimage%2fphotos%2f29200000%2fObi-Wan-Kenobi-obi-wan-kenobi-29217673-2560-1681.jpg&ehk=VuMBJgTZ2pk8msksFV2m1f7gmTCiVB6RGgW%2bOGrm%2b7c%3d&risl=&pid=ImgRaw&r=0" alt="Obi-Wan Kenobi" />
            </div>
        )  :
        !planet ? (
            <div className="error-message">
                <h2>Loading...</h2>
            </div>
        ) : (
            <>
                <h2>{planet.name}</h2>
                <p>Climate: {planet.climate}</p>
                <p>Terrain: {planet.terrain}</p>
                <p>Population: {planet.population}</p>
                <p>Diameter: {planet.diameter}</p>
            </>
        )}
    </div>
);
};

export default PlanetDetails;