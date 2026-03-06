const express = require ('express');
// On charge le tableau du fichier mock-pokemon.js 

const helper = require('./helper.js')
// On fait appel au module helper.js 
const pokemons = require('./mock-pokemon.js');
const app = express();

const port = 3000;

app.get("/", (req,res) => res.send(`Hello , express ! yayyyy !`))

/* On modifie l'app.js afin d'ajouter un message sur l'entête de la réponse :
res.status(200).json(helper.success(message,pokemon))

La fonction call back fait appel à deux paramètres car ce sont les deux valeurs sur lesquelles 
on attend une réponse
*/

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
    res.status(200).json(helper.success(message,pokemon))
})

//nouveau endpoint qui va permettre de retourner le nombre d'éléments du tableau 
app.get(`/api/pokemons/`, (req,res)=>{
    res.send(`Il y a ${pokemons.length} pokémons dans le pokédex, en ce moment .`)

})

app.listen(port, () => {
    console.log(`Notre application Node est démarré !
    http://localhost:${port}`);
})