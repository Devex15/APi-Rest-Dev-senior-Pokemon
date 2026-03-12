const express = require ('express');
// On charge le tableau du fichier mock-pokemon.js 

const {success} = require('./helper.js')
// Affectation destructurée {succes} : On fait appel à une fonction particulière de helper
// Cela allègera le code lorsqu'on l'utilisera . *

const pokemons = require('./mock-pokemon.js');
const app = express();

const port = 3000;

/*
On définit un middleware appelé logger qui va logger les réquêtes entrantes de l'API Rest:
Il affichera les requêtes entrantes de l'API sur le terminal de l'API Rest( de VS code).
Le paramètre next est indispensable : Il permettra d'utiliser la méthode next() fournis 
par express() signalant que l'utilisation du middleware est terminée . 
*/
const logger = (req,res,next) => {
    console.log(`URL : ${req.url}`)
    next()
}

app.use(logger)
// La méthode use() permet d'utiliser le middleware directement sur le entry point . 

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


app.listen(port, () => {
    console.log(`Notre application Node est démarré !
    http://localhost:${port}`);
})

// On juge une API Rest à la qualité et fiabilité de ses réponses . 