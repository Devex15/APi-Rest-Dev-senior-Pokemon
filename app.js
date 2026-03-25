const express = require ('express');
const {success, getUniqueId} = require('./helper.js');
const morgan = require (`morgan`);
const favicon = require (`serve-favicon`);
const bodyParser = require (`body-parser`)
const pokemons = require('./mock-pokemon.js');

const app = express();
const port = 3000;

/*Lorsque l'on fait une requête POST sur l'API , le problème est qu l'on envoie un string
(une chaine de caractères) , or nous souhaitons du JSON .
On va donc installer un middleware natif (body-parser) en utilisant la commande 
npm install body-parser --save . Ce middleware va "parser" au final convertir le string en JSON.

*/

app.use(favicon(__dirname + `/favicon.ico`))
app.use(morgan(`dev`))

/* On importe le middleware (body-parser) avec const bodyParser = requier(`body-parser`).
On va l'utiliser avec la commande .use() en avant de nos routes  */
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

/*
============================================================================================
On va rajouter un nouveau pokémon ( un objet pokémon) à la liste des pokémons du tableau 
mock-pokemon.js :
On utilise alors la méthode POST   (   app.pos()   ):
Le end point ( Le premier paramètre)  sera /api/pokemons car on le crée sur la base de 
données pokémons .

Le deuxième paramètre (req,res => { } traitant de la requête et réponse ) :
On crée un id "dur". Dans le principe , il faudrait const id = pokemons.length + 1  
const pokemonCreated =   On crée un pokemon en récupérant les informations contenant dans le corps 
de la requête ( req.body ) . On recopie toutes les propriétés du req.body grâce au spread 
operator ...   C'est ... qui permet de récupérer les informations du req.body 
On ajoute à ces infos l'id ainsi qu'une date de création .

pokemons.push() : on push , c'est à dire qu'on ajoute le pokemon nouvellement crée ( le 
nouvel objet) au tableau pokemons 
On crée une constante ( const = message ) afin de signaler que le pkemon a bien été pushé . 

)
*/

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


app.listen(port, () => {
    console.log(`Notre application Node est démarré !
    http://localhost:${port}`);
})

// On juge une API Rest à la qualité et fiabilité de ses réponses . 