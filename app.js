const express = require ('express');
const {success} = require('./helper.js');
const morgan = require (`morgan`);
const favicon = require (`serve-favicon`);
const pokemons = require('./mock-pokemon.js');

const app = express();
const port = 3000;

/*
Comment conncanténer des middlewares ?
Les middlewares vont recevoir la requête , la traiter et passer la requête au middlware suivant:
Il est important quand on crée des middlewares de passer les arguments (req,res, next):
next() est indispensable sinon le traitement s'arrêtera au middleware ( qui n'a pas de next())

Morgan et serve-favicon sont des middlewares qui ont le next() intégrés.
L'intérêt et la puissance des middlewares est que ont peut les mettre les uns à la suite des 
autres et créer de véritables chaines de traitement.
Afin de concaténer les middlewares , il suffit juste de les mettre les uns à la suite des autres
avec app.use() , use signifiant à l'app d'utiliser ce middleware. 

On crée ainsi une chaine de traitement . 
*/

app.use(favicon(__dirname + `/favicon.ico`))
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