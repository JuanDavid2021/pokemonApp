import React from "react";
import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { getNamePokemon, noPoke, getPokemons } from "../actions";
import "./SearchBar.css"

export default function SearchBar(){
const allPokes =useSelector((state)=>state.pokemons)
console.log(allPokes)
const dispatch = useDispatch()
const [name, setName] = useState("")
const [error, setError] = useState("")
const [errorname, setErrorName] = useState("")

function handleInputChange(e){
e.preventDefault()
setName(e.target.value)
if(e.target.value===""){
    dispatch(getPokemons())
    setErrorName("")
   }
}

function validateError(name){

let allpokesfilter = allPokes.filter(p=>p.name===name)

if(allpokesfilter.length===0){
   setErrorName("EL POKEMON QUE INGRESASTE NO SE ENCONTRÓ")
   dispatch(noPoke())
}
}

function handleSubmit(e){
e.preventDefault()
setError(validateError(name))
dispatch(getNamePokemon(name))
}

return(
    <div className="search">
        <div>
        <input onChange={(e)=>handleInputChange(e)} type="text" placeholder="Buscar..." className="inputbtn"/>
        </div>
        <div className="error">
        {errorname.length>1 && (<p className="error">{errorname}</p>)}
        </div>
        <div>
        <button onClick={(e)=>handleSubmit(e)} type='submit' className="botonSubmit">Buscar</button>
        </div>
    </div>
)

}