import React from "react";
import "./Paginado.css"

export default function Paginado({pokemonsInPage, allPokemons, paginado}){
   const pageNumbers = []

   for (let i=1; i<=Math.ceil(allPokemons/pokemonsInPage); i++){
       pageNumbers.push(i)
   } 

   return(
      <nav >
         <ul>
          {pageNumbers?.map(number=>(
              <li key={number} className="paginado">
              <a onClick={()=> paginado(number)} >{number}</a>
              </li>
          ))}   
        </ul>      
      </nav>
   ) 
}

