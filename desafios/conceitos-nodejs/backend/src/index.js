const express = require('express');

const app = express();

/*
* main http methods
* GET   -> fetch  info from backend
* POST  -> create info on backend
* PUT   -> full update of some resource
* PATCH -> partial update of some resource
*/

app.get('/', (request, response) => {
    return response.send({data: ['hello', 'world']});
});


app.listen(3333, () => {
    console.log('server is up 👍👍');
});
