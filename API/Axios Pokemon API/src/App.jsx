import React, { useState } from "react";
import axios from "axios";

export default function PokemonList() {
  const [pokemonNames, setPokemonNames] = useState([]);
  const [error, setError] = useState("");

  const fetchPokemon = () => {
    // Fetch all 807 Pokémon names
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=807")
      .then((response) => {
        const names = response.data.results.map((pokemon) => pokemon.name);
        setPokemonNames(names); // Update the state with the Pokémon names
        setError(""); // Clear any previous errors
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch Pokémon names. Please try again.");
      });
  };

  return (
    <div className="pokemon-container">
      <h1>Pokémon Names</h1>
      <button onClick={fetchPokemon} className="fetch-btn">
        Fetch Pokémon
      </button>

      {error && <p className="error">{error}</p>}

      <ul className="pokemon-list">
        {pokemonNames.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
