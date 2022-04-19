import React from "react";
import {Link} from 'react-router-dom';
import './LandingPage.css'

export default function LandingPage(){
    return(
       <div className="text">
           <h1 className="color-1">Welcome to PokeApp!</h1>
           <Link to = '/home'>
               <button className="boton1"> INGRESAR </button>
           </Link>   
       </div>
    )
}
