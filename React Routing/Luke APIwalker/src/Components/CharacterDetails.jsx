import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const CharacterDetails = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);
  const [homeworld, setHomeworld] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      axios.get(`https://swapi.dev/api/people/${id}/`)
        .then(response => {
          setCharacter(response.data);
          setError(null);
          return axios.get(response.data.homeworld);
        })
        .then(response => {
          setHomeworld(response.data);
        })
        .catch(err => {
          setError(err);
        });
    };

    fetchCharacter();
  }, [id]);

  return (
    <div className="character-details">
        {error ? (
            <div className="error-message">
                <h2>These aren't the droids you're looking for</h2>
                <img src="https://th.bing.com/th/id/R.b858f7959fd31ec3ba68fdfde38b3905?rik=miunlVG%2fyVPC1A&riu=http%3a%2f%2fimages5.fanpop.com%2fimage%2fphotos%2f29200000%2fObi-Wan-Kenobi-obi-wan-kenobi-29217673-2560-1681.jpg&ehk=VuMBJgTZ2pk8msksFV2m1f7gmTCiVB6RGgW%2bOGrm%2b7c%3d&risl=&pid=ImgRaw&r=0" alt="Obi-Wan Kenobi" />
            </div>
        ) :
        !character ? (
            <div className="error-message">
                <h2>Loading...</h2>
            </div>
        ) : (
            <>
                <h2>{character.name}</h2>
                <p>Height: {character.height}</p>
                <p>Mass: {character.mass}</p>
                <p>Hair Color: {character.hair_color}</p>
                <p>Eye Color: {character.eye_color}</p>
                {homeworld && (
                    <p>
                        Homeworld: <Link to={`/planets/${homeworld.url.split('/')[5]}`}>{homeworld.name}</Link>
                    </p>
                )}
            </>
        )}
    </div>
);
};

export default CharacterDetails;