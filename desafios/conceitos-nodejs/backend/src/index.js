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


// projects resource
app.get('/projects', (request, response) => {
    console.log('get projects called');
    return response.send(['project 1', 'project 2']);
});

app.post('/projects', (request, response) => {
    console.log('create project called');
    return response.send(['project 1', 'project 2']);
});

app.put('/projects/:id', (request, response) => {
    console.log('update project called');
    return response.send(['project 1', 'project 2']);
});

app.delete('/projects/:id', (request, response) => {
    console.log('delete project called');
    return response.send(['project 1', 'project 2']);
})







app.listen(3333, () => {
    console.log('server is up 👍👍');
});
