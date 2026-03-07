const express = require ('express');
// On charge le tableau du fichier mock-pokemon.js 

const {success} = require('./helper.js')
// On fait appel au module helper.js 
const pokemons = require('./mock-pokemon.js');
const app = express();

const port = 3000;

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
    // On ajoute dans la réponse la fonction fonction helper.success() en call back de res.json()
    res.status(200).json.success(message,pokemon)
})

/* Onn simplifie  const helper = require(`./helper.js`) en const {sucess} = require(`./helper.js`) . 
Grâce à L'ECMA6 (ES6) on utilise les accolades qu'on appelle affectation déstructurée afin de faire appel 
à la fonction success définie dans le helper.js 

On va simplifier ainsi le res.status(200).json(helper.success(message, pokemon)) en 
res.status(200).succes(message,pokemon) */

//nouveau endpoint qui va permettre de retourner le nombre d'éléments du tableau 
app.get(`/api/pokemons/`, (req,res)=>{
    res.send(`Il y a ${pokemons.length} pokémons dans le pokédex, en ce moment .`)

})

app.listen(port, () => {
    console.log(`Notre application Node est démarré !
    http://localhost:${port}`);
})

// On juge une API Rest à la qualité et fiabilité de ses réponses . 