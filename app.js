const express = require ('express');
const {success, getUniqueId} = require('./helper.js');
const morgan = require (`morgan`);
const favicon = require (`serve-favicon`);
const bodyParser = require (`body-parser`)
let pokemons = require('./mock-pokemon.js');

const app = express();
const port = 3000;


app.use(favicon(__dirname + `/favicon.ico`))
app.use(morgan(`dev`))

/* On importe le middleware (body-parser) avec const bodyParser = requier(`body-parser`).
On va l'utiliser avec la commande app.use(body-parser) en avant de nos routes  */
app.use(bodyParser.json())

app.get("/", (req,res) => res.send(`Hello , express ! yayyyy !`))

app.get(`/api/pokemons/:id`, (req,res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)

    if (!pokemon) {
        return res.status(404).json({
            message: "Pokémon non trouvé"
        })
    }
    
    const message = "Un pokémon a bien été trouvé."
    res.status(200).json(success(message,pokemon))
})

app.get(`/api/pokemons/`, (req,res)=> {
    const message = "La liste des  pokémons est la suivante :"
    res.status(200).json(success(message,pokemons))
})

app.post(`/api/pokemons`, (req,res) => {
    const id = getUniqueId(pokemons)
    const pokemonCreated = {...req.body, ...{id:id, created: new Date()}}
    pokemons.push(pokemonCreated)
    const message = `Le pokemon ${pokemonCreated.name} a bien été créé.`
    console.log(req.body)
    res.status(200).json({
        message: message,
        data: pokemonCreated
        })
})

/*
La requête PUT va permettre de modifier un élément de l'array de la base de données :
- Quand on fait  let pokemons = require('./mock-pokemon.js') : On charge le fichier sur 
la RAM / Le .map() de PUT va modifier uniquement le fichier de la RAM pas le array du fichier
du projet . 

- Si on utilise une méthode PUT , alors il vaut mieux appeler le array de pokémon avec 
let pokemons = require('./mock-pokemon.js') car la méthode PUT ne peut pas réassigner une valeur
d'un élément du array si on utilise un const afin d'appeler l'array pokemon. 

le Body-parser va parser les datas en JSON et de manière strict . Cela veut dire : 
Pas de , à la fin de l'array ni du dernier élément de l'array . 
 */

app.put(`/api/pokemons/:id`, (req,res) => {
    const id = parseInt(req.params.id)
    const pokemonUpdated = { ...req.body, id: id}
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id? pokemonUpdated : pokemon
    })
    const message = `Le pokemon ${pokemonUpdated} a bien été modifié. `
    res.json(success(message, pokemonUpdated))
})

app.listen(port, () => {
    console.log(`Notre application Node est démarré !
    http://localhost:${port}`);
})

// On juge une API Rest à la qualité et fiabilité de ses réponses . 