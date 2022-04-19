import axios from 'axios';


export function orderByName(payload){
  return{
     type: 'ORDER_BY_NAME',
     payload
  }
}

export function orderByNameFuerza(payload){
  return{
     type: 'ORDER_BY_FUERZA',
     payload
  }
}

export function filterPokemonTypeAll(payload){
  return{
    type: 'FILTER_POKEMON_ALL',
    payload
 }
}

export function getNamePokemon(name){
    return async function (dispatch){
      try{
         var json = await axios("/pokemons?name="+name);
         return dispatch({
           type: "GET_NAME_POKEMON",
           payload: json.data
         })
      } catch(error){
        console.log(error)
      }
    }
}

export function getTypes(){
 return async function (dispatch){
   var info = await axios.get("/types",{

   });
   return dispatch({type: "GET_TYPES", payload: info.data});
 };
}

export const noPoke = (payload) =>{
  return {
    type: "NO_POKE",
    payload
  }
}

export function postPokemon(payload){
   return async function (dispatch){
     const response = await axios.post("/pokemons", payload);
     return response;
   }
}

export function getPokemons(){

 return async(dispatch)=>{
    var json= await axios.get('/pokemons');
    console.log(json.data)
    return dispatch({
        type: "GET_POKEMONS",
        payload: json.data
    })   
 }
}

export function filterPokemon(payload){
  return{
    type: "FILTER_POKEMON",
    payload
  }
}

export function filterPokemonType(payload){
  return{
    type: "FILTER_POKEMON_TYPE",
    payload
  }
} 

export function pokeDetail(id){
return async function (dispatch){
  try{
    var json = await axios.get(`/pokemons/${id}`)
    return dispatch({
      type: "POKE_DETAIL",
      payload: json.data
    })
  }
  catch(error){
    console.log(error)
  }
}
}

