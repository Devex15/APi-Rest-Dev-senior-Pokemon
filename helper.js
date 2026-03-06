exports.success = (message,data ) => {
    return{ message, data }
}


// on crée une méthode success afin de signaler aux développeurs que la requête a été un succès .
/* On utilise les méthodes common.js , on exporte directement success sans avoir à faire
à un const 
En ECMA6 (ES6) ; si le variable a même nom que la valeur , alors on peut écrire
uniquement le nom de la variable :
    return{
    message : message,
    data: data,
    }

... devient :

    return{
    message,
    data,
    }

    On réduit plusieurs lignes en à peine quelques ligne . 
*/