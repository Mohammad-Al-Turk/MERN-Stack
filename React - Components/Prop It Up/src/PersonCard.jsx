import React from "react";
function PersonCard({firstName, lastName, age, hairColor}) {
    return (
        <div className=""> 
        <h2>{lastName}, {firstName}</h2>
        <p>Age: {age}</p>
        <p>Hair Color: {hairColor}</p>
        </div>
    );
  }
export default PersonCard;