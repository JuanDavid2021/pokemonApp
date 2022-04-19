import React from "react";
import { NavLink } from "react-router-dom";
import logoPokemon from "../images/logoPokemon.png"

import "../components/NavBar.css"

export default function NavBar(){
  
        function refreshPage() {
          window.location.reload(false);
        }

      
 
  return(
    
      <nav className="nav">
          <button className="creabtn"><NavLink className="creaPokemon" to="/pokemon">Crea tu Pokemón</NavLink></button> 
            <img className="logo"src={logoPokemon} width="120" height="70"  alt="pokemon" /> 
          <button onClick={refreshPage} className="creabtn2">
          Ver todos los pokemons  
          </button>
      </nav>
  )

}