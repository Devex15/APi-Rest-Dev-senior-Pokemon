const express = require ('express');
const app = express();

const port = 3000;

app.get("/", (req,res) => res.send(`Hello , express ! yayyyy !`))

/*
==========================================================================
On pourrait définir différents end points , un en point correspoindant à un pokémon 
sous la forme : app.get(`/api/pokemons/1` , (req,res) => res.send(`Vous avrez demandé le pokémon n°1`)) 

Afin de faciliter les choses on va utiliser la commande req.paramms.id :
Grâce à cette commande on récupère l'id du pokémon qui nous intéresse, dans la requête client
On va utiliser cet id dans la réponse .
=====================================================================================

On va utiliser la syntaxe des : (:id) : express va récupérer l'id du pokémon puis la transmettre dans le point de terminaison
via l'objet req 
On peut donc récuorér cette id à la transmettre à la réoponse client.
*/


app.get(`/api/pokemons/:id`, (req,res) => {
    const id = req.params.id
    res.send(`Vous avez demandé le pokémon n° :${id}`)
})
app.listen(port, () => {
    console.log(`Notre application Node est démarré !
    http://localhost:${port}`);
})