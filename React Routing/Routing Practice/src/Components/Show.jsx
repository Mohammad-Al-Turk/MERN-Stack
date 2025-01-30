import React from 'react';
import { useParams } from "react-router";

const Show=()=>{

    const{show} = useParams();
    const isNumber = !isNaN(+show) //not text=true
    


    return(
        <>
        {isNumber ? (
            <p> Thw Number is: <strong>{show}</strong></p>
          ) : (
            <p>The word is:  <strong>{show}</strong></p>
          )}   
          </>
    );
} 

export default Show;