const axios = require('axios')
const {Pokemon, Type} = require('../db')



const getPokemonApi= async()=>{

    let id = 1
    let allpokemones=[]

    while(id<=50){
       allpokemones.push(await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`))
       id++ 
    }
 
   
  const getAllpokes = await Promise.all(allpokemones)
      .then((pokemon)=>{
          let pokeArray = pokemon.map((p)=>{
              return{
                name: p.data.name,
                attack: p.data.stats[1].base_stat,
                hp: p.data.stats[0].base_stat,
                defense: p.data.stats[2].base_stat,
                height: p.data.height,
                speed: p.data.stats[5].base_stat,
                weight: p.data.weight,
                image: p.data.sprites.other.dream_world.front_default,
                type: p.data.types.map(t=>t.type.name)
              }
          })
          return pokeArray
      })
       return getAllpokes;
}



const sendPokemonsBD =async ()=>{
  
    try {
        let infoApi = await getPokemonApi()
    
        let createPokemons = await Pokemon.bulkCreate(infoApi)
        
        let allpoke = await Pokemon.findAll()
        return allpoke
    }
    catch (error) {
      console.log(error)  
    } 
}

const queryBD = async()=>{
    let allpoke = await Pokemon.findAll()
    return allpoke
}

const getPokemons = async (req,res)=>{
 const {name} = req.query
 let totalPokemons = await queryBD();
 if(name){
   let pokeName = await totalPokemons.filter(p=>p.name.toLowerCase().includes(name.toLowerCase()))
   pokeName.length?
   res.status(200).send(pokeName):
   res.status(404).send("no hay pokemons con ese nombre")
 }else{
    res.status(200).send(totalPokemons)  
 }
}


const postPokemon =async(req, res)=>{

    let{name,attack,hp,defense,height,speed,weight,image,createdInDb, type} = req.body
 
    let pokemonCreated= await Pokemon.create({
     name,attack,hp,defense,height,speed,weight,image,createdInDb,type
    })
/*     
    let pokeCratedBD = await Type.findAll({
        where: {name: type}
    })
 
    pokemonCreated.addType(pokeCratedBD) */
    res.send('Pokemon creado con éxito')
 
 }  


const getPokemonsTypes = async(req, res)=>{
    const typesApi = await axios.get('https://pokeapi.co/api/v2/type');
    const typesPoke = typesApi.data.results.map(t=>t.name);
    typesPoke.forEach(t=>{
        Type.findOrCreate({
            where: {name:t}
        })
    })
    const allTypes= await Type.findAll();
    res.send(allTypes)
}

const getPokemonParams = async(req,res)=>{
    const {id}= req.params;
    const totalDePokemon = await queryBD()
     if(id){
        let pokemonsId = await totalDePokemon.filter(p=>p.id==id)
        pokemonsId.length?
        res.status(200).json(pokemonsId):
        res.status(404).send('No se encontró el pokemon')
    } 
 }

    

module.exports={
    getPokemons,
    sendPokemonsBD,
    postPokemon, 
    getPokemonsTypes,
    getPokemonParams
}