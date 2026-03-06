const express = require ('express');
const app = express();

const port = 3000;

app.get("/", (req,res) => res.send(`Hello , express ! yayyyy !`))

/*
==========================================================================
On recherche un pokémon en fonction de son id :
On va donc chercher grâce à la méthode .params et avec req.params.id , l'id du pokémon
demandé par l'utilisateur .

Le problème est que l'id est une chaine de caractère , on a la transformer en nombre grâce
à la propriété parseInt()
=====================================================================================

La méthode finc() va chercher puis comparer l'id du pokémon demandé avec les id des pokémons du  tableau
*/


app.get(`/api/pokemons/:id`, (req,res) => {
    const id = parseInt(req.params.id)

    const pokemon = pokemons.find(pokemon => pokemon.id === id)

    if (!pokemon) {
        return res.status(404).json({
        message : "Le pokémon demandé n'a pas été trouvé. " })
    }

    //Avec if () ne pas oublier le return 
    res.status(200).json(pokemon)
})

app.get(`/`, res.send(`Il y a ${pokemons.length} dans le pokédex.`))

app.listen(port, () => {
    console.log(`Notre application Node est démarré !
    http://localhost:${port}`);
})