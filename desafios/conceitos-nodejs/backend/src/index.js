/*
* main http methods
* GET   -> fetch  info from backend
* POST  -> create info on backend
* PUT   -> full update of some resource
* PATCH -> partial update of some resource
*/

/*
* main restful parameter types
* 
* query: filters, pagination
* path:  specify the resource 
* body:  body of data for the endpoint to inspect
*/



const { request } = require('express');
const express = require('express');
const { uuid } = require('uuidv4');

const app = express();




app.use(express.json())


const projects = [];


app.get('/', (request, response) => {
    return response.send({data: ['hello', 'world']});
});


// projects resource
app.get('/projects', (request, response) => {
    console.log('get projects called with query params: ', request.query);

    const { title } = request.query;

    return response.send(title ? projects.filter(p => p.title.includes(title)) : projects);
});

app.post('/projects', (request, response) => {
    console.log('create project called with body: ', request.body);
    const { title, owner } = request.body;
    const project = { title, owner, id: uuid() };
    projects.push(project);
    return response.send(project);
});

app.put('/projects/:id', (request, response) => {
    const { params, body } = request;
    console.log('update project called with: ', {params, body});
   
    const { title, owner } = body;

    const project = {
        title,
        owner,
        id: params.id
    };


    const index = projects.findIndex(p => p.id == project.id);

    if (index == -1)
        return response.status(400).send({error: 'Project not found'});
    
    projects[index] = project;

    return response.send(project);
});

app.delete('/projects/:id', (request, response) => {
    const {id} = request.params;
    console.log('delete project called with path params: ', request.params);

    const index = projects.findIndex(p => p.id == id);
    if (index == -1)
        return response.status(400).send({error: 'Project not found'});
    
    const deletedProject = projects.splice(index, 1);

    return response.status(204).send();
})







app.listen(3333, () => {
    console.log('server is up 👍👍');
});
