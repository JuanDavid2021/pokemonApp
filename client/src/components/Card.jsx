import React from "react";
import "./Card.css"

export default function PokeCard({name,image,attack,type, types}){


  if(type.length>1){
    const result = type.map(t=> t + "-" )
    const resultOk = result[1].replace("-", "")
    const resultConcat = result[0].concat(resultOk)
    return(
      <div className="pokecard">
         <h3>{name}</h3>
         <img src={image} alt="img not found" width="200px" height="250px" />
         <h3>Ataque: {attack}</h3>
         <h3>{resultConcat}</h3> 
      </div> 
    )
  }else{
    const result2 = type[0]
    return(
      <div className="pokecard">
         <h3>{name}</h3>
         <img src={image} alt="img not found" width="200px" height="250px" />
         <h3>Ataque: {attack}</h3>
         <h3>{result2}</h3> 
      </div> 
    )
  }
}