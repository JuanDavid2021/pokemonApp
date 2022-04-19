import React, {useState, useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom';
import { postPokemon,getTypes,getPokemons } from "../actions";
import {useDispatch, useSelector} from "react-redux";
import "./PokemonCreated.css"




function validate(input){
 let errors ={}
 if(!input.name){
    errors.name ="se requiere ingresar el nombre del pokemon";
 } else if(!input.attack){
     errors.attack = "se requiere ingresar el attack del pokemon"
 } else if(!input.hp){
     errors.name="se requiere ingresar el hp del pokemon"
 }else if(!input.defense){
     errors.defense = "se requiere ingresar el defense del pokemon"
 } else if(!input.height){
     errors.height="se requiere ingresar el height del pokemon"
 }else if(!input.speed){
    errors.speed="se requiere ingresar el speed del pokemon"
 }else if(!input.weight){
    errors.weight="se requiere ingresar el weight del pokemon"
 }else if(!input.image){
    errors.image="se requiere ingresar la imagen del pokemon"
 }

 return errors

}

export default function PokemonCreated(){
   const dispatch= useDispatch()
   const history = useNavigate()
   const types =useSelector((state)=>state.types)
   const totalpokes = useSelector((state)=>state.allPokemons)
   const [errors, setErrors] = useState({})

   const [input, setInput] = useState({
       name:"",
       attack: "",
       hp: "",
       defense: "",
       height: "",
       speed: "",
       weight: "",
       image:"",
       type:[]

   })

   const handleChange=(e)=>{
     setInput({
         ...input,
         [e.target.name] : e.target.value
     })
    setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
    }))
   console.log(input)
}

   const handleCheckBox=(e)=>{
       if(e.target.checked){
           setInput({
               ...input,
               type: [...input.type,e.target.value]
           })
           console.log(e.target.value)
       }
   }
   
   const handleSubmit=(e)=>{
    e.preventDefault()
    var totalfilter= totalpokes.filter(p=>p.name.toLowerCase()===input.name.toLowerCase())
    totalfilter.length? alert("ya existe un Pokemon con ese nombre"):dispatch(postPokemon(input)) && alert("Pokemon creado")
    setInput({
        name:"",
        attack: "",
        hp: "",
        defense: "",
        height: "",
        speed: "",
        weight: "",
        image:"",
        type:[]
    })

   }

   useEffect(()=>{
    dispatch(getTypes());
   },[dispatch]);

   useEffect(()=>{
    dispatch(getPokemons());
   },[dispatch]);



   return(
      <div className="pokeair">
          <Link to="/home"><button className="boton">Volver</button></Link>
          <h1>Crea un Pokemon!!</h1>
          <form onSubmit={e=>handleSubmit(e)} >

                <div className="container1">
                  <label className="label">Nombre:</label> 
                  <input
                   type="text"
                   value={input.name}
                   name="name"
                   onChange={(e)=>handleChange(e)}
                   className="input"
                  /> 
                 {errors.name && (<p>{errors.name}</p>)} 
              </div>  
              

              <div className="container-2">
                  <label className="label">Attack:</label>
                  <input
                   type="number"
                   min="1"
                   pattern="^[0-9]+"
                   value={input.attack}
                   name="attack"
                   onChange={(e)=>handleChange(e)}
                   className="input"
                  />
                   {errors.attack && (<p className="error">{errors.attack}</p>)}
              </div>

              <div className="container3">
                  <label className="label">Hp:</label>
                  <input
                   type="number"
                   min="1"
                   pattern="^[0-9]+"
                   value={input.hp}
                   name="hp"
                   onChange={(e)=>handleChange(e)}
                   className="input"
                  />
                  {errors.hp && (<p>{errors.hp}</p>)}
              </div>

              <div className="container-4">
                  <label className="label">Defense:</label>
                  <input
                   type="number"
                   min="1"
                   pattern="^[0-9]+"
                   value={input.defense}
                   name="defense"
                   onChange={(e)=>handleChange(e)}
                   className="input"
                  />
                  {errors.defense && (<p className="error">{errors.defense}</p>)}
              </div>

              <div className="container-5">
                  <label className="label">Height:</label>
                  <input
                   type="number"
                   min="1"
                   pattern="^[0-9]+"
                   value={input.height}
                   name="height"
                   onChange={(e)=>handleChange(e)}
                   className="input"
                  />
                  {errors.height && (<p className="error">{errors.height}</p>)}
              </div>

              <div className="container-6">
                  <label className="label">Speed:</label>
                  <input
                   type="number"
                   min="1"
                   pattern="^[0-9]+"
                   value={input.speed}
                   name="speed"
                   onChange={(e)=>handleChange(e)}
                   className="input"
                  />
                  {errors.speed && (<p className="error">{errors.speed}</p>)}
              </div>

              <div className="container-7">
                  <label className="label">Weight:</label>
                  <input
                   type="number"
                   min="1"
                   pattern="^[0-9]+"
                   value={input.weight}
                   name="weight"
                   onChange={(e)=>handleChange(e)}
                   className="input"
                  />
                  {errors.weight && (<p className="error">{errors.weight}</p>)}
              </div>

              <div className="container-8">
                  <label className="label">Imagen:</label>
                  <input
                   type="url"
                   value={input.image}
                   name="image"
                   onChange={(e)=>handleChange(e)}
                   className="input"
                  />
                  {errors.image && (<p className="error">{errors.image}</p>)}
              </div>

               <div className="check">
                  {types.map(t=>(
                    <label>
                     <input type="checkbox"
                     name={t.name}
                     value={t.name}
                     onChange={e=>handleCheckBox(e)}
                     />
                     {t.name}   
                    </label>  
                  ))}
              </div>  
                 
                <button type="submit" className="boton2" disabled={input.name==="" || input.attack==="" || input.defense==="" || input.hp==="" || input.height==="" || input.speed==="" 
                                                                   || input.weight==="" || input.image==="" || input.type===""}>Crear Pokemón</button>
  
          </form>

      </div>

   )
}