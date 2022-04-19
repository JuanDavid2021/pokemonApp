
export const initialState={
    allPokemons:[],
    pokemons:[],
    types: [],
    detail: [],
    
}


const rootReducer =(state=initialState, action)=>{

   switch(action.type){
  
     case "GET_POKEMONS":
         return{
             ...state,
             pokemons: action.payload,
             allPokemons: action.payload
         }

     case "GET_NAME_POKEMON":
         return{
             ...state,
             pokemons:action.payload
         }
   
     case "GET_TYPES":
         return{
             ...state,
             types: action.payload 
         }
           
     case "POST_POKEMON":
         return{
             ...state
         }

     case "FILTER_POKEMON_ALL":
        return{
           ...state,
           pokemons:state.allPokemons
        }    
   
     case "ORDER_BY_NAME":
         console.log(state.pokemons)
         let sortArray=action.payload === 'ascendente'?
          state.pokemons.sort(function (a,b){
              if(a.name.toLowerCase()>b.name.toLowerCase()){
                  return 1;
              }
              if(b.name.toLowerCase()>a.name.toLowerCase()){
                  return -1;
              }
              return 0;
          }):
              state.pokemons.sort(function(a,b){
                 if(a.name.toLowerCase()>b.name.toLowerCase()){
                     return -1
                 }
                 if(b.name.toLowerCase()>a.name.toLowerCase()){
                     return 1;
                 } 
                 return 0;
              }) 
              
              return{
                  ...state,
                  pokemons: sortArray
              }

     case "ORDER_BY_FUERZA":
        let sortArrayFuerza=action.payload === 'ascendentefuerza'?
        state.pokemons.sort(function (a,b){
            if(a.attack>b.attack){
                return 1;
            }
            if(b.attack>a.attack){
                return -1;
            }
            return 0;
        }):
            state.pokemons.sort(function(a,b){
               if(a.attack>b.attack){
                   return -1
               }
               if(b.attack>a.attack){
                   return 1;
               } 
               return 0;
            }) 
            
            return{
                ...state,
                pokemons: sortArrayFuerza
            }



     case "FILTER_POKEMON":
         const pokeFilter= state.allPokemons                                                                            
         const createdFilter = action.payload === 'existent'? pokeFilter.filter(p=>p.createdInDb===false) : action.payload==="created"? pokeFilter.filter(p=>p.createdInDb===true) : pokeFilter  
             return {
               ...state,
               pokemons: createdFilter
              }
            
      case "POKE_DETAIL":
          return{
              ...state,
              detail: action.payload 
          }
    
       case "NO_POKE":
          return {
              ...state,
              pokemons: null
          }     
       case "FILTER_POKEMON_TYPE":
           const allPokes = state.allPokemons
           const pokeFilterApi= allPokes.filter(p=>p.type)
           const pokeFilterBD=allPokes.filter(p=>p.types)
           const pokeFilterTypeApi = pokeFilterApi.filter(p=>p.type.includes(action.payload))
           const pokeFilterTypeBD = pokeFilterBD.filter(p=>p.types.find(t=>t.name===action.payload))
           const typesAll = pokeFilterTypeApi.concat(pokeFilterTypeBD) 
           return{
               ...state,
               pokemons: typesAll
           }  
              
     default: return state;    

   } 


}

export default rootReducer;