console.log("hello node. Comment ça va?")

//on met en place le premier point de terminaison du projet:
// Ce point de terminaison va renvoyer les résultats des premières requêtes .

// require('express') : on dit à node js d'aller chercher express dans nodes modules 
const express = require ('express');

//On recrée l'app en utilisant le module express devenu une constante : c'est le petit serveur web sur lequel va fonctionner l'API Rest
const app = express();

//On définit le port sur lequel on va démarrer notre API Rest
const port = 3000;

/* 
===========================================================================
- On met en place notre premier point de terminaison : C'est le coeur de l'API Rest
- On utilise une méthode GET et on met en place le chemin de la requête: 
* C'est le premier argument de la fonction javascript : C'est le chemin quiu va traiter le point de terminaison
* Le deuxième argument et une fonction qui va traiter de la réponse au client :
Elle prend deux arguments req et res ( req permet de récupérer l'objet request et res permet d'envoyer la réponse.) 
On utilise la méthode send de response afin de renvoyer la réponse au client. 
====================================================================================
 */
app.get("/", (req,res) => res.send(`Hello , express ! yayyyy !`))

//On lance l'écoute sur le port que l'on a définit (ie => 3000) et on confirme qu'il fonctionne 
app.listen(port, () => {
    console.log(`Notre application Node est démarré !
    http://localhost:${port}`);
})