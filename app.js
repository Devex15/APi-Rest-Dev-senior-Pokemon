const express = require ('express');
const {success} = require('./helper.js');
const morgan = require (`morgan`);
const pokemons = require('./mock-pokemon.js');

const app = express();
const port = 3000;

/*
On installe morgan qui est un mdodule node.js , un middlware qui va afficher les requêtes 
entrantes des utilisateurs de l'API Rest  avec const morgan = require(`morgan`)

On lutilise ensuite avec la méthode use()
*/

app.use(morgan(`dev`))
// On fait passer comme paramètres `dev`car on l'utilise en phase de développemet. 

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