import React from "react";
import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterPokemon, filterPokemonType, getPokemons, orderByName, orderByNameFuerza,filterPokemonTypeAll } from "../actions";
import { Link } from "react-router-dom";
import PokeCard from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import './Home.css'
import NavBar from "./NavBar";






export default function Home(){

const dispatch=useDispatch()
const allPokemons =useSelector((state)=>state.pokemons)
const [currentPage, setCurrentPage] = useState(1)
const [pokemonsInPage, setpokemonsInPage]=useState(12)
const [orden, setOrden] = useState('')
const indexLastPokemon = currentPage * pokemonsInPage
const indexFirstPokemon = indexLastPokemon - pokemonsInPage
const currentPokemon = allPokemons?.slice(indexFirstPokemon, indexLastPokemon)

const paginado = (pageNumber) =>{
  setCurrentPage(pageNumber)
}

useEffect(()=>{
   dispatch(getPokemons())

}, [])


function handleSort(e){
  e.preventDefault()
  dispatch(orderByName(e.target.value))
  setCurrentPage(1);
  setOrden(`Ordenado ${e.target.value}`)
}

function handleSortFuerza(e){
  e.preventDefault()
  dispatch(orderByNameFuerza(e.target.value))
  setCurrentPage(1);
  setOrden(`Ordenado ${e.target.value}`)
}

const handleFilterPokemon=(e)=>{
  dispatch(filterPokemon(e.target.value))
}

 const handleFilterPokemonType=(e)=>{
 if(e.target.value != "todos"){
   dispatch(filterPokemonType(e.target.value))
 }else{
  dispatch(filterPokemonTypeAll(e.target.value))
 }  
} 


return(
  
    <div className="home">
        <NavBar/>
        <h1 className="titulo">POKEAPP</h1> 
    
        <br></br>
        <br></br>

     <br></br>
     <br></br>

     <h3 className="ordenar">ORDENAR POKEMONS</h3>
     
     <h3 className="filtrar">FILTRAR POKEMONS</h3>
       <div className="bodyCard">
         
         <select onChange={e=>handleSort(e)} className="alfabetico">
             <option value="ascendente">ORDEN ALFABETICO</option>
             <option value='ascendente' key={1} >A-Z</option>
             <option value='descendente'key={2}>Z-A</option>
         </select>

         <select onChange={e=>handleSortFuerza(e)} className="porfuerza">
             <option value='ascendentefuerza'>ORDENAR POR FUERZA</option>
             <option value='ascendentefuerza'key={3}>ASCENDENTE POR FUERZA</option>
             <option value='descendentefuerza' key={4}>DESCENDENTE POR FUERZA</option>
         </select>

         <select onChange={e=>handleFilterPokemon(e)} className="pororigen">
             <option value='all'key={5} className="pororigen">TODOS</option>
             <option value='created' key={6} className="pororigen">CREADOS</option>
             <option value='existent' key={7} className="pororigen">DE LA API</option>
         </select>
        
        <select onChange={e=>handleFilterPokemonType(e)} className="portipo">
            <option value="todos"> FILTRAR POR TIPO</option>
            <option value="bug"key={8}>BUG</option>
            <option value="dark" key={9}>DARK</option>
            <option value="dragon" key={10}>DRAGON</option>
            <option value="electric" key={11}>ELECTRIC</option>
            <option value="fairy" key={12}>FAIRY</option>
            <option value="fighting" key={13}>FIGHTING</option>
            <option value="fire" key={14}>FIRE</option>
            <option value="flying" key={15}>FLYING</option>
            <option value="ghost" key={16}>GHOST</option>
            <option value="grass" key={17}>GRASS</option>
            <option value="ground" key={18}>GROUND</option>
            <option value="ice" key={19}>ICE</option>
            <option value="normal" key={20}>NORMAL</option>
            <option value="poison" key={21}>POISON</option>
            <option value="psychic" key={22}>PSYCHIC</option>
            <option value="rock" key={23}>ROCK</option>
            <option value="shadow" key={24}>SHADOW</option>
            <option value="steel" key={25}>STEEL</option>
            <option value="water"key={26}>WATER</option>
            <option value="unknown" key={27}>UNKNOWN</option> 
      </select> 
          
          
          
         {currentPokemon?  <Paginado pokemonsInPage={pokemonsInPage} 
         allPokemons={allPokemons.length} 
         paginado={paginado}
         /> : null}  
        
    
    <SearchBar/>
        
       {currentPokemon?.map(p=>{
         console.log(currentPokemon)
              return(
             <div className="cards">
               <Link to={"/home/" + p.id}>   
             <PokeCard name={p.name} image={p.image} attack={p.attack}key={p.id}  type={p.type} />
             </Link>
             </div>
         )})}  
       </div>

    </div>
)
}