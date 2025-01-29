import React, { useState } from "react";

export default function PokemonApp() {
  const [pokemonList, setPokemonList] = useState([]); 
  
  // دالة لجلب البيانات عند النقر باستخدام Promises
  const fetchPokemon = () => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=807")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon data");
        }
        return response.json(); // تحويل الاستجابة إلى JSON
      })
      .then((data) => {
        setPokemonList(data.results); // تخزين النتائج في الحالة
      })
      .catch((error) => {
        console.error("Error fetching Pokémon data:", error);
      });
  };

  return (
    <div className="app-container">
      <h1>Pokemon Fetcher</h1>
      <button
        onClick={fetchPokemon}
      >
        Fetch Pokémon
      </button>

      <ul>
        {pokemonList.map((pokemon, index) => (
          <li key={index}>
            {pokemon.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
