const { default: axios } = require('axios');
const { Router } = require('express');
const {Type, Pokemon} = require('../db')
const {getPokemons, getPokemonsTypes, postPokemon,getPokemonParams,sendPokemonsBD} = require('../routes/Controller')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemons', getPokemons)

router.post('/pokemons',postPokemon )

router.get('/types', getPokemonsTypes)

router.get('/pokemons/:id', getPokemonParams )   

module.exports = router;
