import React from "react";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { pokeDetail } from "../actions";
import { useEffect } from "react";
import "./Detail.css"


export default function Detail(){

   const dispatch= useDispatch()
   
 let {id} = useParams()
 useEffect(()=>{
     dispatch(pokeDetail(id))
 },[dispatch])
 
 
const myPokemon = useSelector ((state)=>state.detail)
console.log(myPokemon)

return(
   <div className="pokebola">
      {
        myPokemon.length>0?
        <div className="info">
            <br></br>
            <h1>DETALLE DEL POKEMON</h1>
            <h1>NAME: {myPokemon[0].name}</h1>
            <h1>ID: {myPokemon[0].id}</h1>
            <h1>VIDA: {myPokemon[0].hp}</h1>
            <h1>ATAQUE: {myPokemon[0].attack}</h1>
            <h1>DEFENSA: {myPokemon[0].defense}</h1>
            <h1>VELOCIDAD: {myPokemon[0].speed + "km/h"}</h1>
            <h1>ALTURA: {myPokemon[0].height * 10 + " cm"}</h1>
            <h1>PESO: {myPokemon[0].weight + " kg"}</h1>
            <h1>TIPO: {myPokemon[0].type.map(t=>t + " ")}</h1> 
            <img src={myPokemon[0].image} className="imagendetail"/>
       </div>:<p>Loading...</p>  
      }

      <Link to="/home">
          <button className="boton">Volver</button>
      </Link>
   </div>
)
} 